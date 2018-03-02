const facebook = require('./facebook');
const refresh = require('./bearer-refresh');
const access = require('./bearer-access');
const basic = require('./basic');
const passport = require('passport');
const logs = require('@logs')(module);

module.exports = function (app) {
    facebook();
    access();
    refresh();
    basic();
    app.use(passport.initialize());
    logs.info('configured');
}