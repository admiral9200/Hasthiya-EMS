const mongoose = require("mongoose");

//Imports
const designation = require('../models/Designation')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create=( async (req, res) => {
  new designation(req.body).save((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res,"designation created successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  designation.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  })
  .populate('addedBy', 'name email imageurl')
  .populate('updatedBy', 'name email imageurl')
});

// Update
exports.update=(async (req, res) => {
  designation.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "designation updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  designation.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Delete
exports.delete=(async(req, res) => {
  designation.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "designation removed successfully");
  });
});