const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,

    },
    password :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        default : "customer"
    }

}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)