//import response functions
require("express/lib/response");

const { TestEvent, Player } = require('../models/index');


exports.listAll = async function (req, res){
    //create a dictionnary of search filters 
    let criterias = new Object();
    //set the value of each search filter if present in the request
    if (req.body.dateTime){
        //research by date not fully implemented yet
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
    //filtered search
    TestEvent.findAll({ attributes: ['test_id','dateTime','completionTime','successRate'],where: criterias} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}

exports.create = async function (req, res){
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
    // delete object from DB
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
    //convert time
    offset = newDate.getTimezoneOffset()
    newDate.setUTCMinutes(newDate.getUTCMinutes()-offset).toString()
    console.log(newDate)
    // update object in DB
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

exports.getTeam = function (req, res){
    TestEvent.findAll({ attributes: ['test_id','dateTime','completionTime','successRate'], include: {model: Player, as: "players", attributes: ['player_id','firstname','surname','age','education']}, where: {test_id: req.body.test_id} }).then(data => {
        res.json(data);
        })
        .catch(err => {
        res.status(500).json({ message: err.message })
        })
}

exports.getLevel = function (req, res){
    TestEvent.findAll({ attributes: ['test_id','dateTime','completionTime','successRate']} )
    .then(data => {
        var meanTime = 0;
        var meanSuccess = 0;
        for (let i = 0; i < data.length; i++){
            meanTime += +(data[i].completionTime.split(":")[1])
            meanSuccess += data[i].successRate
        }
        meanTime = meanTime/data.length
        meanSuccess = meanSuccess/data.length
        var level = Math.floor(((Math.floor((meanTime/4))-1)+(Math.floor(5-(+(meanSuccess/20)))))/2)
        console.log((Math.floor((meanTime/4))-1)+" "+(Math.floor(5-(+(meanSuccess/20))))+" "+" level: "+(+level))  
        res.json(level);
    })
}