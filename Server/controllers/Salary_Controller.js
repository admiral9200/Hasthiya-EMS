//Imports
const salary = require('../models/Salary')
const user = require('../models/User')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create = (async (req, res) => {
    const usDollerValue = req.body.usDollerValue;
    const salaryDate = req.body.salaryDate;

    const users = await user.find();
    users.forEach(async (user) => {
        const basic = user.salary;
        const employee = user._id;
        const designation = user.designation;
        const newSalary = {employee, basic, usDollerValue, salaryDate,designation};
        new salary(newSalary).save((err) => {
            if(err){
                ResponseService.generalResponse(err, res, "salary list not created successfully");
            }
        });
    });
    ResponseService.generalResponse(null, res, "salary list created successfully");
});

// Update
exports.update = (async (req, res) => {
    salary.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, "salary updated successfully");
    });
});

// Get by id
exports.getById = (async (req, res) => {
    salary.findById(req.params.id, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    })
    .populate('employee', 'name email imageurl')
    .populate('designation', 'name')
});

// Delete
exports.delete = (async (req, res) => {
    salary.findByIdAndRemove(req.params.id, (err, doc) => {
        ResponseService.generalResponse(err, res, "salary removed successfully");
    });
});

//get all 
exports.getAll = async function (req, res) {

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;

    const totalPages = Math.ceil(await salary.countDocuments() / limit);

    salary.find( (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ salaryDate: -1 })
        .populate('employee', 'name email imageurl')
        .populate('designation', 'name')
        .skip(page * limit)
        .limit(limit);
        
}

//get all by date
exports.getBydate = async function (req, res) {
    const date = req.params.date;

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;

    const totalPages = Math.ceil(await salary.countDocuments({  salaryDate: date }) / limit);

    salary.find({ salaryDate: date}, (err, doc) => {
        const newPayload = {
            docs: doc,            
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ salaryDate: -1 })
        .populate('employee', 'name email imageurl')
        .populate('designation', 'name')
        .skip(page * limit)
        .limit(limit);
}

//get all by employee
exports.getByUserId = async function (req, res) {
    const id = req.params.id;

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await salary.countDocuments({ employee: id }) / limit);

    salary.find({ employee: id }, (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ salaryDate: -1 })
        .populate('employee', 'name email imageurl')
        .populate('designation', 'name')
        .skip(page * limit)
        .limit(limit);
}
