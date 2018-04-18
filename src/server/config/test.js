module.exports = {
    isDev: true,
    ROOT_URL: `localhost:${process.env.PORT}`,
    DB_URL: "SOME_url",
    security: {
        TOKEN_SECRET_LENGTH: 10,
        tokenLife: {
            ACCESS: 1,
            REFRESH: 2,
        },
        secrets: {
            ACCESS: String(Math.random()),
            REFRESH: String(Math.random()),
        },
    }
};
