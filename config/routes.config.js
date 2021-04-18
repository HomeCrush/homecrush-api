const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertyController = require("../controllers/property.controller");
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
router.get("/property/create");
router.post("/property/create");
router.get("/products/:id");
router.get("/property/:id/edit");
router.post("/property/:id/edit");
router.get("/property/:id/delete");

// Likes
router.get("/property/:propertyId/like");
router.get("/property/match");
router.get("/property/crush");

module.exports = router;
