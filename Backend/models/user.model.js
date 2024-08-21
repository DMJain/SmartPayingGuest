const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            match: /^[6-9]\d{9}$/, // Regex pattern to ensure the number starts with 6-9 and is exactly 10 digits
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'owner'],
            default: 'user',
        },
        salt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const User = model('User', userSchema);
module.exports = User;
