use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::{
    dto::TradeItemCreated,
    utils::{e400, e500},
};

#[derive(serde::Deserialize, Debug)]
#[serde(tag = "action")]
pub enum Params {
    New { parent_id: uuid::Uuid },
    Copy { id: uuid::Uuid },
}

#[tracing::instrument(name = "Create new or copy existing trade item", skip(pool))]
pub async fn new_tradeitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    let new_item_id = match q_params {
        Params::New { parent_id } => insert_new_trade_item(parent_id, &pool)
            .await
            .context("Failed to insert new trade item to db")
            .map_err(e500)?,
        Params::Copy { id } => copy_trade_item(id, &pool)
            .await
            .context("Failed to insert copied trade item to db")
            .map_err(e500)?,
    };
    if new_item_id.is_none() {
        return Err(e400("No changes"));
    }
    Ok(HttpResponse::Created().json(TradeItemCreated {
        id: new_item_id.unwrap(),
    }))
}

#[tracing::instrument(
    name = "Insert new trade item to db",
    skip_all,
    fields(parent_id=%parent_id, child_id=tracing::field::Empty)
)]
async fn insert_new_trade_item(
    parent_id: uuid::Uuid,
    pool: &PgPool,
) -> Result<Option<uuid::Uuid>, sqlx::Error> {
    let child_id = uuid::Uuid::new_v4();
    tracing::Span::current().record("child_id", &tracing::field::display(&child_id));
    let rows = sqlx::query!(
        r#"
        INSERT INTO trade_item (id, portfolio_item_id)
        VALUES ($1, $2);
        "#,
        &child_id,
        &parent_id,
    )
    .execute(pool)
    .await?;
    if rows.rows_affected() == 0 {
        return Ok(None);
    }
    Ok(Some(child_id))
}

#[tracing::instrument(
    name = "Copy trade item in db",
    skip_all,
    fields(
        id=%id,
        copy_id=tracing::field::Empty,
    )
)]
async fn copy_trade_item(id: uuid::Uuid, pool: &PgPool) -> Result<Option<uuid::Uuid>, sqlx::Error> {
    let copy_id = uuid::Uuid::new_v4();
    tracing::Span::current().record("copy_id", &tracing::field::display(&copy_id));
    let rows = sqlx::query!(
        r#"
        INSERT INTO trade_item (portfolio_item_id, amount, buy_price, sell_price, id)
        SELECT portfolio_item_id, amount, buy_price, sell_price, $1
        FROM trade_item
        WHERE id = $2;
        "#,
        &copy_id,
        &id,
    )
    .execute(pool)
    .await?;
    if rows.rows_affected() == 0 {
        return Ok(None);
    }
    Ok(Some(copy_id))
}
