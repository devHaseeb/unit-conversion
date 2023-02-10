const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const conversionRoutes = require('./routes/conversionRoutes');

const app = express();

// Connect to the database

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// Use body-parser to parse incoming request bodies
app.use(bodyParser.json());

// Use the conversion routes
app.use('/api', conversionRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
