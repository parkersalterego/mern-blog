const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const User = require("../models/User");

class AuthController {
    constructor(router) {
        router.route("/auth")
            .post(this.login)
            .get(auth, this.authenticate)
    }

    async authenticate(req, res, next) {
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.json(user);
        } catch(err) {
            next(err);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            // check for user
            let user = await User.findOne({ email });
            if (!user) res.status(400).json({ msg:"Invalid Credentials" });

            // check for valid password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) res.status(400).json({ msg: "Invalid Credentials" });

            // create auth token and send it
            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch(err) {
            next(err)
        }
    }
}

module.exports = AuthController;