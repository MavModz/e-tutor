const checkouts = require("../models/checkoutSchema");
const users = require("../models/userSchema");
const Course = require('../models/courseSchema');

exports.userregister = async (req, res) => {
  const { name, phone, email, password, birth, gender } = req.body;

  if (!name || !phone || !email || !password || !birth || !gender) {
    return res.status(401).json({ message: "Fill all fields" })
  }

  try {
    const preuser = await users.findOne({ phone: phone });

    if (preuser) {
      return res.status(200).json("User already exist")
    }
    else {
      const newuser = new users({
        name,
        phone,
        email,
        password,
        birth,
        gender
      });
      const storeData = await newuser.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.checkout = async (req, res) => {
  const { phone, amount } = req.body;
  const userId = req.userId

  if (!phone || !amount) {
    return res.status(401).json({ message: "Fill all fields" })
  }

  const preuser = await users.findOne({ phone: phone });
  try {
    if (preuser) {
      const userName = preuser.name;

      const CheckOut = new checkouts({
        name: userName,
        phone: phone,
        amount: amount,
        userId: userId
      });

      const storeData = await CheckOut.save();
      res.status(200).json(storeData);
    }
    else {
      res.status(403).json({ message: "user not found" });
    }
  }

  catch (error) {
    res.status(400).json({ error: "Internal Server Error", error })
  }
}

exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseCode } = req.body;

    const course = await Course.findOne({ courseCode: courseCode })
    if (!course) {
      return res.status(404).json({ message: 'course not found' });
    }

    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    if (user.enrolledCourses.includes(courseCode)) {
      return res.status(400).json({ message: 'user already enrolled' });
    }

    user.enrolledCourses.push(courseCode);
    const storeData = await user.save();
    return res.status(200).json({ message: ' Course Enrollment successful', user: user });
  }

  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', error })
  }
}

exports.totalenrolledcourses = async (req, res) => {
  try {
    const userId = req.userId;
    const inputdata = await checkouts.find({ userId: userId });
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
      monthAmounts[month] += 1;
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

exports.allcourses = async (req, res) => {
  try {
    const allcourses = await Course.find({});
    res.status(200).json(allcourses);
  }

  catch {
    res.status(500).json({ error: "Internal server error", error })
  }
}