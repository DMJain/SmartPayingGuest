const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            match: /^[6-9]\d{9}$/,
        },
        price: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        status: {
            type: String,
            enum: ['Open', 'Closed', 'Approved'],
            default: 'Open',
        },
    },
    { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
