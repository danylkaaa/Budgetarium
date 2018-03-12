const config = require("@config");
const mongoose = require("mongoose");
const logs = require("@logs")(module);
const UserDriver = require("./driver/user");

/**
 * connects to MongoDB server
 * @returns {Promise<any>} error, if smth is going wrong
 */
function connect() {
    mongoose.connect(config.DB_URL);
    const database = mongoose.connection;
    return new Promise((resolve, reject) => {
        database.on("connected", () => {
            logs.info("DB connected");
            logs.debug(`DB  ${config.DB_URL}`);
            resolve();
        });
        database.on("disconnected", () => {
            logs.error("DB disconnected");
        });
        database.on("error", error => {
            logs.error("DB connection error:", error.message);
            reject(error);
        });
    });
}


module.exports = {
    connect,
    UserDriver
};