const mongoose = require('mongoose');
const dbConn = require('./connection');

const UserSchema = new mongoose.Schema ({
  firstName: mongoose.Schema.Types.String,
  lastName: mongoose.Schema.Types.String,
  age: mongoose.Schema.Types.Number,
  profession: mongoose.Schema.Types.String,
});

module.exports = dbConn.model('Users', UserSchema);