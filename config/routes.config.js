const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertiesController = require("../controllers/properties.controller");
const miscControllers = require("../controllers/misc.controller");

router.get("/", miscControllers.root);

// Users

router.post("/register", usersController.create);
router.post("/login", usersController.authenticate);
/*router.get("/activate/:token");PLUS+
//router.post("/logout");
router.get("/users/me");
router.get("/wishlist");//

// Property
router.get("/properties/create");
router.post("/properties/create");
router.get("/properties/:id");
router.get("/properties/:id/edit");
router.post("/properties/:id/edit");
router.get("/properties/:id/delete");

// Match
router.get("/properties/:propertyId/like");
router.get("/properties/match");
router.get("/properties/crush");*/

module.exports = router;
