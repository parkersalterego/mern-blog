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
        const {username, email, password} = req.body;

        try {
            // check that user does not already exist
            let user = await User.findOne({email});
            if (user) res.status(400).json({message: `An account with the email ${email} already exists`});
            // set user values
            user = new User({username, email, password});
            // hash password
            const salt = await bcrypt.genSalt(config.get("saltRounds"));
            user.password = await bcrypt.hash(password, salt);
            // save user
            await user.save();
            // set token and return response
            const payload = {user: {id: user.id}};
            jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 3600}, (error, token) => {
                if (error) throw error;
                res.json({token})
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
