//Imports
const assetsType = require('../models/AssetsType')
const ResponseService = require("../utils/RresponseService"); // Response service

// Create
exports.create=( async (req, res) => {
  new assetsType(req.body).save((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res,"assetsType created successfully");
  });
});

//get all
exports.getAll=(async(req, res) => {
  assetsType.find((err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  })
  .populate('addedBy', 'name email imageurl')
  .populate('updatedBy', 'name email imageurl')
});

// Update
exports.update=(async (req, res) => {
  assetsType.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "assetsType updated successfully");
  });
});

// Get by id
exports.getById=(async (req, res) => {
  assetsType.findById(req.params.id, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res);
  });
});

// Delete
exports.delete=(async(req, res) => {
  assetsType.findByIdAndRemove(req.params.id, (err, doc) => {
    ResponseService.generalResponse(err, res, "assetsType removed successfully");
  });
});