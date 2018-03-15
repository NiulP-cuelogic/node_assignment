var express = require('express');
var app = express();
var ejs = require('ejs');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var morgan = require('morgan');
var Boom  = require('boom');
var db = 'mongodb://localhost/user_db';

app.set("view engine",'ejs');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var userRoutes = require('./routes/users');
var adminRoutes = require('./routes/admins');

mongoose.connect(db);
mongoose.Promise = global.Promise;


app.use("/user",userRoutes);
app.use("/user/login/admin",adminRoutes);

app.use((req,res,next)=>{
    res.send(Boom.badRequest("This route is not defined..."));
})


// app.use("/user",adminRoutes);

module.exports = app;   