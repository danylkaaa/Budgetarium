"use strict";
require("module-alias/register");
import * as path from "path";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as lusca from "lusca";
import * as expressValidator from "express-validator";
import * as cors from "cors";
import * as errorhandler from "errorhandler";
import * as express from "express";
import Logger from "@logger";
import {Response, Request, Application, NextFunction} from "express";

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
    private app: Application;

    private constructor() {
        this.app = express();
        // configure app
        this.config();
        // configure routes
        this.routes();
    }

    public getApp(): Application {
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

    private normalizePort(val: string): any {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }

    private config() {
        this.app.use((req: Request, res: Response) => {
            return res.json({status: "OK"});
        });
        this.app.set("port", this.normalizePort(process.env.PORT || "3000"));
        dotenv.config();
        this.up();
        logs.info("Server configured");
    }

    private routes() {
        logs.info("Server connected routes");
    }
}

export default App;
