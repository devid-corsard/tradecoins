use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::{PgPool, Postgres, Transaction};

use crate::{
    authentication::UserId, dto::PortfolioItemCreated, session_state::TypedSession, utils::e500,
};

#[tracing::instrument(name = "Create new portfolio item", skip(pool, session))]
pub async fn portfolioitem(
    pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
    session: TypedSession,
) -> Result<HttpResponse, actix_web::Error> {
    let user_id = user_id.into_inner();
    let mut tx = pool.begin().await.map_err(e500)?;
    let res = insert_new_portfolio_item(*user_id, &mut tx)
        .await
        .context("Failed to insert new pf item to db")
        .map_err(e500)?;
    tx.commit()
        .await
        .context("Transaction failed")
        .map_err(e500)?;
    session.renew();
    Ok(HttpResponse::Created().json(res))
}

#[tracing::instrument(
    name = "Insert new portfolio item to db", 
    skip_all,
    fields(parent_id=tracing::field::Empty, child_id=tracing::field::Empty)
)]
async fn insert_new_portfolio_item(
    user_id: uuid::Uuid,
    tx: &mut Transaction<'_, Postgres>,
) -> Result<PortfolioItemCreated, sqlx::Error> {
    let parent_id = uuid::Uuid::new_v4();
    let child_id = uuid::Uuid::new_v4();
    tracing::Span::current().record("parent_id", &tracing::field::display(&parent_id));
    tracing::Span::current().record("child_id", &tracing::field::display(&child_id));
    sqlx::query!(
        r#"
        INSERT INTO portfolio_item (id, user_id)
        VALUES ($1, $2);
        "#,
        &parent_id,
        user_id,
    )
    .execute(&mut **tx)
    .await?;
    sqlx::query!(
        r#"
        INSERT INTO trade_item (id, portfolio_item_id)
        VALUES ($1, $2);
        "#,
        &child_id,
        &parent_id,
    )
    .execute(&mut **tx)
    .await?;
    Ok(PortfolioItemCreated {
        parent_id,
        child_id,
    })
}
