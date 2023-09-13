use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::utils::e500;

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
    pub name: String,
}

#[tracing::instrument(name = "Deleting portfolio item", skip(pool))]
pub async fn edit_portfolioitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    edit_portfolio_item(q_params.id, q_params.name, &pool)
        .await
        .context(format!(
            "Failed to delete portfolio item - id:{}",
            q_params.id
        ))
        .map_err(e500)?;
    Ok(HttpResponse::NoContent().finish())
}

#[tracing::instrument(
    name = "Deleting trade item from db", 
    skip_all,
    fields(id=tracing::field::Empty)
)]
async fn edit_portfolio_item(
    id: uuid::Uuid,
    new_name: String,
    pool: &PgPool,
) -> Result<(), sqlx::Error> {
    tracing::Span::current().record("id", &tracing::field::display(&id));
    sqlx::query!(
        "UPDATE portfolio_item SET name = $1 WHERE id = $2;",
        &new_name,
        &id
    )
    .execute(pool)
    .await?;
    Ok(())
}
