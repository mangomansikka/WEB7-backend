const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authCheck = async (req, res, next) => {
    // verify user with token
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({error: "You must be logged in"});
    };

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById({ _id }).select("_id");
        next();
    } catch (error) {
        return res.status(401).json({error: ""});
    };
};

module.exports = authCheck;