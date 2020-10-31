const mongoose = require('mongoose');

const mongoConnection =  mongoose.createConnection('mongodb://localhost:27017/myDb',{useNewUrlParser:true, useUnifiedTopology: true});
mongoConnection.on('connected', () => {
    console.log(`Mongodb connection established successfully.`);
});
mongoConnection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
});
mongoConnection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports =  mongoConnection;