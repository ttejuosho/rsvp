const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let RSVP = new Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Phone: {
    type: Number,
    required: true,
    minlength: 10
  },
  Attending: {
    type: String,
    required: true
  },
  Guests: {
      type: Number
  }
},{
    collection: 'rsvp'
});

module.exports = mongoose.model('RSVP', RSVP);