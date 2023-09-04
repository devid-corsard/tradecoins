use actix_web::{web, HttpResponse};
use anyhow::Context;
use argon2::{password_hash::SaltString, Algorithm, Argon2, Params, PasswordHasher, Version};
use secrecy::{ExposeSecret, Secret};
use sqlx::{PgPool, Postgres, Transaction};

use crate::{
    domain::{NewUser, Password, Username},
    session_state::TypedSession,
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
    skip(form, pool,session),
    fields(
        username = %form.username,
    )
)]
pub async fn create_user(
    form: web::Form<FormData>,
    pool: web::Data<PgPool>,
    session: TypedSession,
) -> HttpResponse {
    let user: NewUser = match form.0.try_into() {
        Ok(user) => user,
        Err(e) => {
            return HttpResponse::BadRequest().json(RegisterResponse {
                succes: false,
                messages: Vec::from([e]),
            })
        }
    };
    let mut transaction = match pool.begin().await {
        Ok(t) => t,
        Err(_) => {
            return HttpResponse::InternalServerError().json(RegisterResponse {
                succes: false,
                messages: Vec::from(["Failed to handle request.".into()]),
            })
        }
    };
    if username_is_taken(&mut transaction, user.username.as_ref()).await {
        return HttpResponse::BadRequest().json(RegisterResponse {
            succes: false,
            messages: Vec::from(["Username already in use".into()]),
        });
    }
    let user_id = match insert_user(&mut transaction, user).await {
        Ok(id) => id,
        Err(_) => {
            return HttpResponse::InternalServerError().json(RegisterResponse {
                succes: false,
                messages: Vec::from(["Failed to handle request.".into()]),
            })
        }
    };
    match transaction
        .commit()
        .await
        .context("Failed to commit transaction.")
    {
        Ok(_) => {
            session.renew();
            if session.insert_user_id(user_id).is_err() {
                // todo: make error more clear to client
                // now new user is created but not logged in
                return HttpResponse::InternalServerError().json(RegisterResponse {
                    succes: false,
                    messages: Vec::from(["Failed to handle request.".into()]),
                });
            }
            HttpResponse::Created().json(RegisterResponse {
                succes: true,
                messages: Vec::from(["Registration successful.".to_string()]),
            })
        }
        Err(_) => HttpResponse::InternalServerError().json(RegisterResponse {
            succes: false,
            messages: Vec::from(["Failed to handle request.".into()]),
        }),
    }
}

#[tracing::instrument(
    name = "Cheking if username alredy exists in the database",
    skip(transaction, username)
)]
async fn username_is_taken(transaction: &mut Transaction<'_, Postgres>, username: &str) -> bool {
    let user_exists = sqlx::query!(
        r#" SELECT user_id FROM users WHERE username = $1"#,
        username
    )
    .fetch_optional(&mut **transaction)
    .await
    .expect("Failed query to check if user already exists");
    if user_exists.is_some() {
        return true;
    }
    false
}

#[tracing::instrument(name = "Saving new user in the database", skip(transaction, user))]
async fn insert_user(
    transaction: &mut Transaction<'_, Postgres>,
    user: NewUser,
) -> Result<uuid::Uuid, anyhow::Error> {
    let user_id = uuid::Uuid::new_v4();
    let password_hash =
        spawn_blocking_with_tracing(move || compute_password_hash(user.password.as_ref()))
            .await?
            .context("Failed to hash password")?;
    sqlx::query!(
        r#"
        INSERT INTO users
        (user_id, username, password_hash, created_at)
        VALUES
        ($1, $2, $3, CURRENT_TIMESTAMP)
        "#,
        user_id,
        user.username.as_ref(),
        password_hash.expose_secret()
    )
    .execute(&mut **transaction)
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
