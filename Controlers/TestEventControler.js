const db = require('../models/index');
const Group = db.TestEvent;
const User = db.Player;

//import response functions
require("express/lib/response");

const { Op } = require("sequelize");


exports.listAll = async function (req, res){
    let criterias = new Object();
    if (req.body.dateTime){
        var newDate = new Date(req.body.dateTime)
        offset = newDate.getTimezoneOffset()
        newDate.setUTCMinutes(newDate.getUTCMinutes()-offset).toString()
        criterias.dateTime = newDate
        console.log(criterias.dateTime)
    }
    if (req.body.completionTime){
        criterias.completionTime = req.body.completionTime
    }
    if (req.body.successRate){
        criterias.successRate = req.body.successRate
    }
    TestEvent.findAll({ attributes: ['test_id','dateTime','completionTime','successRate'],where: criterias} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.View = async function (req, res){
    let criterias = new Object();
    if (req.body.dateTime){
        criterias.dateTime = req.body.dateTime
    }
    if (req.body.completionTime){
        criterias.completionTime = req.body.completionTime
    }
    if (req.body.successRate){
        criterias.successRate = req.body.successRate
    }
    TestEvent.findOne({ attributes: ['dateTime','completionTime','successRate'],where: criterias} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.create = async function (req, res){
    //format dateTime
    if (!req.body.dateTime){
        req.body.dateTime = new Date().getTime()
    }

    // create non persistant object
    let test = TestEvent.build({ dateTime: req.body.dateTime, 
                                 completionTime: req.body.completionTime, 
                                 successRate: req.body.successRate })
    // save object in DB
    await test.save()
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.delete = function (req, res){ 
    var newDate = new Date(req.body.dateTime)
    offset = newDate.getTimezoneOffset()
    newDate.setUTCMinutes(newDate.getUTCMinutes()-offset).toString()
    console.log(newDate)
    TestEvent.destroy({where: {test_id : req.body.test_id}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.update = function (req, res){
    var newDate = new Date(req.body.dateTime)
    offset = newDate.getTimezoneOffset()
    newDate.setUTCMinutes(newDate.getUTCMinutes()-offset).toString()
    console.log(newDate)
    TestEvent.update({   dateTime: newDate, 
                         completionTime: req.body.completionTime, 
                         successRate: req.body.successRate },{where: {test_id : req.body.test_id}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}