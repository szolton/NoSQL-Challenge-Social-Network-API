// Import the Express Router
const router = require('express').Router();

// Import the API routes from the 'api' directory
const apiRoutes = require('./api');

// Use the API routes when the path starts with '/api'
router.use('/api', apiRoutes);

// Define a catch-all route for handling 404 errors
router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

// Export the router to be used in other parts of the application
module.exports = router;
