use actix_web::{web, HttpResponse};
use sqlx::PgPool;

use crate::{authentication::UserId, dto::PortfolioItemCreated, session_state::TypedSession};

#[tracing::instrument(name = "Create new portfolio item", skip(_pool, session))]
pub async fn portfolioitem(
    _pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
    session: TypedSession,
) -> Result<HttpResponse, actix_web::Error> {
    let mock_data = PortfolioItemCreated {
        item_id: uuid::Uuid::new_v4(),
        child_id: uuid::Uuid::new_v4(),
    };
    session.renew();
    Ok(HttpResponse::Created().json(mock_data))
}
