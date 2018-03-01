module.exports = {
    isDev: true,
    ROOT_URL: `https://budgetarium.herokuapp.com/`,
    DB_URL: `mongodb://${process.env.DB_USER_TEST}:${process.env.DB_PSW_TEST}@ds012168.mlab.com:12168/budgetarium_test`,
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
    validationRules:require('./validationRules')
}

