// Load Environment Variables
require('dotenv').config();

// Node Modules
// require express
const express = require('express');

// require database connection
const db = require('./config/connection');

// create port
const PORT = process.env.PORT;

// create app variable to configure server
const app = express();

// recognize the incoming request object as strings or arrays
app.use(express.urlencoded({ extended: true }));
// allows app to receive json data
app.use(express.json());
// allows app to use routes
app.use(routes);

// verify server is on
db.on('error', (error) => console.error(error));
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});