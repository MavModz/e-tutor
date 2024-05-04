const jwt = require('jsonwebtoken');
const instituteAdmin = require('../models/instituteSchema');
const Admin = require('../models/adminSchema');
const SECRET_KEY = process.env.key;

// Combined middleware to allow either admin or institute admin
const eitherAdminAuth = async (req, res, next) => {
    try {
      // Try admin auth first
      const adminToken = req.headers.authorization?.split(" ")[1];
      if (adminToken) {
        const decodedAdmin = jwt.verify(adminToken, SECRET_KEY);
        const admin = await Admin.findById(decodedAdmin.id);
        if (admin) {
          req.adminId = admin.id; // Assign admin ID to the request object
          return next(); // Admin verified, proceed to next middleware
        }
      }
    } catch (error) {
      // If error is not due to token verification, return an error response
      if (error.name !== 'JsonWebTokenError') {
        return res.status(500).json({ message: "Internal server error", error });
      }
      // If the error is a JsonWebTokenError, try to verify as institute admin next
    }
  
    // Try institute admin auth if admin auth failed
    try {
      const instituteAdminToken = req.headers.authorization?.split(" ")[1];
      if (instituteAdminToken) {
        const decodedInstituteAdmin = jwt.verify(instituteAdminToken, SECRET_KEY);
        const instituteAdminUser = await instituteAdmin.findById(decodedInstituteAdmin.id);
        if (instituteAdminUser) {
          req.instituteadminId = instituteAdminUser.id; // Assign institute admin ID to the request object
          return next(); // Institute admin verified, proceed to next middleware
        }
      }
      // If no user is found, return an unauthorized response
      return res.status(400).json({ message: 'Authentication failed' });
    } catch (error) {
      // Handle any other errors
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  module.exports = eitherAdminAuth;
  