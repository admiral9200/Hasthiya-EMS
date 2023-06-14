const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// Salary controller
const salaryController = require('../controllers/Salary_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>salaryController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => salaryController.update(req, res));

// Delete
router.delete("/:id",CheckAuth, async (req, res) =>salaryController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => salaryController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => salaryController.getAll(req, res));

// Get by user
router.get("/user/:id",CheckAuth, async (req, res) => salaryController.getByUserId(req, res));

// Get by date
router.get("/date/:date",CheckAuth, async (req, res) => salaryController.getBydate(req, res));

module.exports = router;