// Import express
let express = require('express');
// Initialize the app
let app = express();
// Send message for default URL
app.get('/', (request, response) => response.send('Hello World !'));
// Setup server port
let port = 3000;
// Launch app to listen to specified port
app.listen(port, function () {
console.log("Server running on port " + port);
});
