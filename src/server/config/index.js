"use strict";
const path = require('path');

/**
 * defines config of server and global constants
 */
let config = {
    IS_DEV: isDev(),
    ROOT_URL: this.IS_DEV ? `localhost:${this.PORT}` : `https://budgetarium.herokuapp.com/`,
    DB_URL: generateDB(),
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: process.env.SERVER_SALT,
        tokenLife: {
            ACCESS: process.env.TOKEN_LIFE_ACCESS,
            REFRESH: process.env.TOKEN_LIKE_REFRESH,
        },
        secrets: {
            ACCESS: process.env.TOKEN_ACCESS_SECRET,
            REFRESH: process.env.TOKEN_REFRESH_SECRET,
        }
    },
    // auth: {
    //     Facebook: {
    //         ID: process.env.FACEBOOK_ID,
    //         SECRET: process.env.FACEBOOK_SECRET
    //     }
    // }
};

/**
 * checks, is server  runs in development mode
 * @returns {boolean} true, if server  runs in development mode
 */
function isDev() {
    return process.env.NODE_ENV && process.env.NODE_ENV.startsWith('dev');
}

/**
 * generate URL of DB
 * @returns {string} URL of DB
 */
function generateDB() {
    let mode = process.env.NODE_ENV == 'dev' ? "DEV" : "PROD";
    console.log(`+Configured in ${mode} mode`);
    let address = process.env[`DB_ADDRESS_${mode}`];
    return address
        .replace(`<dbuser>`, process.env[`DB_USER_${mode}`])
        .replace(`<dbpassword>`, process.env[`DB_PSW_${mode}`]);
}


module.exports = config;