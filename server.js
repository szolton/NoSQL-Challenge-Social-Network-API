// Import the express library to create a web server
const express = require('express');
// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Initialize the express application
const app = express();
// Define the port to run the server on, using either the environment variable or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Import and use routes from the 'routes' directory
app.use(require('./routes'));

// Connect to the MongoDB database, using either the environment variable or a local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Enable debug mode to log MongoDB queries being executed
mongoose.set('debug', true);

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
