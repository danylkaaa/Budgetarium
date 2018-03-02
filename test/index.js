let mongoose = require("mongoose");

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/bin/www');
let should = chai.should();
chai.use(chaiHttp);

