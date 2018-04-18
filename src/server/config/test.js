module.exports = {
    isDev: true,
    ROOT_URL: `localhost:${process.env.PORT}`,
    DB_URL: process.env.DB_ADDRESS_TEST
        .replace("<dbuser>", process.env.DB_USER_TEST)
        .replace("<dbpassword>", process.env.DB_PSW_TEST),
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
