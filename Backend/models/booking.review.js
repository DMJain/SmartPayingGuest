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
bookingSchema.index({ property: 1, user: 1 }, { unique: true });
// Without { unique: true }:
// The index would still optimize queries, but it wouldn’t prevent multiple bookings by the same user for the same property.
// With { unique: true }:
// The index not only optimizes queries but also enforces a business rule (e.g., a user can only book a property once).

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
