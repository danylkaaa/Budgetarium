import App from "./App";
import logger from "@logger";

const logs = logger(module);
const app: any = App.getInstance().getApp();

/**
 * Start express server.
 */
const port: number = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);
const server = app.listen(app.get("port"), () => {
    logs.debug(`App is running at port ${app.get("port")} in ${app.get("env")} mode`);
});
//
// function normalizePort(val: string): number {
//     const port: number = parseInt(val, 10);
//     if (isNaN(port)) {
//         // named pipe
//         return val;
//     }
//     if (port >= 0) {
//         // port number
//         return port;
//     }
//     return false;
// }

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind: string = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

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

// function onListening() {
//     const addr = server.address();
//     const bind = typeof addr === "string"
//         ? "pipe " + addr
//         : "port " + addr.port;
//     logs.debug("Listening on " + bind);
// }

// export default server;
