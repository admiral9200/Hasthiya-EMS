const mongoose = require("mongoose");

//Imports
const users = require('../models/User')
const ResponseService = require("../utils/RresponseService"); // Response service

// Update
exports.update=(async (req, res) => {
  users.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "user updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  users.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  })
  .populate('designation', 'name')
  .populate('technologies', 'name')
});

// Soft Delete
exports.delete=(async(req, res) => {
  users.findByIdAndUpdate(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "user deleted successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  // Pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


  const totalPages = Math.ceil(await users.countDocuments({role: { $ne: 'pending' }}) / limit);

   users.find({role: { $ne: 'pending' }},(err, doc) => {
    const newPayload = {
      docs: doc,
      totalPages: totalPages
    }
    ResponseService.generalPayloadResponse(err, newPayload, res);
  })
    .sort({ name: -1 })
    .populate('designation', 'name')
    .populate('technologies', 'name')
    .skip(page * limit)
    .limit(limit);
});

//get all
exports.getAllForAdmin=(async(req, res) => {
   users.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  })
    .sort({ createdAt: -1 })
    .populate('designation', 'name')
    .populate('technologies', 'name')
});

//get all by designation
exports.getAllByDesignation = async function (req, res) {
  const designation = req.params.designation;

  // Pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


  const totalPages = Math.ceil(await users.countDocuments({ designation: designation }) / limit);

   users.find({ designation: designation }, (err, doc) => {
    const newPayload = {
      docs: doc,
      totalPages: totalPages
    }
    ResponseService.generalPayloadResponse(err, newPayload, res);
  })
    .sort({ name: -1 })
    .populate('designation', 'name')
    .populate('technologies', 'name')
    .skip(page * limit)
    .limit(limit);
}

//get all by technology
exports.getAllByTechnology = async function (req, res) {
  const technology = req.params.technology;

  // Pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) - 1 : 0;


  const totalPages = Math.ceil(await users.countDocuments({ technologies: technology}) / limit);

   users.find({technologies: technology}, (err, doc) => {
    const newPayload = {
      docs: doc,
      totalPages: totalPages
    }
    ResponseService.generalPayloadResponse(err, newPayload, res);
  })
    .sort({ name: -1 })
    .populate('designation', 'name')
    .populate('technologies', 'name')
    .skip(page * limit)
    .limit(limit);
}

// search user by name
exports.searchAllByName = async function (req, res) {  
  const searchTerm = req.params.searchTerm;

  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  
  const totalPages = Math.ceil(await users.countDocuments({ name: { $regex: searchTerm, $options: 'i' } }) / limit);

  users.find({ name: { $regex: searchTerm, $options: 'i' } }, (err, doc) => {
    const newPayload = {
      docs: doc,
      totalPages: totalPages
    }
    ResponseService.generalPayloadResponse(err, newPayload, res);
  })
    .sort({ name: -1 })
    .populate('designation', 'name')
    .populate('technologies', 'name')
    .skip(page * limit)
    .limit(limit);
}

