use tradecoins::dto::{Portfolio, UserInfo};

use crate::helpers::spawn_app;

#[tokio::test]
async fn after_login_has_an_access_to_user_info() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.get_user_info().await;
    let body = response.json::<UserInfo>().await.unwrap();
    assert_eq!(app.test_user.username, body.username);
    assert_eq!(app.test_user.user_id, body.user_id);
}

#[tokio::test]
async fn after_login_has_an_access_to_portfolio() {
    let app = spawn_app().await;
    app.test_user.login(&app).await;
    let response = app.get_user_data().await;
    let body = response.json::<Portfolio>().await.unwrap();
    assert_eq!("Ok".to_string(), body.info);
    // assert_eq!(, body.data);
}
