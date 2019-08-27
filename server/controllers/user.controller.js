const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

class UserController {
    constructor(router) {
        router.route("/user/register")
            .post(this.registerUser)
    }

    async registerUser(req, res, next) {
        console.log(req.body);
    }
}

module.exports = UserController;
