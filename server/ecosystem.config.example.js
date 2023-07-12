module.exports = {
    apps: [
        {
            name: "tradecoins_server",
            script: "./tradecoins-server",
            watch: true,
            env: {
                "APP_APPLICATION__PORT": "8000",
                "APP_DATABASE__USERNAME": "user",
                "APP_DATABASE__PASSWORD": "password",
            }
        }
    ]
}
