// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
require('dotenv').config();

const app = express();

// Import custom routes
const routes = require('./src/routes');

// Get the port number and MongoDB URL from environment variables
const port = parseInt(process.env.PORT, 10);
const url = process.env.URL;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));

// Use custom routes for API endpoints
app.use('/api', routes);

// Serve the HTML file for the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
