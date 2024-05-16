const mongoose = require("mongoose");

const profileViewSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'institute admin'],
    },
    viewDate: {
        type: Date,
        default: Date.now
    }
});

const ProfileView = mongoose.model("ProfileView", profileViewSchema);

module.exports = ProfileView;
