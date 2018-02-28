const config = require('@config');
const mongoose = require('mongoose');
const Utils = require('@utils');

/**
 * connects to MongoDB server
 * @returns {Promise<any>} error, if smth is going wrong
 */
function connect() {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.DB_URL, {
        promiseLibrary: global.Promise
    });
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('+DB: connection closed');
            process.exit(0);
        })
    });
    database.on('disconnected', () => console.log('-DB: disconnected'));
    return new Promise((resolve, reject) => {
        database.on('error', error => {
            console.log(`-DB: connection failed: ${error}`);
            reject(error);
        });
        database.on('connected', () => {
            console.log(`+DB: connected` + (config.IS_DEV ? ` to ${config.DB_URL}` : ""));
            resolve();
        });

    })

}


module.exports = {
    connect,
};