use tradecoins::routes::RegisterResponse;

use crate::helpers::spawn_app;

#[tokio::test]
async fn register_with_valid_data_returns_201_and_json_info() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let body = serde_json::json!({
        "username": username,
        "password": password,
    });
    let response = app.post_register(&body).await;
    assert_eq!(201, response.status().as_u16());
    let body = response.json::<RegisterResponse>().await.unwrap();
    assert_eq!(true, body.succes);
    assert_eq!("Registration successful.", body.messages[0]);
}

#[tokio::test]
async fn register_with_valid_data_creates_a_new_user_record_in_the_db() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let body = serde_json::json!({
        "username": username,
        "password": password,
    });
    let response = app.post_register(&body).await;
    assert_eq!(201, response.status().as_u16());
    let saved = sqlx::query!("SELECT username, password_hash, user_id FROM users")
        .fetch_one(&app.db_pool)
        .await
        .expect("Failed to fetch saved user");

    assert_eq!(saved.username, username);
    assert!(!saved.password_hash.is_empty());
    assert!(!saved.user_id.is_nil());
}

#[tokio::test]
async fn register_with_invalid_form_data_returns_400() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let test_cases = [
        (
            serde_json::json!({
                "username": &username,
            }),
            "Password field is empty",
        ),
        (
            serde_json::json!({
                "password": &password,
            }),
            "Username field in empty",
        ),
    ];
    for (invalid_body, error) in test_cases {
        let response = app.post_register(&invalid_body).await;
        assert_eq!(
            response.status().as_u16(),
            400,
            "Didn't send 400 when body is invalid becouse of {}",
            error
        );
    }
}

#[tokio::test]
async fn register_with_incorrect_data_returns_400_and_json_info() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let min_pass_length = 8;
    let min_username_length = 5;
    let test_cases = [
        (
            serde_json::json!({
                "username": &username,
                "password": &password[0..min_pass_length-1],
            }),
            "Password length must be at least 8 characters long",
        ),
        (
            serde_json::json!({
                "username": &username[0..min_username_length-1],
                "password": &password,
            }),
            "Username length must be at least 5 characters long",
        ),
    ];
    for (invalid_body, error) in test_cases {
        let response = app.post_register(&invalid_body).await;
        assert_eq!(
            response.status().as_u16(),
            400,
            "Didn't send 400 when body is invalid becouse of {}",
            error
        );
        let body = response.json::<RegisterResponse>().await.unwrap();
        assert_eq!(false, body.succes);
        assert_eq!(error, body.messages[0]);
    }
}

#[tokio::test]
async fn username_must_be_unique() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let body = serde_json::json!({
        "username": username,
        "password": &password,
        "confirm_password": password
    });
    app.post_register(&body).await;
    let response = app.post_register(&body).await;
    assert_eq!(400, response.status().as_u16());
    let body = response.json::<RegisterResponse>().await.unwrap();
    assert_eq!(false, body.succes);
    assert_eq!("Username already in use", body.messages[0]);
}

#[tokio::test]
async fn register_with_valid_data_creates_new_user_session() {
    let app = spawn_app().await;
    let username = uuid::Uuid::new_v4().to_string();
    let password = uuid::Uuid::new_v4().to_string();
    let body = serde_json::json!({
        "username": username,
        "password": password,
    });
    let response = app.post_register(&body).await;
    assert!(response.cookies().count() == 1);
}
