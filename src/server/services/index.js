"use strict";
const config = require('@config');
const DB = require('@DB');

exports.init = async (app) => {
    await DB.connect();
    console.log('+Tools: configured');
};