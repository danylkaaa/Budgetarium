import * as winston from "winston";
import config from "@config";
export default function logger(module: NodeModule) {
    const path = module.filename.split("/").slice(-2).join("/");
    return new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                colorize: true,
                label: path,
                level: config.get("isDev")? "debug" : "info",
                // silent: process.env.NODE_ENV.startsWith("test"),
            }),
        ],
    });
}

if (process.env.NODE_ENV !== "production") {
    logger(module).debug("Logging initialized at debug level");
    console.trace("123");
}
