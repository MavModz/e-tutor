const checkouts = require("../models/checkoutSchema");
const users = require("../models/userSchema");
const Course = require('../models/courseSchema');
const Categories = require('../models/categorySchema');
const admins = require("../models/adminSchema");
const instituteadmins = require("../models/instituteSchema");
const profileView = require("../models/profileViewSchema");
const courseRating = require("../models/courseRatingShema");

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
      return res.status(201).json({ message: 'user already enrolled' });
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

exports.allcategories = async (req, res) => {
  try {
    const allcategories = await Categories.find({});
    res.status(200).json(allcategories);
  }

  catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.allsubcategories = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const category = await Categories.findOne({ categoryName });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    const allsubcategories = category.subCategories
    res.status(200).json(allsubcategories);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.coursedetails = async (req, res) => {
  try {
    const courseCode = req.params.courseId;
    const course = await Course.findOne({ courseCode });

    if (!courseCode) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.status(200).json(course);
  }
  catch (error) {
    res.status(500).json({ error: "Internal server Error", error });
  }
}

exports.coursecategorycount = async (req, res) => {
  try {
    const courseCategory = req.params.courseCategory;
    const category = await Course.find({ courseCategory: courseCategory });
    if (!category) {
      res.status(404).json([]);
    }
    res.status(200).json(category.length);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error", error });
  }
}

// PROFILE CLICK BY USER 
exports.profileclick = async (req, res) => {
  const { profileId, role } = req.body;
  let user = await admins.findOne({ _id: profileId, role: role });

  if (!user) {
    user = await instituteadmins.findOne({ _id: profileId, role: role });
  }
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  try {
    const newView = new profileView({
      profileId: user._id,
      role: user.role
    });
    const storeData = await newView.save();
    res.status(200).json(storeData);
  }
  catch (error) {
    res.status(500).json({ error: "Internal server Error", error });
  }
}

// RATE THE COURSE

exports.ratecourse = async (req, res) => {
  const { courseId, rating, comment } = req.body
  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Unable to Rate the course" })
    }
    const newRating = new courseRating({
      courseId,
      rating,
      comment
    });
    const saveData = await newRating.save();
    res.status(200).json(saveData);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error", error })
  }
}