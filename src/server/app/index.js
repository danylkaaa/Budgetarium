"use strict";
const DB = require("@DB");
const logs = require("@logs")(module);
const auth = require("./services/auth/index");

exports.init = async (app) => {
    await DB.connect();
    auth(app);
    logs.info("configured");
};