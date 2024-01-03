const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post('/login',UserController.login)
router.post('/signup',UserController.signup)

module.exports=router;