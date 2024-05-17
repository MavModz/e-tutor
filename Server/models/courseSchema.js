const mongoose = require('mongoose');
const adminId = require('../models/adminSchema');
const instituteId = require('../models/instituteSchema');

const lectureContentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Video', 'Attach File', 'Description'],
        //   required: true
    },
    url: {
        type: String,
        required: function () { return this.type !== 'Description'; }
    },
    description: {
        type: String,
        required: function () { return this.type === 'Description'; }
    }
}, { _id: false });

const lectureSchema = new mongoose.Schema({
    name: {
        type: String,
        //   required: true
    },
    content: lectureContentSchema
}, { _id: false });

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        //   required: true
    },
    lectures: [lectureSchema]
});

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseSubtitle: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        // required: true,
    },
    courseCategory: {
        type: String,
        required: true,
    },
    courseSubcategory: {
        type: String,
        required: true,
    },
    courseTopic: {
        type: String,
        required: true,
    },
    courseLanguage: {
        type: String,
        required: true,
    },
    optionalLanguage: {
        type: String,
    },
    courseLevel: {
        type: String,
        required: true,
    },
    courseDuration: {
        type: String,
        required: true,
    },
    courseThumbnail: {
        type: String,
        required: true,
    },
    videoThumbnail: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseTopics: {
        type: [String],
        required: true
    },
    targetAudience: {
        type: [String],
        required: true,
    },
    courseRequirements: {
        type: [String],
        required: true
    },
    sections: [sectionSchema],

    welcomeMessage: {
        type: String,
        required: true,
    },
    congratsMessage: {
        type: String,
        // required: true,
    },
    instructors: {
        type: [String],
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: adminId,
        required: function () { return !this.instituteId; }
    },
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: instituteId,
        required: function () { return !this.adminId; }
    },
    // coursePrice: {
    //     type: String,
    //     required: true,
    // },
});

const courses = new mongoose.model("courses", courseSchema);
module.exports = courses;