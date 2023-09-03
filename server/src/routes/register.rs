use actix_web::{web, HttpResponse};
use sqlx::PgPool;

use crate::domain::{NewUser, Password, Username};

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
    let user = form.0.try_into().unwrap();
    let _user_id = insert_user(&pool, &user).await;
    HttpResponse::Created().json(RegisterResponse {
        succes: true,
        messages: Vec::from(["Registration successful.".to_string()]),
    })
}

async fn insert_user(pool: &PgPool, user: &NewUser) -> Result<uuid::Uuid, anyhow::Error> {
    let user_id = uuid::Uuid::new_v4();
    sqlx::query!(
        r#"
                 insert into users
                 (user_id, username, password_hash, created_at)
                 values
                 ($1, $2, $3, CURRENT_TIMESTAMP)
                 "#,
        user_id,
        user.username.as_ref(),
        user.password.as_ref()
    )
    .execute(pool)
    .await
    .expect("Failed to store new user into database.");
    Ok(user_id)
}
