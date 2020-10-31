const express = require('express');

const routes = require('./routes');
const mongoose = require('mongoose');
const { ValidationError, NotFoundError } = require('./lib/errors');

const app = express();

/*  mongoose.connect('mongodb://localhost:27017/myDb',{useNewUrlParser:true, useUnifiedTopology: true, promiseLibrary: global.Promise});

mongoose.connection.on("connected",(err,msg)=>{
  console.log("mongoose is connected");
})

mongoose.connection.on("error",(err)=>{
  console.log("err",err);
})  */
//mongoose.connection.close();

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

module.exports = app;