const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: Number
    },
    picture: { 
        data: Buffer, 
        contentType: String 
    },
    fullname:{
        type: String
    },
    location:{
        type: String
    },
    about:{
        type: String
    }
}, {collection: 'user'})

module.exports = mongoose.model("users", userSchema)