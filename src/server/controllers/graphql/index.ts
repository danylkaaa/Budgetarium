import app from "server";
import config from "@config";
import * as express from "express";
import * as  passport from "passport";
import typeDefs from "./types";
import resolvers from "./resolvers";
import { IUser } from "@DB/models/User";
import { makeExecutableSchema } from 'graphql-tools';
import * as GraphQLHTTP from 'express-graphql';
import { Router, Request, Response, NextFunction } from "express";
import { ValidationError } from "@utils";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const router = Router();


router.use(GraphQLHTTP(
    (req: Request, res: Response): Promise<any> => {
        return new Promise((resolve, reject) => {
            const next = (user: IUser, info = {}) => {
                /**
                 * GraphQL configuration goes here
                 */
                resolve({
                    schema,
                    graphiql: config.get("isDev"), // <- only enable GraphiQL in production
                    pretty: config.get("isDev"),
                    context: {
                        user: user || null,
                    },
                    formatError: (error: any): any => ({
                        message: error.message,
                        state: error.originalError && error.originalError.state,
                        path: error.path,
                        status:error.status||500
                    })
                });
            };
            /**
             * Try to authenticate using passport,
             * but never block the call from here.
             */
            passport.authenticate(['access'], { session: false }, (err, loginOptions) => {
                next(loginOptions);
            })(req, res, next);
        })
    }));


export const GraphQLRouter = router;