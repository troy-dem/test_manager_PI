//import sequelize
const Sequelize = require('sequelize')
//import database configuration
const sequelize = require('../db.js')
// define Player structure in database
Player = sequelize.define('Player', {
player_id: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
firstname: { type: Sequelize.STRING, allowNull: false },
surname: { type: Sequelize.STRING, allowNull: false },
age: { type: Sequelize.INTEGER, allowNull: false },
education: { type: Sequelize.STRING, allowNull: false }
})
//make an association 1:N between TestEvent and Player
module.exports = Player