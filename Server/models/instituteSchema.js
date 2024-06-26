const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const instituteSchema = new mongoose.Schema({
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
    role: {
        type: String,
        default: 'institute admin',
    },
});

instituteSchema.pre("save", async function (next) {
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
});

const instituteadmins = new mongoose.model("instituteadmins", instituteSchema);
module.exports = instituteadmins;