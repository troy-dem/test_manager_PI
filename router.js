//import express
let express = require("express");
//set router settings
let router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//import the controlers
var TestEventControler = require("./Controlers/TestEventControler");
var PlayerControler = require("./Controlers/PlayerControler");

//routes for Tests
router.get('/tests', TestEventControler.listAll)

//routes for Test
router.get('/test', TestEventControler.View)
router.post('/test', TestEventControler.create)
router.put('/test', TestEventControler.update)
router.delete('/test', TestEventControler.delete)

//routes for Player
router.get('/player/list', PlayerControler.listAll)
router.get('/player', PlayerControler.View)
router.post('/player', PlayerControler.create)
router.put('/player', PlayerControler.update)
router.delete('/player', PlayerControler.delete)

// export router module
module.exports = router;