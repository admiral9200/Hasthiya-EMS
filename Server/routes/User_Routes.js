const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// CRUD Service
const userController = require('../controllers/User_Controller')

// Update
router.put("/:id", async (req, res) => userController.update(req, res));

// Delete
router.put("/delete/:id",CheckAuth, async (req, res) =>userController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => userController.getById(req, res));

// Get all
router.get("/", async (req, res) => userController.getAll(req, res));

// Get all for admin
router.get("/admin/admin", async (req, res) => userController.getAllForAdmin(req, res));

// Get all by designation
router.get("/designation/:designation", async (req, res) => userController.getAllByDesignation(req, res));

// Get all by technology
router.get("/technology/:technology", async (req, res) => userController.getAllByTechnology(req, res));

// search user by name
router.get('/searchTerm/:searchTerm', userController.searchAllByName);

module.exports = router;