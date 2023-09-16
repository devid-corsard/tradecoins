use std::str::FromStr;

use actix_web::{web, HttpResponse};
use anyhow::Context;
use sqlx::PgPool;

use crate::utils::{e400, e500};

pub enum InputFields {
    Amount,
    BuyPrice,
    SellPrice,
}

impl FromStr for InputFields {
    type Err = String;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "amount" => Ok(Self::Amount),
            "buy_price" => Ok(Self::BuyPrice),
            "sell_price" => Ok(Self::SellPrice),
            _ => Err("Illigal field".to_string()),
        }
    }
}

impl ToString for InputFields {
    fn to_string(&self) -> String {
        match self {
            InputFields::Amount => "amount".to_string(),
            InputFields::BuyPrice => "buy_price".to_string(),
            InputFields::SellPrice => "sell_price".to_string(),
        }
    }
}

#[derive(serde::Deserialize, Debug)]
pub struct Params {
    pub id: uuid::Uuid,
    pub name: String,
    pub value: String,
}

#[tracing::instrument(name = "Edit trade item values", skip(pool))]
pub async fn edit_tradeitem(
    pool: web::Data<PgPool>,
    q_params: web::Query<Params>,
) -> Result<HttpResponse, actix_web::Error> {
    let q_params = q_params.into_inner();
    let value_name = InputFields::from_str(q_params.name.as_str()).map_err(e400)?;
    let rows_affected = edit_trade_item(q_params.id, value_name, q_params.value, &pool)
        .await
        .context(format!("Failed to edit trade item - id:{}", q_params.id))
        .map_err(e500)?;
    if rows_affected == 0 {
        return Err(e400("No changes"));
    }
    Ok(HttpResponse::NoContent().finish())
}

#[tracing::instrument(
    name = "Saving trade item new values in db", 
    skip_all,
    fields(id=tracing::field::Empty)
)]
async fn edit_trade_item(
    id: uuid::Uuid,
    name: InputFields,
    value: String,
    pool: &PgPool,
) -> Result<u64, sqlx::Error> {
    tracing::Span::current().record("id", &tracing::field::display(&id));
    let query = format!(
        "UPDATE trade_item SET {} = $1 WHERE id = $2",
        name.to_string()
    );
    let res = sqlx::query(&query)
        .bind(value)
        .bind(id)
        .execute(pool)
        .await?;
    Ok(res.rows_affected())
}
