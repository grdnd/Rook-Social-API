// Load Environment Variables
require('dotenv').config();

// Node Modules
// Require Express
const express = require('express');

// Require Database Connection
const db = require('./config/connection');

// Create Port
const PORT = process.env.PORT;

// Create app variable to configure server
const app = express();

// recognize the incoming request object as strings or arrays
app.use(express.urlencoded({ extended: true }));
// allows app to receive json data
app.use(express.json());
// allows app to use routes
app.use(routes);

db.on('error', (error) => console.error(error));
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});