use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::{dto::TradeItemCreated, utils::e500};

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
}

#[tracing::instrument(name = "Create new trade item", skip(pool))]
pub async fn new_tradeitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    let res = insert_new_trade_item(q_params.id, &pool)
        .await
        .context("Failed to insert new pf item to db")
        .map_err(e500)?;
    Ok(HttpResponse::Created().json(res))
}

#[tracing::instrument(
    name = "Insert new portfolio item to db", 
    skip_all,
    fields(parent_id=tracing::field::Empty, child_id=tracing::field::Empty)
)]
async fn insert_new_trade_item(
    parent_id: uuid::Uuid,
    pool: &PgPool,
) -> Result<TradeItemCreated, sqlx::Error> {
    let child_id = uuid::Uuid::new_v4();
    tracing::Span::current().record("parent_id", &tracing::field::display(&parent_id));
    tracing::Span::current().record("child_id", &tracing::field::display(&child_id));
    sqlx::query!(
        r#"
        INSERT INTO trade_item (id, portfolio_item_id)
        VALUES ($1, $2);
        "#,
        &child_id,
        &parent_id,
    )
    .execute(pool)
    .await?;
    Ok(TradeItemCreated { id: child_id })
}
