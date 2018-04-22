import { Application } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import { default as DBUser, UserModel } from "@DB/models/User";
import config from "@config";
import { Logger } from "@utils";
import _ from "lodash";

const logger = Logger(module);

function setupJwt(kind: string): passport.Strategy {
    const JWTStrategy = passportJWT.Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts: passportJWT.StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get(`security.secrets.${kind.toUpperCase()}`),
    };
    return new JWTStrategy(opts, function (jwt_payload, next) {
        logger.debug('payload received', jwt_payload);
        // usually this would be a database call:
        const user = DBUser.findOne({ id: jwt_payload.id, jwtSecrets: { [kind]: jwt_payload.salt } });
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
}

function setupLocal(): passport.Strategy {
    const LocalStrategy = passportLocal.Strategy;
    return new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        DBUser.findOne({ email: email }, (err: any, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(undefined, false, { message: `Email ${email} not found.` });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: "Invalid email or password." });
            });
        });
    });
}



function setup(app: Application): void {
    passport.use("access", setupJwt("access"));
    passport.use("refresh", setupJwt("refresh"));
    passport.use("local", setupLocal());
}


export default setup;