"use strict";
require("module-alias/register");
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import lusca from "lusca";
import expressValidator from "express-validator";
import cors from "cors";
import path from "path";
import errorhandler from "errorhandler";
import * as express from "express";
import Logger from "@logger";

const busboyBodyParser = require("busboy-body-parser");
const logs = Logger(module);

class App {
    public static getInstance(): App {
        if (!this.instance) {
            this.instance = new App();
        }
        return this.instance;
    }

    private static instance: App;
    private app: Express.Application;

    private constructor() {
        this.app = express();
        // configure app
        this.config();
        // configure routes
        this.routes();
    }

    public getApp(): Express.Application {
        return this.app;
    }

    private up() {
        this.app.use(errorhandler());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(expressValidator());
        this.app.use(lusca.xframe("SAMEORIGIN"));
        this.app.use(lusca.xssProtection(true));
        this.app.use(
            express.static(path.join(__dirname, "public"), {maxAge: "10h"}));
        this.app.use(busboyBodyParser);
    }

    private config() {
        dotenv.config();
        this.up();
        logs.info("Server configured");
    }

    private routes() {
        logs.info("Server connected routes");
    }
}

export default App;
