module.exports = {
    isDev: true,
    ROOT_URL: `localhost:${this.PORT}`,
    DB_URL: process.env.DB_ADDRESS_DEV
        .replace(`<dbuser>`, process.env.DB_USER_DEV)
        .replace(`<dbpassword>`, process.env.DB_PSW_DEV),
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: process.env.SERVER_SALT,
        tokenLife: {
            ACCESS: 60 * 60, //1 hour
            REFRESH: 60 * 60 * 24, //1 day
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
}

