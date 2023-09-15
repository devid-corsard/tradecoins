use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::{
    authentication::UserId,
    dto::{Portfolio, PortfolioItem, TradeItem},
    utils::e500,
};

#[tracing::instrument(name = "Getting user portfolio by id", skip(pool))]
pub async fn get_portfolio(
    pool: web::Data<PgPool>,
    user_id: web::ReqData<UserId>,
) -> Result<HttpResponse, actix_web::Error> {
    let user_id = user_id.into_inner();
    let portfolio = get_user_portfolio(*user_id, &pool)
        .await
        .context("")
        .map_err(e500)?;
    Ok(HttpResponse::Ok().json(portfolio))
}

#[derive(Debug, sqlx::FromRow)]
struct TradeItemsFromDb {
    name: Option<String>,
    pi_id: uuid::Uuid,
    id: Option<uuid::Uuid>,
    amount: Option<String>,
    buy_price: Option<String>,
    sell_price: Option<String>,
}

async fn get_user_portfolio(user_id: uuid::Uuid, pool: &PgPool) -> Result<Portfolio, sqlx::Error> {
    println!("we are trying to execute an query");
    let rows = sqlx::query_as!(
        TradeItemsFromDb,
        r#"
        SELECT pi.name, pi.id pi_id, ti.id as "id?", ti.amount, ti.buy_price, ti.sell_price
        FROM portfolio_item pi
        LEFT JOIN trade_item ti ON pi.id = ti.portfolio_item_id
        WHERE pi.user_id = $1
        ORDER BY pi.id;
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    Ok(adapter_db_to_dto(rows))
}

fn adapter_db_to_dto(rows: Vec<TradeItemsFromDb>) -> Portfolio {
    let mut portfolio_data: Vec<PortfolioItem> = Vec::with_capacity(15);
    let mut cur_pi: Option<&mut PortfolioItem> = None;
    for record in rows {
        // check if record exists
        // because it can be an empty portfolio item
        // whithout trade items
        if record.id.is_none() {
            let new_portfolio_item = PortfolioItem {
                id: record.pi_id,
                name: record.name.unwrap_or("".into()),
                data: Vec::with_capacity(15),
            };
            portfolio_data.push(new_portfolio_item);
            cur_pi = Some(portfolio_data.last_mut().unwrap());
            continue;
        }
        let trade_item_id = record.id.unwrap();
        let new_trade_item = TradeItem {
            amount: record.amount.unwrap_or("".into()),
            buy_price: record.buy_price.unwrap_or("".into()),
            sell_price: record.sell_price.unwrap_or("".into()),
            id: trade_item_id,
        };
        if cur_pi.is_none() {
            // first iteration
            let mut new_portfolio_item = PortfolioItem {
                id: record.pi_id,
                name: record.name.unwrap_or("".into()),
                data: Vec::with_capacity(15),
            };
            new_portfolio_item.data.push(new_trade_item);
            portfolio_data.push(new_portfolio_item);
            cur_pi = Some(portfolio_data.last_mut().unwrap());
            continue;
        }
        // at least second iteration
        let pi = cur_pi.unwrap();
        if pi.id != record.pi_id {
            // this is different portfolio_item
            let mut new_portfolio_item = PortfolioItem {
                id: record.pi_id,
                name: record.name.unwrap_or("".into()),
                data: Vec::with_capacity(15),
            };
            new_portfolio_item.data.push(new_trade_item);
            portfolio_data.push(new_portfolio_item);
            cur_pi = Some(portfolio_data.last_mut().unwrap());
        } else {
            // this is the same portfolio_item
            pi.data.push(new_trade_item);
            cur_pi = Some(pi);
        }
    }
    Portfolio {
        info: "Ok".into(),
        data: portfolio_data,
    }
}
