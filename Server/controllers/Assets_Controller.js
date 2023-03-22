const mongoose = require("mongoose");

//Imports
const assets = require('../models/Assets')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create = (async (req, res) => {
    new assets(req.body).save((err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, "Assets created successfully");
    });
});

// Update
exports.update = (async (req, res) => {
    assets.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res, "Assets updated successfully");
    });
});

// Get by id
exports.getById = (async (req, res) => {
    assets.findById(req.params.id, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    })
    .populate('assignPerson', 'name email imageurl')
    .populate('type', 'name')
});

// Delete
exports.delete = (async (req, res) => {
    assets.findByIdAndRemove(req.params.id, (err, doc) => {
        ResponseService.generalResponse(err, res, "Assets removed successfully");
    });
});

//get all 
exports.getAll = async function (req, res) {

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await assets.countDocuments() / limit);
    const assetsCount = Math.ceil(await assets.countDocuments() );

    assets.find( (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
            assetsCount: assetsCount
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('assignPerson', 'name email imageurl')
        .populate('type', 'name')
        .skip(page * limit)
        .limit(limit);
}

//get all by type
exports.getAllByType = async function (req, res) {
    const type = req.params.type;

    // Pagination parameters
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


    const totalPages = Math.ceil(await assets.countDocuments({ type: type }) / limit);
    const assetsCount = Math.ceil(await assets.countDocuments({ type: type }) );

    assets.find({ type: type }, (err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
            assetsCount: assetsCount
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('assignPerson', 'name email imageurl')
        .populate('type', 'name')
        .skip(page * limit)
        .limit(limit);
}

//get all by assign person
exports.getByUserId = async function (req, res) {
    const id = req.params.id;
    const assetsCount = Math.ceil(await assets.countDocuments({ assignPerson: id }) );

    assets.find({ assignPerson: id }, (err, doc) => {
        const newPayload = {
            docs: doc,
            assetsCount: assetsCount
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    })
        .sort({ createdAt: -1 })
        .populate('assignPerson', 'name email imageurl')
        .populate('type', 'name')
}
