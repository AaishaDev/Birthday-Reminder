const express = require("express");
const { isEmailVerified } = require("../controllers/isEmailVerified");
const router = express.Router();

router.get("/", isEmailVerified)

module.exports = router