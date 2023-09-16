use crate::authentication::compute_password_hash;
use actix_web::{web, HttpResponse, ResponseError};
use anyhow::Context;
use reqwest::StatusCode;
use secrecy::ExposeSecret;
use sqlx::{PgPool, Postgres, Transaction};

use crate::{
    domain::{NewUser, Password, Username},
    dto::{CredentialsForm, ServerMessage},
    session_state::TypedSession,
    telemetry::spawn_blocking_with_tracing,
    utils::error_chain_fmt,
};

impl TryFrom<CredentialsForm> for NewUser {
    type Error = String;

    fn try_from(form: CredentialsForm) -> Result<Self, Self::Error> {
        let username = Username::parse(form.username)?;
        let password = Password::parse(form.password.expose_secret().to_owned())?;
        Ok(NewUser { username, password })
    }
}

#[derive(thiserror::Error)]
pub enum CreationError {
    #[error("{0}")]
    ValidationError(String),

    #[error(transparent)]
    UnexpectedError(#[from] anyhow::Error),
}

impl std::fmt::Debug for CreationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        error_chain_fmt(self, f)
    }
}

impl ResponseError for CreationError {
    fn status_code(&self) -> reqwest::StatusCode {
        match self {
            CreationError::ValidationError(_) => StatusCode::BAD_REQUEST,
            CreationError::UnexpectedError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        match self {
            CreationError::ValidationError(e) => {
                HttpResponse::build(self.status_code()).json(ServerMessage {
                    success: false,
                    messages: Vec::from([e.to_owned()]),
                })
            }
            CreationError::UnexpectedError(_) => {
                HttpResponse::build(self.status_code()).json(ServerMessage {
                    success: false,
                    messages: Vec::from(["Failed to handle request.".into()]),
                })
            }
        }
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
    form: web::Form<CredentialsForm>,
    pool: web::Data<PgPool>,
    session: TypedSession,
) -> Result<HttpResponse, CreationError> {
    let user: NewUser = form.0.try_into().map_err(CreationError::ValidationError)?;
    let mut transaction = pool.begin().await.context("Failed postgres connection")?;
    check_if_username_avalible(&mut transaction, user.username.as_ref()).await?;
    let user_id = insert_user(&mut transaction, user)
        .await
        .map_err(CreationError::UnexpectedError)?;
    transaction
        .commit()
        .await
        .context("Failed to commit transaction.")?;
    session.renew();
    if session
        .insert_user_id(user_id)
        .context("Failed to start new user session")
        .is_err()
    {
        return Ok(HttpResponse::Created().json(ServerMessage {
            success: true,
            messages: Vec::from([
                "Registration successful.".into(),
                "You need to login".into(),
            ]),
        }));
    };
    Ok(HttpResponse::Created().json(ServerMessage {
        success: true,
        messages: Vec::from(["Registration successful.".into()]),
    }))
}

#[tracing::instrument(
    name = "Checking if username alredy exists in the database",
    skip(transaction, username)
)]
async fn check_if_username_avalible(
    transaction: &mut Transaction<'_, Postgres>,
    username: &str,
) -> Result<(), CreationError> {
    let user_exists = sqlx::query!(
        r#" SELECT user_id FROM users WHERE username = $1"#,
        username
    )
    .fetch_optional(&mut **transaction)
    .await
    .context("Failed query to check if user already exists.")?;
    if user_exists.is_some() {
        return Err(CreationError::ValidationError(
            "Username already in use".into(),
        ));
    }
    Ok(())
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
    .context("Failed to store new user into database.")?;
    Ok(user_id)
}
