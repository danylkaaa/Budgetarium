module.exports = {
    isDev: true,
    ROOT_URL: `https://budgetarium.herokuapp.com/`,
    DB_URL: process.env.DB_ADDRESS_TEST
        .replace(`<dbuser>`, process.env.DB_USER_TEST)
        .replace(`<dbpassword>`, process.env.DB_PSW_TEST),
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: process.env.SERVER_SALT,
        tokenLife: {
            ACCESS: 30, // 30 seconds
            REFRESH: 60, //1 minute
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
}

