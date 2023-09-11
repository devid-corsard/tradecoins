use tradecoins::dto::PortfolioItemCreated;

use crate::helpers::spawn_app;

#[tokio::test]
async fn create_new_empty_portfolio_item_respond_with_201_and_ids() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.post_new_portfolio_item().await;
    assert_eq!(201, response.status().as_u16());
    let body = response.json::<PortfolioItemCreated>().await.unwrap();
    assert!(!body.item_id.is_nil());
    assert!(!body.child_id.is_nil());
}
