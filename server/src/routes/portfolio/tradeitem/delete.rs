use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::utils::e500;

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
}

#[tracing::instrument(name = "Deleting trade item", skip(pool))]
pub async fn delete_tradeitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    delete_trade_item(q_params.id, &pool)
        .await
        .context(format!("Failed to delete trade item - id:{}", q_params.id))
        .map_err(e500)?;
    Ok(HttpResponse::NoContent().finish())
}

#[tracing::instrument(
    name = "Deleting trade item from db", 
    skip_all,
    fields(id=tracing::field::Empty)
)]
async fn delete_trade_item(id: uuid::Uuid, pool: &PgPool) -> Result<(), sqlx::Error> {
    tracing::Span::current().record("id", &tracing::field::display(&id));
    sqlx::query!("DELETE FROM trade_item WHERE id = $1;", &id,)
        .execute(pool)
        .await?;
    Ok(())
}
