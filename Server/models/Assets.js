const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,        
        required: [true, "name cannot be empty"],
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssetsType',      
        required: [true, "type cannot be empty"],
    },
    serialNumber: {
        type: String,        
        required: [true, "type cannot be empty"],
    },
    assignPerson:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignDate:{
        type:Date,
    }
},{ timestamps: true });


module.exports = mongoose.model('Assets', Schema);