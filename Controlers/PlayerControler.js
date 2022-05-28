const db = require('../models/index');
const Group = db.TestEvent;
const User = db.Player;

//import response functions
require("express/lib/response");

exports.listAll = async function (req, res){
    let criterias = new Object();
    if (req.body.firstname){
        criterias.firstname = req.body.firstname
    }
    if (req.body.surname){
        criterias.surname = req.body.surname
    }
    if (req.body.age){
        criterias.age = req.body.age
    }
    if (req.body.education){
        criterias.education = req.body.education
    }
    Player.findAll({ attributes: ['player_id','firstname','surname','age','education'], where: criterias} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.View = async function (req, res){
    let criterias = new Object();
    if (req.body.firstname){
        criterias.firstname = req.body.firstname
    }
    if (req.body.surname){
        criterias.surname = req.body.surname
    }
    if (req.body.age){
        criterias.age = req.body.age
    }
    if (req.body.education){
        criterias.education = req.body.education
    }
    Player.findOne({ attributes: ['firstname','surname','age','education'], where: criterias} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.create = async function (req, res){
    // create non persistant object
    let player = Player.build({ firstname: req.body.firstname, 
                                surname: req.body.surname, 
                                age: req.body.age,
                                education: req.body.education})
    // save object in DB
    await player.save()
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.delete = function (req, res){
    Player.destroy({where: {firstname: req.body.firstname, surname: req.body.surname}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.update = function (req, res){
    Player.update({ firstname: req.body.firstname, 
                    surname: req.body.surname, 
                    age: req.body.age,
                    education: req.body.education},{where: {firstname : req.body.firstname, surname : req.body.surname}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}
exports.setTeam = function (req, res){
    if(!req.body.test_id){
        req.body.test_id = null
    }
    Player.update({ test_id: req.body.test_id},{where: {player_id: player_id}})
    .then(data => {
    res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
        })
}