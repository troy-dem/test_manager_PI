// Import express
let express = require('express');
// Import cors
let cors = require('cors')
//import router
let routes = require('./router');
//import sequelize
const Sequelize = require('sequelize')
const db = require('./db.js')

// Initialize the app
let app = express();
// Send message for default URL
app.get('/', (request, response) => response.send('Hello World !'));
//configure cors
app.use(cors())
// configure router
app.use('/', routes)
//configure sequelize
db.sync()

// Setup server port
let port = 3000;
// Launch app to listen to specified port
app.listen(port, function () {
console.log("Server running on port " + port);
});
