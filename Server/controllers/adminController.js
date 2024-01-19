const admins = require("../models/adminSchema");
const users = require("../models/userSchema");
const courses = require("../models/courseSchema");
const checkouts = require("../models/checkoutSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.key;

exports.adminregister = async (req, res) => {
    const { name, phone, email, password, birth, gender } = req.body;
    if (!name || !phone || !email || !password || !birth || !gender) {
        return res.status(401).json({ message: "Fill all fields" })
    }
    try {
        const preadmin = await admins.findOne({ phone: phone });

        if (preadmin) {
            return res.status(200).json("Admin already exist")
        }
        else {
            const newadmin = new admins({
                name,
                phone,
                email,
                password,
                birth,
                gender
            });
            const storeData = await newadmin.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};


exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    let user = await admins.findOne({ email: email });
    let role = 'admin';

    if (!user) {
        user = await users.findOne({ email: email });
        role = 'user';
    }

    try {
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Incorrect Password" });
            }
            console.log("User Match");

            let login_token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                },
                SECRET_KEY
            );
            if (user?.role === "admin") {
                login_token += "2";
            }

            if (user?.role === "user") {
                login_token += "3";
            }
            res.status(200).json({ exists: true, user: user, token: login_token });
            console.log(login_token);
        }

        else {
            return res.status(401).json({ message: "Admin not found" });
        }
    }

    catch (error) {
        console.error("Error during password comparison:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addCourse = async (req, res) => {
    const { courseName, courseCode, teacherName, coursePrice } = req.body;
    const adminId = req.adminId;

    try {
        const newCourse = new courses({
            courseName,
            courseCode,
            teacherName,
            coursePrice,
            adminId,
        });

        const storeData = await newCourse.save();
        res.status(200).json(storeData);
    }

    catch (error) {
        res.status(500).json({error: 'internal server error', error })
    }
}



exports.totalenrollments = async (req, res) => {
    try {
        const inputdata = await checkouts.find();
        const monthAmounts = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
        };

        inputdata.forEach((item) => {
            const date = new Date(item.Date);
            const month = date.toLocaleString('default', { month: 'short' });
            monthAmounts[month] += item.amount;
        });

        const monthData = Object.keys(monthAmounts).map((month) => ({
            label: month,
            value: monthAmounts[month],
        }));

        res.status(200).json(monthData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", error })
    }
}