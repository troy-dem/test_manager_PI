//import TestEvent model
require("../Models/TestEventModel")
//import response functions
require("express/lib/response");


exports.listAll = async function (req, res){
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
    TestEvent.findAll({ attributes: ['dateTime','completionTime','successRate'],where: criterias} )
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
    TestEvent.destroy({where: {dateTime : req.body.dateTime}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.update = function (req, res){
    TestEvent.update({ dateTime: req.body.dateTime, 
                         completionTime: req.body.completionTime, 
                         successRate: req.body.successRate },{where: {dateTime : req.body.dateTime}})
    .then(data => {
        res.json("Update Successful");
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}