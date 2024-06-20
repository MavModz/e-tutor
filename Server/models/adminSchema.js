const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const institutes = require('./instituteSchema');

const adminSchema = new mongoose.Schema({
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
    profile: {
        type: String,
        default: 'https://mavmodz-etutor.s3.ap-south-1.amazonaws.com/course-thumbnails/1714024250507-music-lifestyle-leisure-entertainment-concept.jpg'
    },
    birth: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
    enrolledInstitute: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref:institutes}],
        default: []
    },
    allocatedSpace: {
        type: Number,
        default: 5 * 1024 * 1024 * 1024,
    },
    usedSpace: {
        type: Number,
        default:0
    },

    // INFORMATION

    title: {
        type: String,
    },
    biography: {
        type: String,
    },
    personalWebsite: {
       type: String, 
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    twitter: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    youtube: {
        type: String,
    },

});

// HASH PASSWORD

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
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

const admins = new mongoose.model("admins", adminSchema);

module.exports = admins;