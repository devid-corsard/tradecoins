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
    let res = get_user_portfolio(*user_id, &pool)
        .await
        .context("")
        .map_err(e500)?;

    Ok(HttpResponse::Ok().json(adapter_db_to_dto(res)))
}

#[derive(Debug, sqlx::FromRow)]
struct TradeItemFromDb {
    name: Option<String>,
    pi_id: uuid::Uuid,
    id: Option<uuid::Uuid>,
    amount: Option<String>,
    buy_price: Option<String>,
    sell_price: Option<String>,
}

async fn get_user_portfolio(
    user_id: uuid::Uuid,
    pool: &PgPool,
) -> Result<Vec<TradeItemFromDb>, sqlx::Error> {
    let rows = sqlx::query_as!(
        TradeItemFromDb,
        r#"
        SELECT pi.name, pi.id pi_id, ti.id as "id?", ti.amount, ti.buy_price, ti.sell_price
        FROM portfolio_item pi
        LEFT JOIN trade_item ti ON pi.id = ti.portfolio_item_id
        WHERE pi.user_id = $1
        ORDER BY pi.created_at, ti.created_at;
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    Ok(rows)
}

fn adapter_db_to_dto(rows: Vec<TradeItemFromDb>) -> Portfolio {
    let mut portfolio_data: Vec<PortfolioItem> = Vec::with_capacity(15);
    let mut cur_potrfolio_item: Option<&mut PortfolioItem> = None;
    for record in rows {
        let new_trade_item = match record.id {
            // check if trade item exists
            // because it can be an empty portfolio item
            // whithout trade item data
            // so we can just push empty portfolio item
            // to portfolio and start new loop iter
            None => {
                let new_portfolio_item = PortfolioItem {
                    id: record.pi_id,
                    name: record.name.unwrap_or("".into()),
                    data: Vec::default(),
                };
                portfolio_data.push(new_portfolio_item);
                cur_potrfolio_item = Some(portfolio_data.last_mut().unwrap());
                continue;
            }
            Some(id) => TradeItem {
                amount: record.amount.unwrap_or("".into()),
                buy_price: record.buy_price.unwrap_or("".into()),
                sell_price: record.sell_price.unwrap_or("".into()),
                id,
            },
        };
        match cur_potrfolio_item {
            // first iteration
            None => {
                let mut new_portfolio_item = PortfolioItem {
                    id: record.pi_id,
                    name: record.name.unwrap_or("".into()),
                    data: Vec::default(),
                };
                new_portfolio_item.data.push(new_trade_item);
                portfolio_data.push(new_portfolio_item);
                cur_potrfolio_item = Some(portfolio_data.last_mut().unwrap());
                continue;
            }
            // at least second iteration
            Some(portfolio_item) => {
                if portfolio_item.id == record.pi_id {
                    // this is the same portfolio_item
                    portfolio_item.data.push(new_trade_item);
                    cur_potrfolio_item = Some(portfolio_item);
                } else {
                    // this is different portfolio_item
                    let mut new_portfolio_item = PortfolioItem {
                        id: record.pi_id,
                        name: record.name.unwrap_or("".into()),
                        data: Vec::with_capacity(15),
                    };
                    new_portfolio_item.data.push(new_trade_item);
                    portfolio_data.push(new_portfolio_item);
                    cur_potrfolio_item = Some(portfolio_data.last_mut().unwrap());
                }
            }
        }
    }
    Portfolio {
        info: "Ok".into(),
        data: portfolio_data,
    }
}
