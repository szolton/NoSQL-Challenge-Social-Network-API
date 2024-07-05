// Import the Express Router
const router = require('express').Router();

// Import user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Use userRoutes for paths starting with /users
router.use('/users', userRoutes);

// Use thoughtRoutes for paths starting with /thoughts
router.use('/thoughts', thoughtRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
