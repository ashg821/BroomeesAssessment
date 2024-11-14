const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

require('dotenv').config();


const routes = require('./src/routes');
const port = parseInt(process.env.PORT, 10);
const url = process.env.URL;


app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory 
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(url).then(() => console.log('Connected to mongoDB')).catch(() => console.log('Failed to connect to mongodb'));

app.use('/api', routes);

// Serve the HTML file
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });


app.listen(port, () => {
    console.log('Server listening on port ' + port);
})