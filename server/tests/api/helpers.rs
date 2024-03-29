use argon2::{password_hash::SaltString, Algorithm, Argon2, Params, PasswordHasher, Version};
use once_cell::sync::Lazy;
use sqlx::{Connection, Executor, PgConnection, PgPool};
use tradecoins::{
    configuration::{get_configuration, DatabaseSettings},
    startup::{get_connection_pool, Application},
    telemetry::{get_subscriber, init_subscriber},
};
use uuid::Uuid;

pub struct TestApp {
    pub address: String,
    pub db_pool: PgPool,
    pub port: u16,
    pub test_user: TestUser,
    pub api_client: reqwest::Client,
}

impl TestApp {
    pub async fn post_register<F>(&self, body: &F) -> reqwest::Response
    where
        F: serde::Serialize,
    {
        self.api_client
            .post(&format!("{}/api/register", &self.address))
            .header("Content-type", "application/x-www-form-urlencoded")
            .form(body)
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn post_login<F>(&self, body: &F) -> reqwest::Response
    where
        F: serde::Serialize,
    {
        self.api_client
            .post(&format!("{}/api/login", &self.address))
            .header("Content-type", "application/x-www-form-urlencoded")
            .form(body)
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn get_user_info(&self) -> reqwest::Response {
        self.api_client
            .get(&format!("{}/api/user/info", &self.address))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn get_user_portfolio(&self) -> reqwest::Response {
        self.api_client
            .get(&format!("{}/api/user/portfolio", &self.address))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn post_new_portfolio_item(&self) -> reqwest::Response {
        self.api_client
            .post(&format!("{}/api/user/portfolioitem", &self.address))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn post_new_trade_item(&self, id: &uuid::Uuid) -> reqwest::Response {
        self.api_client
            .post(&format!(
                "{}/api/user/tradeitem?action=New&parent_id={}",
                &self.address, &id
            ))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn post_copy_trade_item(&self, id: &uuid::Uuid) -> reqwest::Response {
        self.api_client
            .post(&format!(
                "{}/api/user/tradeitem?action=Copy&id={}",
                &self.address, &id
            ))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn delete_trade_item(&self, id: &uuid::Uuid) -> reqwest::Response {
        self.api_client
            .delete(&format!("{}/api/user/tradeitem?id={}", &self.address, &id))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn delete_portfolio_item(&self, id: &uuid::Uuid) -> reqwest::Response {
        self.api_client
            .delete(&format!(
                "{}/api/user/portfolioitem?id={}",
                &self.address, &id
            ))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn edit_portfolio_item(
        &self,
        id: &uuid::Uuid,
        new_name: &String,
    ) -> reqwest::Response {
        self.api_client
            .patch(&format!(
                "{}/api/user/portfolioitem?id={}&name={}",
                &self.address, &id, &new_name
            ))
            .send()
            .await
            .expect("Failed to execute a request")
    }

    pub async fn edit_trade_item(
        &self,
        id: &uuid::Uuid,
        name: &str,
        value: &str,
    ) -> reqwest::Response {
        self.api_client
            .patch(&format!(
                "{}/api/user/tradeitem?id={}&name={}&value={}",
                &self.address, &id, &name, &value
            ))
            .send()
            .await
            .expect("Failed to execute a request")
    }
}

pub struct TestUser {
    pub user_id: Uuid,
    pub username: String,
    pub password: String,
}

impl TestUser {
    pub fn generate() -> Self {
        Self {
            user_id: Uuid::new_v4(),
            username: Uuid::new_v4().to_string(),
            password: Uuid::new_v4().to_string(),
        }
    }
    async fn store(&self, pool: &PgPool) {
        let salt = SaltString::generate(&mut rand::thread_rng());
        let password_hash = Argon2::new(
            Algorithm::Argon2id,
            Version::V0x13,
            Params::new(15000, 2, 1, None).unwrap(),
        )
        .hash_password(self.password.as_bytes(), &salt)
        .unwrap()
        .to_string();
        sqlx::query!(
            "INSERT INTO users (user_id, username, password_hash) VALUES ($1, $2, $3)",
            self.user_id,
            self.username,
            password_hash
        )
        .execute(pool)
        .await
        .expect("Failed to save test user into DB.");
    }
    pub async fn login(&self, app: &TestApp) {
        let login_body = serde_json::json!({
            "username": &self.username,
            "password": &self.password,
        });
        app.post_login(&login_body).await;
    }
}

static TRACING: Lazy<()> = Lazy::new(|| {
    let subscriber_name = "test".into();
    let default_filter_level = "debug".into();

    if std::env::var("TEST_LOG").is_ok() {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::stdout);
        init_subscriber(subscriber);
    } else {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::sink);
        init_subscriber(subscriber);
    }
});

pub async fn spawn_app() -> TestApp {
    Lazy::force(&TRACING);

    let configuration = {
        let mut c = get_configuration().expect("Failed to read configuration");
        c.database.database_name = Uuid::new_v4().to_string();
        c.application.port = 0;
        c
    };

    configure_database(&configuration.database).await;

    let db_pool = get_connection_pool(&configuration.database);

    let application = Application::build(configuration)
        .await
        .expect("Damn! Can't build the app you so need");

    let application_port = application.port();
    let address = format!("http://localhost:{}", application_port);

    let _ = tokio::spawn(application.run_until_stopped());
    let client = reqwest::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .cookie_store(true)
        .build()
        .unwrap();

    let test_app = TestApp {
        address,
        db_pool,
        port: application_port,
        test_user: TestUser::generate(),
        api_client: client,
    };
    test_app.test_user.store(&test_app.db_pool).await;
    test_app
}

pub async fn configure_database(config: &DatabaseSettings) -> PgPool {
    // Create database
    let mut connection = PgConnection::connect_with(&config.without_db())
        .await
        .expect("Faild to connect to Postgres");
    connection
        .execute(format!(r#"CREATE DATABASE "{}";"#, config.database_name).as_str())
        .await
        .expect("Failed to create a new database");

    // Migrate database
    let connection_pool = PgPool::connect_with(config.with_db())
        .await
        .expect("Failed to connect to Postgres");
    sqlx::migrate!("./migrations")
        .run(&connection_pool)
        .await
        .expect("Failed to migrate a database");
    connection_pool
}
