//import TestEvent model
require("../Models/TestEventModel")


exports.listAll = async function (res){
    TestEvent.findAll({ attributes: ['team', 'dateTime','completionTime','success']} )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
}