use actix_web::{web, HttpResponse};
use anyhow::Context;
use argon2::{password_hash::SaltString, Algorithm, Argon2, Params, PasswordHasher, Version};
use secrecy::{ExposeSecret, Secret};
use sqlx::PgPool;

use crate::{
    domain::{NewUser, Password, Username},
    telemetry::spawn_blocking_with_tracing,
};

#[derive(serde::Deserialize)]
pub struct FormData {
    username: String,
    password: String,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct RegisterResponse {
    pub succes: bool,
    pub messages: Vec<String>,
}

impl TryFrom<FormData> for NewUser {
    type Error = String;

    fn try_from(form: FormData) -> Result<Self, Self::Error> {
        let username = Username::parse(form.username)?;
        let password = Password::parse(form.password)?;
        Ok(NewUser { username, password })
    }
}

#[tracing::instrument(
    name = "Reginster new user",
    skip(form, pool),
    fields(
        username = %form.username,
    )
)]
pub async fn create_user(form: web::Form<FormData>, pool: web::Data<PgPool>) -> HttpResponse {
    let user = match form.0.try_into() {
        Ok(user) => user,
        Err(e) => {
            return HttpResponse::BadRequest().json(RegisterResponse {
                succes: false,
                messages: Vec::from([e]),
            })
        }
    };
    let _user_id = insert_user(&pool, user).await;
    HttpResponse::Created().json(RegisterResponse {
        succes: true,
        messages: Vec::from(["Registration successful.".to_string()]),
    })
}

#[tracing::instrument(name = "Saving new user in the database", skip(pool, user))]
async fn insert_user(pool: &PgPool, user: NewUser) -> Result<uuid::Uuid, anyhow::Error> {
    let user_id = uuid::Uuid::new_v4();
    let password_hash =
        spawn_blocking_with_tracing(move || compute_password_hash(user.password.as_ref()))
            .await?
            .context("Failed to hash password")?;
    sqlx::query!(
        r#"
                 insert into users
                 (user_id, username, password_hash, created_at)
                 values
                 ($1, $2, $3, CURRENT_TIMESTAMP)
                 "#,
        user_id,
        user.username.as_ref(),
        password_hash.expose_secret()
    )
    .execute(pool)
    .await
    .expect("Failed to store new user into database.");
    Ok(user_id)
}

fn compute_password_hash(password: &Secret<String>) -> Result<Secret<String>, anyhow::Error> {
    let salt = SaltString::generate(&mut rand::thread_rng());
    let password_hash = Argon2::new(
        Algorithm::Argon2id,
        Version::V0x13,
        Params::new(15000, 2, 1, None).unwrap(),
    )
    .hash_password(password.expose_secret().as_bytes(), &salt)?
    .to_string();
    Ok(Secret::new(password_hash))
}
