var express = require("express");

var router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"handling GET requests for users...."
    })
});

router.post("/signup",(req,res,next)=>{

});

router.post("/login",(req,res,next)=>{

});




module.exports = router;