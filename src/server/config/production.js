module.exports = {
    isDev: false,
    ROOT_URL: `https://budgetarium.herokuapp.com/`,
    DB_URL: `mongodb://${process.env.DB_USER_PROD}:${process.env.DB_PSW_PROD}@ds012188.mlab.com:12188/budgetarium_prod`,
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: process.env.SERVER_SALT,
        tokenLife: {
            ACCESS: 60 * 60 * 24, //1 day
            REFRESH: 60 * 60 * 24 * 7, //1 week
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
    validationRules:require('./validationRules')
}

