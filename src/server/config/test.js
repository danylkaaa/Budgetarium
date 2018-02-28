module.exports = {
    isDev: true,
    ROOT_URL: `https://budgetarium.herokuapp.com/`,
    DB_URL: process.env.DB_ADDRESS_PROD
        .replace(`<dbuser>`, process.env['DB_USER_PROD'])
        .replace(`<dbpassword>`, process.env['DB_PSW_PROD']),
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: process.env.SERVER_SALT,
        tokenLife: {
            ACCESS: 60 * 60*24, //1 day
            REFRESH: 60 * 60 * 24*7, //1 week
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
}

