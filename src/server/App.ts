require("module-alias/register");
import config from "@config";
import {Currencies, Logger} from "@utils";
import {Application} from "express";
import routes from "@routes";
import auth from "./services/auth";

const path = require("path");

const logs = Logger(module);
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const errorhandler = require("errorhandler");
const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const morgan = require("morgan");
const compression = require("compression");
const favicon = require("express-favicon");

class App {

    public static getInstance(): App {
        if (!this.instance) {
            this.instance = new App();
        }
        return this.instance;
    }

    private timer: any;
    private static instance: App;

    private readonly app: Application;

    private constructor() {
        try {
            this.app = require("express")();
            this.configure();
            // connect to DB
            this.connectToDB();
            // configure app
            this.usePlugins();
            // configure routes
            this.routes();
        } catch (e) {
            logs.error("Catch error while construct app");
            logs.error(e);
            process.exit(-1);
        }
    }

    public getApp(): Application {
        return this.app;
    }

    private connectToDB(): void {
        logs.debug(`Try to connect to ${config.get("DB_URL")}`);
        mongoose.Promise = bluebird;
        return mongoose.connect(config.get("DB_URL"))
            .then(() => {
                logs.info("Connected to MongoDB");
            }).catch((err: any) => {
                logs.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
            });
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

    private configure(): void {
        this.app.set("port", this.normalizePort(process.env.PORT || "3000"));
        Currencies.updateCurrencyRate();
        process.on("exit", (code) => {
            clearTimeout(this.timer);
            process.exit(code);
        }).on("SIGABRT", () => {
            clearTimeout(this.timer);
            process.exit(0);
        }).on("SIGINT", () => {
            clearTimeout(this.timer);
            process.exit(0);
        });
        this.timer = Currencies.runRequestLoop(config.get("CURRENCY_UPDATE_TIMEOUT"));
    }

    private usePlugins(): void {
        this.app.use(morgan(":method :url :status - :response-time ms"));
        if (config.get("isDev")) {
            this.app.use(errorhandler());
        }
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
        this.app.use(compression());
        if(config.get("isDev")) {
            this.app.use(express.static(path.join(__dirname, "public")));
        }else{
            this.app.use(express.static(path.join(__dirname, "public"), {maxAge: "10h"}));
        }
        this.app.use(auth());
        this.app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
        logs.info("App configured");
    }

    private routes(): void {
        this.app.use(routes);
        logs.info("App connected routes");
    }
}

export default App;
