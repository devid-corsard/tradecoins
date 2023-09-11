use crate::{
    authentication::reject_anonymous_users,
    configuration::{DatabaseSettings, Settings},
    routes::{create_user, data, health_check, info, login, logout, portfolioitem},
};
use actix_files::Files;
use actix_session::storage::RedisSessionStore;
use actix_session::SessionMiddleware;
use actix_web::{cookie::Key, HttpResponse};
use actix_web::{dev::Server, web, App, HttpServer};
use actix_web_lab::middleware::from_fn;
use secrecy::{ExposeSecret, Secret};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::net::TcpListener;
use tracing_actix_web::TracingLogger;

pub struct Application {
    port: u16,
    server: Server,
}

impl Application {
    pub async fn build(configuration: Settings) -> Result<Self, anyhow::Error> {
        let connection_pool = get_connection_pool(&configuration.database);

        let address = format!(
            "{}:{}",
            configuration.application.host, configuration.application.port
        );
        let listener = TcpListener::bind(address)?;
        let port = listener.local_addr().unwrap().port();
        let server = run(
            listener,
            connection_pool,
            configuration.application.base_url,
            configuration.application.hmac_secret,
            configuration.redis_uri,
        )
        .await?;

        Ok(Self { port, server })
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub async fn run_until_stopped(self) -> Result<(), std::io::Error> {
        self.server.await
    }
}

pub fn get_connection_pool(configuration: &DatabaseSettings) -> PgPool {
    PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(2))
        .connect_lazy_with(configuration.with_db())
}

pub struct ApplicationBaseUrl(pub String);

#[derive(Clone)]
pub struct HmacSecret(pub Secret<String>);

async fn react() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../../client/dist/index.html"))
}

async fn run(
    listener: TcpListener,
    db_pool: PgPool,
    base_url: String,
    hmac_secret: Secret<String>,
    redis_uri: Secret<String>,
) -> Result<Server, anyhow::Error> {
    let db_pool = web::Data::new(db_pool);
    let base_url = web::Data::new(ApplicationBaseUrl(base_url));
    let secret_key = Key::from(hmac_secret.expose_secret().as_bytes());
    let hmac_secret = web::Data::new(HmacSecret(hmac_secret));
    let redis_store = RedisSessionStore::new(redis_uri.expose_secret()).await?;
    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger::default())
            .wrap(
                SessionMiddleware::builder(redis_store.clone(), secret_key.clone())
                    .cookie_same_site(actix_web::cookie::SameSite::None)
                    .build(),
            )
            .route("/health_check", web::get().to(health_check))
            .service(
                web::scope("/api")
                    .route("/login", web::post().to(login))
                    .route("/register", web::post().to(create_user))
                    .service(
                        web::scope("/user")
                            .wrap(from_fn(reject_anonymous_users))
                            //         .route("/password", web::post().to(change_password))
                            .route("/info", web::get().to(info))
                            .route("/data", web::get().to(data))
                            .route("/portfolioitem", web::post().to(portfolioitem))
                            .route("/logout", web::post().to(logout)),
                    ),
            )
            .route("/login", web::get().to(react))
            .route("/register", web::get().to(react))
            .service(Files::new("/", "../client/dist").index_file("index.html"))
            .app_data(db_pool.clone())
            .app_data(base_url.clone())
            .app_data(hmac_secret.clone())
    })
    .listen(listener)?
    .run();
    Ok(server)
}
