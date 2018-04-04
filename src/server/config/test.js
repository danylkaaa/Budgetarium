module.exports = {
    ...require("./basic"),
    isDev: true,
    ROOT_URL: "https://budgetarium.herokuapp.com/",
    DB_URL:process.env.DB_ADDRESS_TEST.replace("<dbuser>",process.env.DB_USER_TEST).replace("<dbpassword>",process.env.DB_PSW_TEST),
    PORT: process.env.PORT || 3000,
    security: {
        TOKEN_SECRET_LENGTH: 10,
        tokenLife: {
            ACCESS: 1, // 2 seconds
            REFRESH: 1, //4 seconds
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
};

