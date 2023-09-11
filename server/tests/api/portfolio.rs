use tradecoins::dto::{Portfolio, PortfolioItemCreated};

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
