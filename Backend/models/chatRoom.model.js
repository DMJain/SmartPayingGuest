const {Schema, model} = require('mongoose');

const chatRoomSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

chatRoomSchema.index({ userId: 1, ownerId: 1 }, { unique: true });

const Chat = model('chat', chatRoomSchema);
module.exports = Chat;
