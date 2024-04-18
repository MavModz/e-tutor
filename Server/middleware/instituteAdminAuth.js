const jwt = require('jsonwebtoken');
const instituteAdmin = require('../models/instituteSchema');
const SECRET_KEY = process.env.key;

const instituteAdminAuth = async(req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];

        if(!token) {
            return res.status(400).json({message:'Authentication token not present'});
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        const instituteadmin = await instituteAdmin.findById(decoded.id);
        if(!instituteadmin) {
            return res.status(400).json({message: 'Admin not found'});
        }

        req.instituteadminId = instituteadmin.id;
        next();
    }

    catch(error) {
        res.status(500).json({error:"internal server error", error})
    }
}

module.exports = instituteAdminAuth;