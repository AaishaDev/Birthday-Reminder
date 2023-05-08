const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    verified:{
        type:Boolean
    },
    refreshToken: String,
    otp: Number
})

module.exports = mongoose.model('User', userSchema);