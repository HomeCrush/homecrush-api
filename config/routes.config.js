const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertiesController = require("../controllers/properties.controller");
const miscControllers = require("../controllers/misc.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", miscControllers.root);

// Users

router.post("/register", usersController.create);
router.post("/login", usersController.authenticate);
router.get("/users/me", authMiddleware.isAuthenticated, usersController.get);
/*router.get("/activate/:token");PLUS+*/
router.get("/wishlist");//

// Property

router.post("/properties/create", authMiddleware.isAuthenticated, propertiesController.create );
router.get("/properties", authMiddleware.isAuthenticated, propertiesController.list);
router.post("/properties/:id/edit", authMiddleware.isAuthenticated, propertiesController.update);
router.delete("/properties/:id/delete", authMiddleware.isAuthenticated, propertiesController.deleteProperty);

// Match
router.get("/properties/:propertyId/like");
router.get("/properties/match");
router.get("/properties/crush");

module.exports = router;
