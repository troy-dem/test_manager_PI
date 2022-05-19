const Sequelize = require('sequelize')
const sequelize = new Sequelize(
        'testmanagerpi', 
        'root',
        'root',{
        dialect: 'mysql',
        host: 'localhost'
        }
);
module.exports = sequelize