const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// assets controller
const assetsController = require('../controllers/Assets_Controller');

// Create
router.post("/", async (req, res) =>assetsController.create(req, res));

// Update
router.put("/:id", async (req, res) => assetsController.update(req, res));

// Delete
router.delete("/:id", async (req, res) =>assetsController.delete(req, res));

// Get by id
router.get("/:id", async (req, res) => assetsController.getById(req, res));

// Get by user id
router.get("/user/:id", async (req, res) => assetsController.getByUserId(req, res));

// Get all
router.get("/", async (req, res) => assetsController.getAll(req, res));

// Get all by type
router.get("/type/:type", async (req, res) => assetsController.getAllByType(req, res));
module.exports = router;