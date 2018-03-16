module.exports = {
    ...require("./basic"),
    isDev: true,
    ROOT_URL: "https://budgetarium.herokuapp.com/",
    DB_URL: `mongodb://${process.env.DB_USER_TEST}:${process.env.DB_PSW_TEST}@ds012168.mlab.com:12168/budgetarium_test`,
    PORT: process.env.PORT || 3000,
    security: {
        TOKEN_SECRET_LENGTH: 10,
        tokenLife: {
            ACCESS: 1, // 2 seconds
            REFRESH: 3, //4 seconds
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
};

