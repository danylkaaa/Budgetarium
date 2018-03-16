"use strict";
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const Utils = require("@utils");
const UserDB = require("@DB").UserDriver;
const logs = require("@logs")(module);


module.exports = function init() {
    passport.use("access-token", new BearerStrategy(
        async function (token, done) {
            try {
                const decode = Utils.tokens.decode("access", token);
                const me = await UserDB.get.byToken("access", decode);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                logs.error(err);
                return done(null,false);
            }
        }
    ));
};