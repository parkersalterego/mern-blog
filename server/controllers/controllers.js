const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");

const userController = new UserController(router);

module.exports = router;