use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::{authentication::UserId, dto::UserInfo, session_state::TypedSession, utils::e500};

#[tracing::instrument(name = "Getting user info by id", skip(pool, session))]
pub async fn info(
    pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
    session: TypedSession,
) -> Result<HttpResponse, actix_web::Error> {
    let user_id = user_id.into_inner();
    let row = sqlx::query!("SELECT username FROM users WHERE user_id = $1", *user_id)
        .fetch_one(&**pool)
        .await
        .context("Failed query get username by user id")
        .map_err(e500)?;
    let username = row.username;

    session.renew();
    Ok(HttpResponse::Ok().json(UserInfo {
        user_id: *user_id,
        username,
    }))
}
