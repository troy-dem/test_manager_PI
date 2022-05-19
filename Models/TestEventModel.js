//import sequelize
const Sequelize = require('sequelize')
//import database configuration
const sequelize = require('../db.js')
// define TestEvent structure in database
Test = sequelize.define('TestEvent', {
test_id: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
dateTime: { type: Sequelize.DATE, allowNull: false },
completionTime: { type: Sequelize.TIME, allowNull: false },
successRate: { type: Sequelize.INTEGER, allowNull: false }
})
module.exports = Test