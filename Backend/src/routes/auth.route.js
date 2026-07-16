const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const arcjetMiddleware = require("../middleware/arcjet.middleware");

const router = express.Router();


// Public routes
router.post("/", authController.userRegister);
router.post("/login", authController.userLogin);

// Protected routes
router.post("/logout", authMiddleware.protectRoute, authController.userLogout);
router.get("/getUser", authMiddleware.protectRoute, authController.getUser);
router.put("/update-Profile", authMiddleware.protectRoute, authController.profilePic);

module.exports = router;