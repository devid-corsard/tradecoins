use actix_web::{web, HttpResponse};
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct UserCred {
    name: String,
    password: String,
}
#[tracing::instrument(
    name = "Register a new user",
    skip(form, pool),
    fields(
        subscriber_name = %form.name,
    )
)]
pub async fn register_user(form: web::Form<UserCred>, pool: web::Data<PgPool>) -> HttpResponse {
    match create_new_user(&form, &pool).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[tracing::instrument(
    name = "Saving new user details in the database",
    skip(form, pool)
)]
pub async fn create_new_user(form: &UserCred, pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO users (id, name, password, subscribed_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        form.name,
        form.password,
        Utc::now(),
    )
    .execute(pool)
    .await
    .map_err(|e| {
        tracing::error!("Failed to execute a query: {:?}", e);
        e
    })?;
    Ok(())
}

