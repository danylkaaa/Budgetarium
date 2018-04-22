
import app from "server";
import * as express from "express";
import config from "@config";
import passport from "passport";
import { UserModel } from "@DB/User";
// import * as GraphQLHTTP from "express-graphql";
// import { buildSchema } from "graphql";

const { buildSchema } = require("graphql");
const GraphQLHTTP = require("express-graphql");

const rootValue = {
    postTitle: (): string => {
        return "Build a Simple GraphQL Server With Express and NodeJS";
    },
    blogTitle: (): string => {
        return "scotch.io";
    }
};

const schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

const GQL = GraphQLHTTP(
    (req: Request, res: Response) => {
        return new Promise((resolve, reject) => {
            const next = (user: UserModel, info = {}) => {
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
