const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/api/search/q=',authMiddleware,NoteController.searchNote);

module.exports=router;