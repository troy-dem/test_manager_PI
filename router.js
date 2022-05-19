//import express
let express = require("express");
//set router settings
let router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//import the controlers
var TestEventControler = require("./Controlers/TestEventControler");

//routes for Tests
router.get('/tests', TestEventControler.listAll)

// export router module
module.exports = router;