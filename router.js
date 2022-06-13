//import express
let express = require("express");
//set router settings
let router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

//import the controlers
var TestEventControler = require("./Controlers/TestEventControler");
var PlayerControler = require("./Controlers/PlayerControler");

//route for Home
router.get('/level', TestEventControler.getLevel)

//routes for Test
router.post('/test/list', TestEventControler.listAll)
router.post('/test', TestEventControler.create)
router.put('/test', TestEventControler.update)
router.delete('/test', TestEventControler.delete)

//routes for Player
router.post('/player/list', PlayerControler.listAll)
router.post('/player', PlayerControler.create)
router.put('/player', PlayerControler.update)
router.delete('/player', PlayerControler.delete)

//routes for team magement
router.post('/test/team', TestEventControler.getTeam)
router.post('/player/team', PlayerControler.setTeam)
router.delete('/player/team', PlayerControler.removeTeam)

// export router module
module.exports = router;