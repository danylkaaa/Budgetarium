// config
require('dotenv').config();
require('module-alias/register');
// tools
const services = require('@services');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const busboyBodyParser = require('busboy-body-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logs = require('@logs')(module);
const app = express();

function init() {
    logs.info(require('@validator')('', "user.displayedName"));
    // run static file server
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
    //don't show logs in test mode
    if (process.env.NODE_ENV !== 'test') {
        app.use(logger('combined')); //'combined' prints logs in apache style
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(busboyBodyParser());
    app.use(cookieParser());
    app.use(cors());
    services.init(app);
    app.use(require('@routes/index'));
    logs.info('+Up');
}

init();

module.exports = app;
