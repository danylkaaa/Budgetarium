import App from "../App";
import {Logger} from "@utils";
import * as http from "http";

const logs = Logger(module);
const app: any = App.getInstance().getApp();
const server = http.createServer(app);
server.listen(app.get("port"));
server.on("error", onError);
server.on("listening", onListening);

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind: string = typeof app.get("port") === "string"
        ? "Pipe " + app.get("port")
        : "Port " + app.get("port");

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logs.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logs.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    logs.debug("Listening on " + bind);
}

export default app;
