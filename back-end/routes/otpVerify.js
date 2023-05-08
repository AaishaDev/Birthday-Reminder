const express = require("express");
const { otpVerify } = require("../controllers/otpVerify");

const router = express.Router();

router.put("/", otpVerify)

module.exports = router