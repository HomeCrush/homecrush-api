const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertiesController = require("../controllers/properties.controller");
const miscControllers = require("../controllers/misc.controller");

router.get("/", miscControllers.root);

// Users

router.get("/register");
router.post("/register");
router.get("/login");
router.post("/login");
router.get("/activate/:token");
router.post("/logout");
router.get("/profile");
router.get("/wishlist");
router.get("/users");

// Property
router.post("/properties/create", propertiesController.create );
router.get("/properties/:id");
router.get("/properties/:id/edit");
router.post("/properties/:id/edit", propertiesController.update);
router.delete("/properties/:id/delete", propertiesController.deleteProperty);

// Likes
router.get("/property/:propertyId/like");
router.get("/property/match");
router.get("/property/crush");

module.exports = router;
