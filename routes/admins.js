var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"handling GET requests for admin..."
    })
})

module.exports = router;