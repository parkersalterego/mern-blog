const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    // get token from header
    const token = req.header("x-auth-token");
    // check for token
    if (!token) res.status(401).json({ msg: "Missing Token, Authorization Denied" });
    // verify token
    try {
        const decodedToken = jwt.verify(token, config.get("jwtSecret"));
        req.user = decodedToken.user;
        next();
    } catch(error) {
        res.status(401).json({ msg: "Invalid Token, Authorization Denied" });
    }
};