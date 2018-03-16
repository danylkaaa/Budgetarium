"use strict";
const passport = require("passport");
const UserDB = require("@DB").UserDriver;
const BasicStrategy = require("passport-http").BasicStrategy;
const logs = require("@logs")(module);

module.exports = function init() {
    passport.use("basic", new BasicStrategy(
        async function (username, password, done) {
            try {
                const user = await UserDB.get.byCredentials(username, password);
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            } catch (err) {
                logs.error(err);
                return done(err);
            }
        }
    ));
};