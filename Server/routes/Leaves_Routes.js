const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Leaves controller
const leavesController = require('../controllers/Leaves_Controller');

// Create
router.post("/", async (req, res) =>leavesController.create(req, res));

// Update
router.put("/:id", async (req, res) => leavesController.update(req, res));

// Delete
router.delete("/:id", async (req, res) =>leavesController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => leavesController.getById(req, res));

// Get by user id
router.get("/user/:id", async (req, res) => leavesController.getByUserId(req, res));

// Get by ReportPerson id
router.get("/reportPerson/:id", async (req, res) => leavesController.getByReportPersonId(req, res));

// Get all
router.get("/", async (req, res) => leavesController.getAll(req, res));

module.exports = router;