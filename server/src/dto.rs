use secrecy::Secret;

#[derive(serde::Deserialize, serde::Serialize)]
pub struct UserInfo {
    pub user_id: uuid::Uuid,
    pub username: String,
}

#[derive(serde::Deserialize)]
pub struct CredentialsForm {
    pub username: String,
    pub password: Secret<String>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct ServerMessage {
    pub success: bool,
    pub messages: Vec<String>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Portfolio {
    pub data: Vec<PortfolioItem>,
    pub info: String,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct PortfolioItem {
    pub id: uuid::Uuid,
    pub name: String,
    pub data: Vec<TradeItem>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct TradeItem {
    pub id: uuid::Uuid,
    pub amount: String,
    pub buy_price: String,
    pub sell_price: String,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct PortfolioItemCreated {
    pub parent_id: uuid::Uuid,
    pub child_id: uuid::Uuid,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct TradeItemCreated {
    pub id: uuid::Uuid,
}
