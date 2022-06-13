const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//tables creation
db.TestEvent = require('../models/TestEventModel');
db.Player = require('../models/PlayerModel');

// set relationships between
db.TestEvent.hasMany( db.Player, { foreignKey: "test_id", as: "players" });
db.Player.belongsTo( db.TestEvent, { foreignKey: "test_id" });

module.exports = db