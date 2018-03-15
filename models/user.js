var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true,unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String, required:true}
});

module.exports = mongoose.model("User",userSchema);