const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertiesController = require("../controllers/properties.controller");
const miscControllers = require("../controllers/misc.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", miscControllers.root);

// Users

router.post("/register", usersController.create);
router.post("/login", authMiddleware.isAuthenticated, usersController.authenticate);
router.get("/users/me", usersController.get);
//router.post("/logout");
/*router.get("/activate/:token");PLUS+
router.get("/wishlist");//

// Property

router.post("/properties/create", propertiesController.create );
router.get("/properties/:id");
router.get("/properties/:id/edit");
router.post("/properties/:id/edit", propertiesController.update);
router.delete("/properties/:id/delete", propertiesController.deleteProperty);

// Match
router.get("/properties/:propertyId/like");
router.get("/properties/match");
router.get("/properties/crush");*/

module.exports = router;
