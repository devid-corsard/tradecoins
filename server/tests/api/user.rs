use tradecoins::dto::{Portfolio, UserInfo};

use crate::helpers::spawn_app;

#[tokio::test]
async fn after_login_has_an_access_to_user_info() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.get_user_info().await;
    let body = response.json::<UserInfo>().await.unwrap();
    assert_eq!(app.test_user.username, body.username);
}

#[tokio::test]
async fn after_login_has_an_access_to_portfolio() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.get_user_portfolio().await;
    let body = response.json::<Portfolio>().await.unwrap();
    assert_eq!("Ok".to_string(), body.info);
}
