module.exports = {
    isDev: true,
    ROOT_URL: `localhost:${this.PORT}`,
    DB_URL: `mongodb://${process.env.DB_USER_DEV}:${process.env.DB_PSW_DEV}@ds012168.mlab.com:12168/budgetarium_dev`,
    PORT: process.env.PORT || 3000,
    security: {
        TOKEN_SECRET_LENGTH: 32,
        tokenLife: {
            ACCESS: 60 * 60, //1 hour
            REFRESH: 60 * 60 * 24, //1 day
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    }
};

