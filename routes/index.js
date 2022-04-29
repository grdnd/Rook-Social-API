// Node Modules
// require router portion of express
const router = require('express').Router();

// require access to api routes
const apiRoutes = require('./api');

// allow router to use api extension
router.use('/api', apiRoutes);

// If no request, allow router to return error response
router.use((req,res) => {
    return res.send('Incorrect route!');
});