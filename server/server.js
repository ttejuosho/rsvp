require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./rsvpDb.js');
const rsvpRoutes = require('./rsvpRoutes');
const mailer = require("./mailer");

mongoose.Promise = global.Promise;
mongoose.connect(config.rsvpDb, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/rsvp', rsvpRoutes);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});