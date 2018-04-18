import * as winston from "winston";

function logger(module: NodeModule) {
    const path = module.filename.split("/").slice(-2).join("/");
    return new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                colorize: true,
                label: path,
                level: process.env.NODE_ENV.startsWith("dev") ? "debug" : "info",
                silent: process.env.NODE_ENV.startsWith("test"),
            }),
        ],
    });
}

if (process.env.NODE_ENV !== "production") {
    logger(module).debug("Logging initialized at debug level");
}

export default logger;
