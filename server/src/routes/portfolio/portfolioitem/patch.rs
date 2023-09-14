use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::utils::{e400, e500};

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
    pub name: String,
}

#[tracing::instrument(name = "Edit name of portfolio item", skip(pool))]
pub async fn edit_portfolioitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    let rows_affected = edit_portfolio_item(q_params.id, q_params.name, &pool)
        .await
        .context(format!(
            "Failed to change name of portfolio item - id:{}",
            q_params.id
        ))
        .map_err(e500)?;
    if rows_affected == 0 {
        // return Ok(HttpResponse::BadRequest().finish());
        return Err(e400("No changes"));
    }
    Ok(HttpResponse::NoContent().finish())
}

#[tracing::instrument(
    name = "Saving new name of portfolio item to db", 
    skip_all,
    fields(id=tracing::field::Empty)
)]
async fn edit_portfolio_item(
    id: uuid::Uuid,
    new_name: String,
    pool: &PgPool,
) -> Result<u64, sqlx::Error> {
    tracing::Span::current().record("id", &tracing::field::display(&id));
    let res = sqlx::query!(
        "UPDATE portfolio_item SET name = $1 WHERE id = $2;",
        &new_name,
        &id
    )
    .execute(pool)
    .await?;
    Ok(res.rows_affected())
}
