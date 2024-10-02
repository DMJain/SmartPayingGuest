const {Schema, model} = require('mongoose');

const {amenities} = require('../lib/constant');

const propertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        ownerName:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        plot: {
            type: String,
            required: true,
        },
        street: {
          type: String,
          required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        lat: {
            type: String,
        },
        lon: {
            type: String,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        lat: {
            type: String,
        },
        lon: {
            type: String,
        },  
        phoneNumber: {
            type: String,
            match: /^[6-9]\d{9}$/,
        },
        price: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            enum: amenities,
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        status: {
            type: String,
            enum: ['pending', 'rejected', 'approved', 'closed'],
            default: 'pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Property = model('property', propertySchema);
module.exports = Property;
