import app from "server";
import config from "@config";
import * as express from "express";
import * as  passport from "passport";
import typeDefs from "./schema";
import rootValue from "./resolvers";
import { IUser } from "@DB/models/User";
import { buildSchema } from "graphql";
const GraphQLHTTP = require("express-graphql");

const schema = buildSchema(typeDefs);

const GQL = GraphQLHTTP(
    (req: Request, res: Response) => {
        return new Promise((resolve, reject) => {
            const next = (user: IUser, info = {}) => {
                /**
                 * GraphQL configuration goes here
                 */
                resolve({
                    schema,
                    rootValue,
                    graphiql: process.env.NODE_ENV !== 'production', // <- only enable GraphiQL in production
                    pretty: true,
                    context: {
                        user: user || null,
                    },
                });
            };
            /**
             * Try to authenticate using passport,
             * but never block the call from here.
             */
            passport.authenticate(['access', "refresh", "local"], { session: false }, (err, user) => {
                next(user);
            })(req, res, next);
        });
    }
);

export default GQL;