const express = require("express");
const { registerUser, loginUser,getDonors, logoutUser, getDonorsforAdmin } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware , logoutUser);
router.get("/get-donors/:id",authMiddleware, getDonors);
router.get("/get-donors-for-admin/:id", getDonorsforAdmin);

module.exports = router;
