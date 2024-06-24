const institutes = require("../models/instituteSchema");
const admins = require("../models/adminSchema");
const users = require("../models/userSchema");
const courses = require("../models/courseSchema");
const checkouts = require("../models/checkoutSchema");
const profileView = require("../models/profileViewSchema");
const courseRating = require("../models/courseRatingShema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const aws_s3 = require('../lib/Services/aws_s3');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const SECRET_KEY = process.env.key;

async function createFolderAtS3(key) {
    const bucket_name = process.env.AWS_BUCKET_NAME;
    const bucketName = bucket_name;
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: '',
        ACL: 'public-read'
    };

    try {
        const data = await aws_s3.putObject(params).promise();
        console.log("Folder Created Successfully", data);
        return data.Location;
    } catch (error) {
        console.log("Error while creating Folder", error);
        throw error;
    }
}

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
                gender,
            });
            const storeData = await newadmin.save();
            const folderKey = `${storeData._id}/`;
            await createFolderAtS3(folderKey);
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
        user = await institutes.findOne({ email: email });
        role = 'institute admin';
    }

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
                    role: role
                },
                SECRET_KEY
            );
            if (user?.role === "admin") {
                login_token += "2";
            }

            else if (user?.role === "user") {
                login_token += "3";
            }

            else if (user?.role === "institute admin") {
                login_token += "4";
            }

            res.status(200).json({ exists: true, user: user, token: login_token });
            console.log(login_token);
        }

        else {
            return res.status(401).json({ message: "User not found" });
        }
    }

    catch (error) {
        console.error("Error during password comparison:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// UPDATE PASSWORD

exports.updatepassword = async (req, res) => {
    const userId = req.params.userId;
    const {newPassword} = req.body;
    try {
        const user = await admins.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        else {
            user.password = newPassword;
            const storeData = await user.save();
            res.status(200).json({storeData});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", error });
    }
}

// PROFILE DETAILS

exports.profiledetails = async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await admins.findOne({ _id: userId });
      if (!user) {
        res.status(400).json({ message: 'User not found ' });
        return;
      }
      res.status(200).json(user);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Interal server Error', error })
    }
  }

// UPDATE ADMIN PROFILE

exports.updateprofile = async (req, res) => {
    const userId = req.params.userId;
    const { name, email, phone, profile, title, biography } = req.body;
    if (!name || !phone || !email) {
      return res.status(401).json({ message: "Fill all fields" })
    }
    try {
      const user = await admins.findOne({ _id: userId });
      if (!user) {
        res.status(404).json({ message: 'User not found ' });
        return;
      }
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.profile = profile;
      user.title = title;
      user.biography = biography;
      const storeData = await user.save();
      res.status(200).json(storeData);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error', error });
    }
  }

//   SOCIAL PROFILE

exports.socialprofile = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await admins.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error', error })
    }
}

// UPDATE SOCIAL PROFILE

exports.updatesocialprofile = async (req, res) => {
    const userId = req.params.userId;
    const { website, facebook, instagram, linkedin, twitter, whatsapp, youtube } = req.body;
    try {
      const user = await admins.findOne({ _id: userId });
      if (!user) {
        res.status(404).json({ message: 'User not found ' });
        return;
      }
      user.website = website;
      user.facebook = facebook;
      user.instagram = instagram;
      user.linkedin = linkedin;
      user.twitter = twitter;
      user.whatsapp = whatsapp;
      user.youtube = youtube;
      const storeData = await user.save();
      res.status(200).json(storeData);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error', error });
    }
  }

exports.addCourse = async (req, res) => {
    const { courseName,
        courseSubtitle,
        courseCategory,
        courseSubcategory,
        courseTopic,
        courseLanguage,
        courseLevel,
        courseDuration,
        courseThumbnail,
        videoThumbnail,
        courseDescription,
        courseTopics,
        targetAudience,
        courseRequirements,
        sections,
        welcomeMessage,
        congratsMessage,
        instructors, } = req.body;
    const adminId = req.adminId;
    const instituteadminId = req.instituteadminId;


    try {
        const newCourse = new courses({
            courseName,
            courseSubtitle,
            courseCategory,
            courseSubcategory,
            courseTopic,
            courseLanguage,
            courseLevel,
            courseDuration,
            courseThumbnail,
            videoThumbnail,
            courseDescription,
            courseTopics,
            targetAudience,
            courseRequirements,
            sections,
            welcomeMessage,
            congratsMessage,
            instructors,
        });
        if (adminId) {
            newCourse.adminId = adminId;
        }
        else if (instituteadminId) {
            newCourse.instituteId = instituteadminId;
        }

        const storeData = await newCourse.save();
        res.status(200).json(storeData);
    }

    catch (error) {
        console.error("Error saving course to database:", error);
        res.status(500).json({ error: 'internal server error', error })
    }
}

