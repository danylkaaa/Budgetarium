import { Application } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import UserDB from "@DB/UserDB";
import { IUser } from "@DB/models/User";
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
    return new JWTStrategy(opts, async (jwt_payload, next) => {
        logger.debug('payload received', jwt_payload);
        // usually this would be a database call:
        const user: IUser = await UserDB.getByToken(kind, jwt_payload);
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
}

function setupLocal(): passport.Strategy {
    const LocalStrategy = passportLocal.Strategy;
    return new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        const user: IUser = await UserDB.getByCredentials(email, password);
        if (user) {
            return done(null, user);
        } else {
            return done(undefined, false, { message: "Invalid email or password." });
        }
    });
}



function setup(app: Application): void {
    passport.use("access", setupJwt("access"));
    passport.use("refresh", setupJwt("refresh"));
    passport.use("local", setupLocal());
}


export default setup;