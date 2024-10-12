const Chat = require('../models/chatRoom.model');

async function createChatRoom(req, res) {
    const { userId, ownerId, propertyId } = req.body;

    try {
        let chatRoom = await Chat.findOne({ userId, ownerId});
        if (!chatRoom) {
            chatRoom = await Chat.create({ userId, ownerId, propertyId });
        }
        return res.status(201).json({ status: 'success', data: chatRoom });
    } catch (error) {
        console.error('Error creating chat room:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }    
}

async function getChatRooms(req, res) {
    const userId = req.user._id;

    try {
        const chatRooms = await Chat.find({
            $or: [{ userId: userId }, { ownerId: userId }] 
        });
        return res.status(200).json({ status: 'success', data: chatRooms });
    } catch (error) {
        console.error('Error fetching chat rooms:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createChatRoom,
    getChatRooms,
};
