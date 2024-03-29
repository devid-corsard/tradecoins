use tradecoins::{
    dto::{Portfolio, PortfolioItemCreated, TradeItemCreated},
    routes::InputFields,
};

use crate::helpers::spawn_app;

#[tokio::test]
async fn create_new_empty_portfolio_item_respond_with_201_and_ids() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.post_new_portfolio_item().await;
    assert_eq!(201, response.status().as_u16());
    let body = response.json::<PortfolioItemCreated>().await.unwrap();
    assert!(!body.parent_id.is_nil());
    assert!(!body.child_id.is_nil());
}

#[tokio::test]
async fn create_new_empty_portfolio_item_stored_in_the_db() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    app.post_new_portfolio_item().await;
    let response = app.get_user_portfolio().await;
    assert_eq!(200, response.status().as_u16());
    let body = response.json::<Portfolio>().await.unwrap();
    assert_eq!(1, body.data.len());
    assert_eq!(1, body.data[0].data.len());
}

#[tokio::test]
async fn create_new_empty_trade_item_respond_with_201_and_id_and_stored_in_the_db() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.post_new_portfolio_item().await;
    let body = response.json::<PortfolioItemCreated>().await.unwrap();
    let response = app.post_new_trade_item(&body.parent_id).await;
    assert_eq!(201, response.status().as_u16());
    let body = response.json::<TradeItemCreated>().await.unwrap();
    assert!(!body.id.is_nil());
    let response = app.get_user_portfolio().await;
    let body = response.json::<Portfolio>().await.unwrap();
    assert_eq!(1, body.data.len());
    assert_eq!(2, body.data[0].data.len());
}

#[tokio::test]
async fn delete_trade_item_returns_200_and_deleting_from_db() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    app.post_new_portfolio_item().await;
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    let response = app.delete_trade_item(&portfolio.data[0].data[0].id).await;
    assert_eq!(204, response.status().as_u16());
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    assert_eq!(1, portfolio.data.len());
    assert_eq!(0, portfolio.data[0].data.len());
}

#[tokio::test]
async fn delete_portfolio_item_returns_200_and_deleting_from_db() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    app.post_new_portfolio_item().await;
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    let response = app.delete_portfolio_item(&portfolio.data[0].id).await;
    assert_eq!(204, response.status().as_u16());
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    assert_eq!(0, portfolio.data.len());
}

#[tokio::test]
async fn edit_portfolio_item_names_works() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    app.post_new_portfolio_item().await;
    app.post_new_portfolio_item().await;
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    let new_name = uuid::Uuid::new_v4().to_string();
    let new_name_2 = uuid::Uuid::new_v4().to_string();
    let response = app
        .edit_portfolio_item(&portfolio.data[0].id, &new_name)
        .await;
    assert_eq!(204, response.status().as_u16());
    let response = app
        .edit_portfolio_item(&portfolio.data[1].id, &new_name_2)
        .await;
    assert_eq!(204, response.status().as_u16());
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    assert_eq!(new_name, portfolio.data[0].name);
    assert_eq!(new_name_2, portfolio.data[1].name);
}

#[tokio::test]
async fn edit_trade_item_values_works() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    app.post_new_portfolio_item().await;
    app.post_new_portfolio_item().await;
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    let new_values = ["0.0001", "11.5567", "9999"];
    let response = app
        .edit_trade_item(
            &portfolio.data[0].data[0].id,
            InputFields::Amount.to_string().as_str(),
            new_values[0],
        )
        .await;
    assert_eq!(204, response.status().as_u16());
    let response = app
        .edit_trade_item(
            &portfolio.data[1].data[0].id,
            InputFields::BuyPrice.to_string().as_str(),
            new_values[1],
        )
        .await;
    assert_eq!(204, response.status().as_u16());
    // try to edit same value with random value name
    let response = app
        .edit_trade_item(
            &portfolio.data[1].data[0].id,
            uuid::Uuid::new_v4().to_string().as_str(),
            new_values[2],
        )
        .await;
    assert_eq!(400, response.status().as_u16());
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    assert_eq!(new_values[0], portfolio.data[0].data[0].amount);
    assert_eq!(new_values[1], portfolio.data[1].data[0].buy_price);
}

#[tokio::test]
async fn copy_trade_item_returns_201_and_new_item_id_and_stored_to_db() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.post_new_portfolio_item().await;
    let new_items = response.json::<PortfolioItemCreated>().await.unwrap();
    let new_values = ["0.0001", "11.5567"];
    app.edit_trade_item(
        &new_items.child_id,
        InputFields::Amount.to_string().as_str(),
        new_values[0],
    )
    .await;
    app.edit_trade_item(
        &new_items.child_id,
        InputFields::BuyPrice.to_string().as_str(),
        new_values[1],
    )
    .await;
    let response = app.post_copy_trade_item(&new_items.child_id).await;
    assert_eq!(201, response.status().as_u16());
    let response = app.get_user_portfolio().await;
    let portfolio = response.json::<Portfolio>().await.unwrap();
    assert_eq!(2, portfolio.data[0].data.len());
    assert_eq!(
        portfolio.data[0].data[0].amount,
        portfolio.data[0].data[1].amount
    );
    assert_eq!(
        portfolio.data[0].data[0].buy_price,
        portfolio.data[0].data[1].buy_price
    );
    assert_eq!(new_values[0], portfolio.data[0].data[1].amount);
    assert_eq!(new_values[1], portfolio.data[0].data[1].buy_price);
}
