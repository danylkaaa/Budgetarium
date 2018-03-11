var express = require("express");
var router = express.Router();
const APIv1 = require("./v1/index");
router.use("/v1", APIv1);
module.exports = router;