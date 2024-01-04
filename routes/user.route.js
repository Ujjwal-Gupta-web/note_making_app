const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();
const loggerMiddleware = require("../middlewares/loggerMiddleware");

// /api/auth

// POST ROUTES
router.post('/login',loggerMiddleware,UserController.login)
router.post('/signup',loggerMiddleware,UserController.signup)

module.exports=router;