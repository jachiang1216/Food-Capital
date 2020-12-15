const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let recipesSchema = new Schema({
    userid:{
        type: String
    },
    recipename:{
        type: String
    },
    recipedescription:{
        type: String
    },
    recipepicture: { 
        data: Buffer, 
        contentType: String 
    },
    ingredients: {
        type: Array
    },
    steps: {
        type: Array
    }
}, {collection: 'recipes'})

module.exports = mongoose.model("recipefood", recipesSchema)