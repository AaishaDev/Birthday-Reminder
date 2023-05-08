const express = require("express");
const { handleAddReminder, getBdays, deleteBday } = require("../controllers/reminder");

const router = express.Router()

router.post('/addReminder',handleAddReminder);
router.get('/getBdays',getBdays);
router.delete('/deleteBday/:id',deleteBday);

module.exports =router