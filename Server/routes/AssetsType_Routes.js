const app = require('express');
const router = app.Router();

// Auth middleware
const CheckAuth = require('../middleware/AuthMiddleware')

// assetsTypes controller
const assetsTypesController = require('../controllers/AssetsTypes_Controller');

// Create
router.post("/",CheckAuth, async (req, res) =>assetsTypesController.create(req, res));

// Update
router.put("/:id",CheckAuth, async (req, res) => assetsTypesController.update(req, res));

// Delete
router.delete("/:id",CheckAuth, async (req, res) =>assetsTypesController.delete(req, res));

// Get by id
router.get("/:id",CheckAuth, async (req, res) => assetsTypesController.getById(req, res));

// Get all
router.get("/",CheckAuth, async (req, res) => assetsTypesController.getAll(req, res));

module.exports = router;