var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var morgan = require('morgan');
var Boom  = require('boom');
var db = 'mongodb://localhost/user_db';

var userRoutes = require('./routes/users');
var adminRoutes = require('./routes/admins');

mongoose.connect(db);
mongoose.Promise = global.Promise;


app.use("/user",userRoutes);
app.use("/user/admin",adminRoutes);

app.use((req,res,next)=>{
    res.send(Boom.badRequest("This route is not defined..."));
})


// app.use("/user",adminRoutes);

module.exports = app;   