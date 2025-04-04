const express = require("express");
const {
  requestContact,
  getContacts,
  IsRequestAccept,
} = require("../controllers/contactController");
const { protect } = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/request",authMiddleware, requestContact);
router.get("/request-isAllow/:id/:checked",authMiddleware, IsRequestAccept);
router.get("/get-contacts",authMiddleware, getContacts);

module.exports = router;

