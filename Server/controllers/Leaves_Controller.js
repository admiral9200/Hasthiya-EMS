//Imports
const leaves = require('../models/Leaves')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create = (async (req, res) => {
    new leaves(req.body).save((err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, "leaves created successfully");
    });
});

// Update
exports.update = (async (req, res) => {
    leaves.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, "leaves updated successfully");
    });
});

// Get by id
exports.getById = (async (req, res) => {
    leaves.findById(req.params.id, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    })
    .populate('employee', 'name email imageurl')
    .populate('reportPerson', 'name email imageurl')
});

// Delete
exports.delete = (async (req, res) => {
    leaves.findByIdAndRemove(req.params.id, (err, doc) => {
        ResponseService.generalResponse(err, res, "leaves removed successfully");
    });
});

//get all 
exports.getAll = async function (req, res) {

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await leaves.countDocuments() / limit);

    leaves.find( (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('employee', 'name email imageurl')
        .populate('reportPerson', 'name email imageurl')
        .skip(page * limit)
        .limit(limit);
}

//get all by ReportPersonId
exports.getByReportPersonId = async function (req, res) {
    const id = req.params.id;

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await leaves.countDocuments({ reportPerson: id }) / limit);

    leaves.find({ reportPerson: id}, (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('employee', 'name email imageurl')
        .populate('reportPerson', 'name email imageurl')
        .skip(page * limit)
        .limit(limit);
}

//get all by employee
exports.getByUserId = async function (req, res) {
    const id = req.params.id;

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await leaves.countDocuments({ employee: id }) / limit);

    leaves.find({ employee: id }, (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('employee', 'name email imageurl')
        .populate('reportPerson', 'name email imageurl')
        .skip(page * limit)
        .limit(limit);
}
