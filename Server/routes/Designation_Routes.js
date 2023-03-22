const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Designation controller
const designationController = require('../controllers/Designation_Controller');

// Create
router.post("/", async (req, res) =>designationController.create(req, res));

// Update
router.put("/:id", async (req, res) => designationController.update(req, res));

// Delete
router.delete("/:id", async (req, res) =>designationController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => designationController.getById(req, res));

// Get all
router.get("/", async (req, res) => designationController.getAll(req, res));

module.exports = router;