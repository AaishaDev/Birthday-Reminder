const express = require("express");
const  handleRefreshToken  = require("../controllers/refreshController");
const router = express.Router();

router.get("/", handleRefreshToken)

module.exports = router