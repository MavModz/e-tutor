const instituteadmins = require("../models/instituteSchema");
// const users = require("../models/userSchema");
// const courses = require("../models/courseSchema");
// const checkouts = require("../models/checkoutSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.key;

exports.instituteadminregister = async (req, res) => {
    const { name, phone, email, password } = req.body;
    if (!name || !phone || !email || !password ) {
        return res.status(401).json({ message: "Fill all fields" })
    }
    try {
        const preinstituteadmin = await instituteadmins.findOne({ phone: phone });

        if (preinstituteadmin) {
            return res.status(200).json("Admin already exist")
        }
        else {
            const newpreinstituteadmin = new instituteadmins({
                name,
                phone,
                email,
                password
            });
            const storeData = await newpreinstituteadmin.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};