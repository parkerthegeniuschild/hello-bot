require("dotenv").config();

const Redis = require("redis");
const { App } = require("@slack/bolt");

// connect to Redis
const redisConnect = () => {
    const client = Redis.createClient(process.env.REDIS_CONNECTION_URI);

    client.on("connect", () =>
        console.info("⚡️ Redis connection successful!")
    );
    client.on("error", () => console.error.bind(console, "connection error:"));

    return client;
};

// create new App instance
const appInstance = () => {
    const app = new App({
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        token: process.env.SLACK_BOT_TOKEN,
    });

    app.start(process.env.PORT || 5000) &&
        console.log("⚡️ Bolt app is running!");

    return app;
};

module.exports = {
    redis: redisConnect(),
    app: appInstance(),
};
