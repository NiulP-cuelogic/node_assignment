var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Boom = require('boom');
var jwt =require("jsonwebtoken");
var bodyParser = require("body-parser");
var app = express();
var path = require('path');
// var app = require('../app');
app.use(bodyParser.urlencoded({extended:false}));

router.get("/",(req,res,next)=>{
    // res.status(200).json({
    //     message:"handling GET requests for users...."
    // })
    res.sendFile(path.resolve('./views'+'/index.html'));

});

router.post("/signup",(req,res)=>{
    //  console.log(req.body.a);
   console.log(req.body.password);
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            res.status(200).json({
                message:"User email exists...."
            })
        }
    })

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            console.log(req.body.email);
            res.send(Boom.badRequest("password did not hash"));
        }else{
            var user = new User({
                _id:new mongoose.Types.ObjectId(),
                email:req.body.email,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                password:hash
            });
            user
            .save()
            .then(result=>{
                res.status(200).json({message:"User created..."});
            })
            .catch(err=>{
                res.send(Boom.badRequest("User not created.."));
            })
        }
    })
   
});

router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            res.status(200).json({message:"User does not exist..."});
        }

        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                res.send(Boom.badRequest("Auth falied..."));
            }
            if(result){
                // res.status(200).json({message:"Auth successful"});
                if(req.body.password === "admin"){
                    console.log("welcome admin..");
                    res.render("admin",{email:req.body.email});
                }
                else{
                    // res.status(200).json({message:"Welcome user.."}); 
                    console.log("welcome user..");
                    res.render("user.ejs",{email:req.body.email});  
                }
            };
            res.status(401).json({message:"Auth failed"})
    })
        
    })
    .catch(err=>{
        res.send(Boom.badRequest("Auth failed.."))
    })
});

router.get("/login/edit",(req,res,next)=>{
    // res.status(200).json({message:"Edit"});
    User.find({_id:req.params.user._id})
    res.render("edit.ejs",{email:})
})



module.exports = router;