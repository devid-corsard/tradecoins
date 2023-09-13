use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::{
    authentication::UserId,
    dto::{Portfolio, PortfolioItem, TradeItem},
    utils::e500,
};

#[tracing::instrument(name = "Getting user portfolio by id", skip(pool))]
pub async fn data(
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

async fn get_user_portfolio(user_id: uuid::Uuid, pool: &PgPool) -> Result<Portfolio, sqlx::Error> {
    let rows = sqlx::query!(
        r#"
        SELECT pi.name, pi.id pi_id, ti.id, ti.amount, ti.buy_price, ti.sell_price
        FROM portfolio_item pi
        JOIN trade_item ti ON pi.id = ti.portfolio_item_id
        WHERE pi.user_id = $1 ORDER BY pi.id;
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    //    Record {
    //     name: None,
    //     pi_id: 19f10878-f4fa-4d7d-8181-8b64e619d25e,
    //     id: e2164f4d-1781-4900-99b9-433d2f176d5b,
    //     amount: None,
    //     buy_price: None,
    //     sell_price: None,
    // }
    let mut portfolio_data: Vec<PortfolioItem> = Vec::with_capacity(15);
    let mut cur_pi: Option<&mut PortfolioItem> = None;
    for record in rows {
        let new_trade_item = TradeItem {
            amount: record.amount.unwrap_or("".into()),
            buy_price: record.buy_price.unwrap_or("".into()),
            sell_price: record.sell_price.unwrap_or("".into()),
            id: record.id,
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
    let portfolio = Portfolio {
        info: "Ok".into(),
        data: portfolio_data,
    };
    dbg!(&portfolio);
    Ok(portfolio)
}
