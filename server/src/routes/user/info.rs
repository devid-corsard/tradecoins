use actix_web::{web, HttpResponse};
use sqlx::PgPool;

use crate::{authentication::UserId, session_state::TypedSession};

#[derive(serde::Serialize)]
struct Info {
    user_id: uuid::Uuid,
    username: String,
}
pub async fn info(
    pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
    session: TypedSession,
) -> HttpResponse {
    let user_id = user_id.into_inner();
    let row = sqlx::query!("SELECT username FROM users WHERE user_id = $1", *user_id)
        .fetch_optional(&**pool)
        .await
        .expect("Result is fucked")
        .expect("Fetch is fucked");
    let username = row.username;

    session.renew();
    HttpResponse::Ok().json(Info {
        user_id: *user_id,
        username,
    })
}
