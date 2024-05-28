const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    sender: {
        id: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },
        onModel: { type: String, required: true, enum: ['user', 'admin', 'institute admin'] }
    },
    receiver: {
        id: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },
        onModel: { type: String, required: true, enum: ['user', 'admin', 'institute admin'] }
    },
    message: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

const chat = mongoose.model("chats", chatSchema);
module.exports = chat;