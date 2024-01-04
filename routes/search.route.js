const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SearchController = require("../controllers/search");
const router = express.Router();
const loggerMiddleware = require("../middlewares/loggerMiddleware");

// /api/search

// GET ROUTES
router.get('',loggerMiddleware,authMiddleware,SearchController.searchNote);

module.exports=router;