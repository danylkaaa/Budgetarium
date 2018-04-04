// config
require("dotenv").config();
require("module-alias/register");
// tools
// const favicon = require("serve-favicon");
const services = require("@services"),
    express = require("express"),
    path = require("path"),
    logs = require("@logs")(module),
    app = express();

function init() {
    try {
        // run static file server
        app.use(express.static(path.join(__dirname, "public")));
        // app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
        // don"t show logs in test mode
        if (process.env.NODE_ENV !== "test") {
            app.use(require("morgan")("combined")); //"combined" prints logs in apache style
        }
        app.use(require("body-parser").json());
        app.use(require("body-parser").urlencoded({extended: false}));
        app.use(require("busboy-body-parser")());
        app.use(require("cors")());
        services.init(app);
        app.use(require("@routes/index"));
        logs.info("+Up");
    }catch (e) {
        process.exit(1);
    }
}

init();

module.exports = app;
