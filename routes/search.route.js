const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SearchController = require("../controllers/search");
const router = express.Router();

// /api/search

// GET ROUTES
router.get('',authMiddleware,SearchController.searchNote);

module.exports=router;