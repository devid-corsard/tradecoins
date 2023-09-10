use actix_web::{error::InternalError, web, HttpResponse};
use reqwest::StatusCode;
use secrecy::Secret;
use sqlx::PgPool;

use crate::{
    authentication::{validate_credentials, AuthError, Credentials},
    session_state::TypedSession,
    utils::error_chain_fmt,
};

#[derive(serde::Deserialize)]
pub struct FormData {
    username: String,
    password: Secret<String>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct LoginResponse {
    pub success: bool,
    pub messages: Vec<String>,
}

#[derive(thiserror::Error)]
pub enum LoginError {
    #[error("Authentication failed")]
    AuthError(#[source] anyhow::Error),
    #[error("Something went wrong")]
    UnexpectedError(#[from] anyhow::Error),
}

impl std::fmt::Debug for LoginError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        error_chain_fmt(self, f)
    }
}

#[tracing::instrument(
    skip(form,pool,session),
    fields(username=tracing::field::Empty, user_id=tracing::field::Empty)
    )]
pub async fn login(
    form: web::Form<FormData>,
    pool: web::Data<PgPool>,
    session: TypedSession,
) -> Result<HttpResponse, InternalError<LoginError>> {
    let credentials = Credentials {
        username: form.0.username,
        password: form.0.password,
    };
    tracing::Span::current().record("username", &tracing::field::display(&credentials.username));
    match validate_credentials(credentials, &pool).await {
        Ok(user_id) => {
            tracing::Span::current().record("user_id", &tracing::field::display(&user_id));
            session.renew();
            session
                .insert_user_id(user_id)
                .map_err(|e| error_response(LoginError::UnexpectedError(e.into())))?;
            Ok(HttpResponse::Ok().json(LoginResponse {
                success: true,
                messages: Vec::from(["Login successful.".into()]),
            }))
        }
        Err(e) => {
            let e = match e {
                AuthError::InvalidCredentials(_) => LoginError::AuthError(e.into()),
                AuthError::UnexpectedError(_) => LoginError::UnexpectedError(e.into()),
            };
            Err(error_response(e))
        }
    }
}

fn error_response(e: LoginError) -> InternalError<LoginError> {
    let error_str: String;
    let status = match e {
        LoginError::AuthError(ref e) => {
            error_str = e.to_string();
            StatusCode::BAD_REQUEST
        }
        LoginError::UnexpectedError(ref e) => {
            error_str = e.to_string();
            StatusCode::INTERNAL_SERVER_ERROR
        }
    };
    let response = HttpResponse::build(status).json(LoginResponse {
        success: false,
        messages: Vec::from([error_str]),
    });
    InternalError::from_response(e, response)
}
