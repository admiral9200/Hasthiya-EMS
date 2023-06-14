const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Leaves controller
const leavesController = require('../controllers/Leaves_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>leavesController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => leavesController.update(req, res));

// Delete
router.delete("/:id",CheckAuth, async (req, res) =>leavesController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => leavesController.getById(req, res));

// Get by user id
router.get("/user/:id",CheckAuth, async (req, res) => leavesController.getByUserId(req, res));

// Get by ReportPerson id
router.get("/reportPerson/:id",CheckAuth, async (req, res) => leavesController.getByReportPersonId(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => leavesController.getAll(req, res));

module.exports = router;