// COURSES CREATED BY ADMIN
exports.mycourses = async (req, res) => {
    const userID = req.params.userId;
    let user = await admins.findOne({ _id: userID });

    if (!user) {
        user = await institutes.findOne({ _id: userID });
    }
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    try {
        const allcourses = await courses.find({ adminId: userID });
        res.status(200).json(allcourses);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server, error', error })
    }
}

exports.courseinstructors = async (req, res) => {
    try {
        const adminId = req.adminId;
        const instituteadminId = req.instituteadminId;
        let teacherQuery = {};

        if (adminId) {
            teacherQuery = { _id: adminId }
        }
        else if (instituteadminId) {
            teacherQuery = { enrolledInstitute: instituteadminId }
        }
        const courseTeachers = await admins.find(teacherQuery).select("-password");
        res.status(200).json(courseTeachers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error })
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

// AWS CLOUD STORAGE INFO

const bucketName = process.env.AWS_BUCKET_NAME;

const getObjectSize = async (bucket, prefix) => {
    const params = {
        Bucket: bucket,
        Prefix: prefix,
    };

    const data = await aws_s3.listObjectsV2(params).promise();
    return data.Contents.reduce((acc, item) => acc + item.Size, 0);
};

exports.cloudstorage = async (req, res) => {
    const userID = req.params.userId;
    let user = await admins.findOne({ _id: userID });

    if (!user) {
        user = await institutes.findOne({ _id: userID });
    }
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const folderPath = user._id.toString();
    const emptySpace = user.allocatedSpace;

    try {
        const [imagesSize, videosSize, filesSize] = await Promise.all([
            getObjectSize(bucketName, `${folderPath}/images/`),
            getObjectSize(bucketName, `${folderPath}/videos/`),
            getObjectSize(bucketName, `${folderPath}/files/`),
        ]);

        const totalUsedSpace = imagesSize + videosSize + filesSize;
        const freeSpace = emptySpace - totalUsedSpace;

        // Convert bytes to GB
        const bytesToGB = (bytes) => (bytes / 1073741824).toFixed(1);

        res.status(200).json({
            allocatedSpace: bytesToGB(emptySpace),
            usage: [
                { id: 'Images', label: 'Images', value: bytesToGB(imagesSize), color: 'hsl(233, 70%, 50%)' },
                { id: 'Videos', label: 'Videos', value: bytesToGB(videosSize), color: 'hsl(235, 70%, 50%)' },
                { id: 'Files', label: 'Files', value: bytesToGB(filesSize), color: 'hsl(314, 70%, 50%)' },
                { id: 'Free Space', label: 'Free Space', value: bytesToGB(freeSpace), color: 'hsl(89, 70%, 50%)' },
            ],
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'AWS server error', error })
    }
}

exports.usedSpace = async (req, res) => {
    const { adminId, fileSize } = req.body;
    let user = await admins.findOne({ _id: adminId });

    if (!user) {
        user = await institutes.findOne({ _id: adminId });
    }
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    try {
        user.usedSpace += fileSize;
        if (user.usedSpace > user.allocatedSpace) {
            return res.status(400).json({ error: 'Storage limit exceeded' });
        }
        const storeData = await user.save();
        res.status(200).json({ message: 'Used space updated successfully', storeData });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

// ADMIN PROFILE VIEWS
exports.profileViews = async (req, res) => {
    const adminId = req.params.userId;
    console.log(adminId)
    try {
        const views = await profileView.aggregate([
            { $match: { profileId: new ObjectId(adminId) } },
            {
                $group: {
                    _id: { $dayOfWeek: "$viewDate" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        if (views.length === 0) {
            return res.status(404).json({ message: 'No views found for this profile.' });
        }

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const formattedViews = views.map(view => ({
            day: dayNames[view._id - 1],
            views: view.count
        }));

        res.json(formattedViews);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", error });
    }
}

// OVERALL COURSE RATING

exports.getOverAllCourseRatings = async (req, res) => {
    const adminId = req.params.userId;
    try {
        const allcourses = await courses.find({ adminId: adminId });
        if (!allcourses.length) {
            return res.status(404).json({ message: "No courses found for the admin" });
        }

        // Extract course IDs for the fetched courses
        const courseIds = allcourses.map(course => course._id);

        // Convert courseIds to ObjectId type
        const ObjectId = mongoose.Types.ObjectId;
        const convertedCourseIds = courseIds.map(id => new ObjectId(id));

        // Aggregate ratings for these courses
        const ratingsAggregation = await courseRating.aggregate([
            { $match: { courseId: { $in: convertedCourseIds } } },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRatings: { $sum: "$count" },
                    averageRating: { $avg: "$_id" },
                    ratings: {
                        $push: {
                            rating: "$_id",
                            count: "$count"
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$ratings",
                    preserveNullAndEmptyArrays: true // Preserve documents with empty ratings array
                }
            },
            {
                $sort: { "ratings.rating": -1 } // Sort by rating value in descending order
            },
            {
                $group: {
                    _id: "$_id",
                    totalRatings: { $first: "$totalRatings" },
                    averageRating: { $first: "$averageRating" },
                    ratings: { $push: "$ratings" } // Push the sorted ratings back into an array
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRatings: 1,
                    averageRating: 1,
                    ratings: {
                        $arrayToObject: {
                            $map: {
                                input: { $range: [5, 0, -1] }, // Generate an array from 5 to 0 for ratings in descending order
                                as: "r",
                                in: {
                                    k: { $concat: [{ $toString: "$$r" }, "stars"] }, // Convert rating to string and append "stars"
                                    v: {
                                        $cond: [
                                            { $eq: [{ $indexOfArray: ["$ratings.rating", "$$r"] }, -1] }, // Check if rating exists in the array
                                            0, // If rating does not exist, set count to 0
                                            { $arrayElemAt: ["$ratings.count", { $indexOfArray: ["$ratings.rating", "$$r"] }] } // If rating exists, get its count
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);


        if (!ratingsAggregation.length) {
            return res.status(404).json({ message: "No ratings found for these courses." });
        }

        res.status(200).json(ratingsAggregation[0]); // or process and send all results as needed
    } catch (error) {
        console.error("Error fetching course ratings:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


// WEEKLY OVERALL RATING

function getWeekOfMonth(date) {
    const startDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startDayOfWeek = startDayOfMonth.getDay(); // Day of the week the month starts on
    const currentDay = date.getDate(); // Current day in the month
    const adjustedDay = currentDay + (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); // Adjust depending if week starts on Sunday or Monday

    return Math.ceil(adjustedDay / 7);
}

exports.weeklyOverAllratings = async (req, res) => {
    const adminId = req.params.userId;
    const today = new Date();
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    try {
        const adminCourses = await courses.find({ adminId: adminId });
        if (!adminCourses.length) {
            return res.status(404).json({ message: "No courses found for the admin" });
        }

        const courseIds = adminCourses.map(course => course._id);

        const weeklyCounts = await courseRating.aggregate([
            { $match: { courseId: { $in: courseIds }, createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
            {
                $project: {
                    weekOfMonth: {
                        $add: [
                            {
                                $floor: {
                                    $divide: [
                                        { $subtract: [{ $dayOfMonth: "$createdAt" }, 1] },
                                        7
                                    ]
                                }
                            },
                            1
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$weekOfMonth",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const results = Array.from({ length: 4 }, (_, index) => ({ id: `week${index + 1}`, data: 0 }));

        weeklyCounts.forEach(item => {
            if (item._id > 0 && item._id <= 4) {
                results[item._id - 1].data = item.count;
            }
        });

        res.status(200).json(results);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', error });
    }
}

// LIST OF USERS ENROLLED WITH SPECIFIC ADMIN

exports.userlist = async (req, res) => {
    const adminId = req.adminId;
    
    try {
        const user = await users.find({ 'enrolledCourses.adminId': adminId });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found for this admin.' });
        }

        res.status(200).json({ message: 'Users retrieved successfully', user });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', error });
    }
}