import * as passport from "passport";
const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
import UserDB from "@DB/UserDB";
import { IUser, Payload } from "@DB/models/User";
import config from "@config";
import { Logger } from "@utils";
import * as _ from "lodash";
import { Router } from "express-serve-static-core";

const logger = Logger(module);

function setupJwt(kind: string): passport.Strategy {
    const JWTStrategy = passportJWT.Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get(`security.secrets.${kind.toUpperCase()}`),
    };
    return new JWTStrategy(opts, async (req: any, jwt_payload: Payload, next: any) => {
        logger.debug('payload received', jwt_payload);
        req.usedStrategy = kind;
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
    return new LocalStrategy(async (req: any, username: string, password: string, done: any) => {
        logger.debug(username, password);
        const user: IUser = await UserDB.getByCredentials(username, password);
        req.usedStrategy = "local";
        if (user) {
            return done(null, user);
        } else {
            return done(undefined, false, { message: "Invalid email or password." });
        }
    });
}



export default function setup(): any {
    passport.use("access", setupJwt("access"));
    passport.use("refresh", setupJwt("refresh"));
    passport.use("local", setupLocal());
    return passport.initialize();
}