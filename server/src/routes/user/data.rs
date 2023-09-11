use actix_web::{web, HttpResponse};
use sqlx::PgPool;

use crate::{
    authentication::UserId,
    dto::{Portfolio, PortfolioItem, TradeItem},
    session_state::TypedSession,
};

#[tracing::instrument(name = "Getting user portfolio by id", skip(pool, session))]
pub async fn data(
    pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
    session: TypedSession,
) -> Result<HttpResponse, actix_web::Error> {
    let mock_data: Portfolio = Portfolio {
        info: String::from("Ok"),
        data: vec![PortfolioItem {
            name: "Test name".to_string(),
            id: uuid::Uuid::new_v4(),
            data: vec![TradeItem {
                id: uuid::Uuid::new_v4(),
                amount: "0.11".to_string(),
                buy_price: "1658".to_string(),
                sell_price: "1708".to_string(),
            }],
        }],
    };
    session.renew();
    Ok(HttpResponse::Ok().json(mock_data))
}
