const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const AuthController = require("./auth.controller");


const userController = new UserController(router);
const authController = new AuthController(router);

module.exports = router;