const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const propertiesController = require("../controllers/properties.controller");
const miscControllers = require("../controllers/misc.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("./storage.config");

router.get("/", miscControllers.root);

// Users

router.post("/register");
router.post("/login");
router.get("/users/me", authMiddleware.isAuthenticated, usersController.get);
/*router.get("/activate/:token");PLUS+*/
router.put("/user/editprofile", authMiddleware.isAuthenticated, upload.single("image"), usersController.editProfile);

// Property

router.post("/properties/create", authMiddleware.isAuthenticated, upload.single("images"), propertiesController.create );
router.get("/properties/myproperties", authMiddleware.isAuthenticated, propertiesController.showMyProperties);
router.get("/properties/matchlist", authMiddleware.isAuthenticated, propertiesController.matchList);
router.get("/properties", authMiddleware.isAuthenticated, propertiesController.list);
router.get("/properties/:id", authMiddleware.isAuthenticated, propertiesController.get);
router.put("/properties/:id/edit", authMiddleware.isAuthenticated, propertiesController.update);
router.delete("/properties/:id/delete", authMiddleware.isAuthenticated, propertiesController.deleteProperty);


// Match
router.post("/properties/:propertyId/like", authMiddleware.isAuthenticated, miscControllers.like);
router.post("/properties/:propertyId/unmatch", authMiddleware.isAuthenticated, miscControllers.unmatch);

router.post("/properties/:matchId/response", authMiddleware.isAuthenticated, miscControllers.matchResponse);



router.post("/properties/:propertyId/reject", authMiddleware.isAuthenticated, miscControllers.reject);


module.exports = router;
