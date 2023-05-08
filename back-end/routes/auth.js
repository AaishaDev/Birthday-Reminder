const express = require("express");
const { handleAuth } = require("../controllers/authController");
const router = express.Router();

router.post("/", handleAuth)

module.exports = router