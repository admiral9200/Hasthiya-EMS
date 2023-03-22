const mongoose = require("mongoose");

//Imports
const technology = require('../models/Technology')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create=( async (req, res) => {
  new technology(req.body).save((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res,"technology created successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  technology.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  })
  .populate('addedBy', 'name email imageurl')
  .populate('updatedBy', 'name email imageurl')
});

// Update
exports.update=(async (req, res) => {
  technology.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "technology updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  technology.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Delete
exports.delete=(async(req, res) => {
  technology.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "technology removed successfully");
  });
});