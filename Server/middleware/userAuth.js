const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const SECRET_KEY = process.env.key;

const userAuth = async(req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];

        if(!token) {
            return res.status(400).json({message:'Authentication token not present'});
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }

        req.userId = user.id;
        next();
    }

    catch(error) {
        res.status(500).json({error:"internal server error", error})
    }
}

module.exports = userAuth;