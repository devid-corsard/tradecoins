use tradecoins::routes::LoginResponse;

use crate::helpers::spawn_app;

#[tokio::test]
async fn login_with_valid_data_returns_200_and_json_info() {
    let app = spawn_app().await;
    let body = serde_json::json!({
        "username":&app.test_user.username,
        "password":&app.test_user.password
    });

    let response = app.post_login(&body).await;
    assert_eq!(200, response.status().as_u16());
    let body = response.json::<LoginResponse>().await.unwrap();
    assert_eq!(true, body.succes);
    assert_eq!("Login successful.", body.messages[0]);
}

#[tokio::test]
async fn login_with_invalid_form_data_returns_400() {
    let app = spawn_app().await;
    let test_cases = [
        (
            serde_json::json!({
                "username": &app.test_user.username,
            }),
            "Password field is empty",
        ),
        (
            serde_json::json!({
                "password": &app.test_user.password,
            }),
            "Username field in empty",
        ),
    ];
    for (invalid_body, error) in test_cases {
        let response = app.post_login(&invalid_body).await;
        assert_eq!(
            response.status().as_u16(),
            400,
            "Didn't send 400 when body is invalid because of {}",
            error
        );
    }
}

#[tokio::test]
async fn login_with_incorrect_input_returns_400_and_json_info() {
    let app = spawn_app().await;
    let incorrect_username = uuid::Uuid::new_v4().to_string();
    let incorrect_password = uuid::Uuid::new_v4().to_string();
    let test_cases = [
        (
            serde_json::json!({
                "username": &app.test_user.username,
                "password": &incorrect_password,
            }),
            "Invalid credentials.",
        ),
        (
            serde_json::json!({
                "username": &incorrect_username,
                "password": &app.test_user.password,
            }),
            "Invalid credentials.",
        ),
    ];
    for (invalid_body, error) in test_cases {
        let response = app.post_login(&invalid_body).await;
        assert_eq!(
            response.status().as_u16(),
            400,
            "Didn't send 400 when body is invalid becouse of {}",
            error
        );
        let body = response.json::<LoginResponse>().await.unwrap();
        assert_eq!(false, body.succes);
        assert_eq!(error, body.messages[0]);
    }
}
