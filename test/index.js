require("module-alias/register");

//config chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiPromised = require("chai-as-promised");
chai.use(chaiHttp);
chai.use(chaiPromised);

try {
    //run server
    require("@server/bin/www");
    //Include tests
    require("./api/tests-order");
}catch (e) {
    console.log(e);
}