use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::utils::e500;

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
    pub amount: String,
    pub buy_price: String,
    pub sell_price: String,
}

#[tracing::instrument(name = "Edit trade item values", skip(pool))]
pub async fn edit_tradeitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    edit_trade_item(&q_params, &pool)
        .await
        .context(format!("Failed to edit trade item - id:{}", q_params.id))
        .map_err(e500)?;
    Ok(HttpResponse::NoContent().finish())
}

#[tracing::instrument(
    name = "Editing trade item in db", 
    skip_all,
    fields(id=tracing::field::Empty)
)]
async fn edit_trade_item(item: &Params, pool: &PgPool) -> Result<(), sqlx::Error> {
    tracing::Span::current().record("id", &tracing::field::display(&item.id));
    sqlx::query!(
        "UPDATE trade_item SET amount=$1, buy_price=$2, sell_price=$3 WHERE id = $4;",
        &item.amount,
        &item.buy_price,
        &item.sell_price,
        &item.id
    )
    .execute(pool)
    .await?;
    Ok(())
}
