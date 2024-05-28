const chat = require('../models/chatSchema');

// SEND MESSAGE

exports.sendmessage = async (req, res) => {
    const {senderId} = req.body
    console.log(req.body);

    try {
        const newMessage = new chat({
            sender: { id: senderId.senderId, onModel: senderId.senderModel },
            receiver: { id: senderId.receiverId, onModel: senderId.receiverModel },
            message: senderId.message,
            time: new Date()
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

// RECIEVE MESSAGE

exports.receivemessage = async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await chat.find({
            $or: [
                { $and: [{ 'sender.id': senderId }, { 'receiver.id': receiverId }] },
                { $and: [{ 'sender.id': receiverId }, { 'receiver.id': senderId }] }
            ]
        }).sort({ time: 1 });
        res.status(200).json(messages);
    }
    catch(error) {
        res.status(500).json({ error: 'Internal Server Error', error });
    }
}