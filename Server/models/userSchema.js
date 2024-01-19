const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const courses = require("./courseSchema");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    enrolledCourses: {
        type: [{ type: String, ref: 'courses' }],
        default: []
    },
    role: {
        type: String,
        default: 'user',
    },
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
    return next();

    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    }
    catch (error) {
        next(error);
    }
})

const users = new mongoose.model("users",userSchema);

module.exports = users;