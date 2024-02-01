const superAdmin = require('../models/superAdminSchema');
const category = require('../models/categorySchema');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.key;

exports.superadminregister = async (req, res) => {
    const { name, phone, email, password, birth, gender } = req.body;
    if (!name || !phone || !email || !password || !birth || !gender) {
        return res.status(401).json({ message: "Fill all fields" })
    }
    try {
        const presuperadmin = await superAdmin.findOne({ phone: phone });

        if (presuperadmin) {
            return res.status(200).json("Admin already exist")
        }
        else {
            const newsuperadmin = new superAdmin({
                name,
                phone,
                email,
                password,
                birth,
                gender
            });
            const storeData = await newsuperadmin.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};


exports.addCategory = async(req, res) => {
    const { categoryName } = req.body;

    try {
        const newCategory = new category ({
            categoryName
        });

        const storeData = await newCategory.save();
        res.status(200).json(storeData);
    }

    catch (error) {
        res.status(500).json({error:'Internal server error', error})
    }
}