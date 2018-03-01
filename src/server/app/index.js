"use strict";
const DB = require('@DB');
const logs=require('@logs')(module);

exports.init = async (app) => {
    await DB.connect();
    logs.info('configured');
};