const express = require("express");
const handleLogout  = require("../controllers/logout");
const router = express.Router();

router.get("/", handleLogout)

module.exports = router