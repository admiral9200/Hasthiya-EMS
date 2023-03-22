const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    basic: {
        type: Number,        
        required: [true, "Basic salary cannot be empty"],
    },
    usDollerValue: {
        type: Number,
        required: [true, "US Doller value cannot be empty"],
    },
    salaryDate:{
        type: Date,
        required: [true, "Leave From cannot be empty"],
    },
},{ timestamps: true });


module.exports = mongoose.model('salary', Schema);