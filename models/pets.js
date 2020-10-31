const mongoose = require('mongoose');
const dbConn = require('./connection');

const petsSchema = new mongoose.Schema ({
  name: {type:mongoose.Schema.Types.String,required:true},
  age: {type:mongoose.Schema.Types.Number,required:true},
  colour:{type:mongoose.Schema.Types.String,required:true},
  
});

module.exports = dbConn.model('Pets', petsSchema);