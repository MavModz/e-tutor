const institutes = require("../models/instituteSchema");
const admins = require("../models/adminSchema");
const users = require("../models/userSchema");
const courses = require("../models/courseSchema");
const checkouts = require("../models/checkoutSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const aws_s3 = require('../lib/Services/aws_s3');
const profileView = require("../models/profileViewSchema");
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