const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const SECRET_KEY = process.env.key;

const adminAuth = async(req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];

        if(!token) {
            return res.status(400).json({message:'Authentication token not present'});
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        const admin = await Admin.findById(decoded.id);
        if(!admin) {
            return res.status(400).json({message: 'Admin not found'});
        }

        req.adminId = admin.id;
        next();
    }

    catch(error) {
        res.status(500).json({error:"internal server error", error})
    }
}

module.exports = adminAuth;