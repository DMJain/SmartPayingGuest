const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
});

// Index for property and user fields
bookingSchema.index({ property: 1, user: 1 }); // without {unique:true},it wouldn’t prevent multiple bookings by the same user for the same property

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
