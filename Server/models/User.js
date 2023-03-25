const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,        
        required: [true, "name cannot be empty"],
    },
    imageurl: {
        type: String,
        default:'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png'
    },
    email: {
        type: String,        
        required: [true, "email cannot be empty"],
        unique: [true, "user already exists"],
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'pending'
    },
    reportPerson:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    salary: {
        type: Number,
    },
    designation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation'
    },
    technologies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology'
    }],
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    nic: {
        type: String,
    },
},{ timestamps: true });


module.exports = mongoose.model('User', Schema);