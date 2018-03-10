// let mongoose = require("mongoose");
require("module-alias/register");
//Подключаем dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
// let server = require("../src/server/bin/www");
chai.should();
chai.use(chaiHttp);

