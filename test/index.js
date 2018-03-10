require("module-alias/register");

//config chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiPromised = require("chai-as-promised");
chai.use(chaiHttp);
chai.use(chaiPromised);
//run server
require("@server/bin/www");
//Include tests
require("./routes/tests-order");
