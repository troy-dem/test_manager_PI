const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.TestEvent = require('../models/TestEventModel');
db.Player = require('../models/PlayerModel');

db.TestEvent.hasMany( db.Player, { foreignKey: "test_id", as: "players" });
db.Player.belongsTo( db.TestEvent, { foreignKey: "test_id" });

module.exports = db