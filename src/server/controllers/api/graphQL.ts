import app from "server";
import { Router, Application } from "express";
import * as express from "express";
import config from "@config";
// import * as GraphQLHTTP from "express-graphql";
// import { buildSchema } from "graphql";

const { buildSchema } = require("graphql");
const GraphQLHTTP = require("express-graphql");
const router: Router = express.Router();

const rootValue = {
    postTitle: () => {
        return "Build a Simple GraphQL Server With Express and NodeJS";
    },
    blogTitle: () => {
        return "scotch.io";
    }
};

const schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

router.use("/graphql", GraphQLHTTP({
    schema,
    rootValue,
    graphiql: config.get("isDev"),
}));

export default router;