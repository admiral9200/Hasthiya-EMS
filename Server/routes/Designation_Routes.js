const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Designation controller
const designationController = require('../controllers/Designation_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>designationController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => designationController.update(req, res));

// Delete
router.delete("/:id",CheckAuth, async (req, res) =>designationController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => designationController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => designationController.getAll(req, res));

module.exports = router;