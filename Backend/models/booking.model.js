const {Schema, model} = require('mongoose');

const bookingSchema = new Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true,
    },
    propertyOwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    paymentId: {
        type: String,
        required: true,
        unique: true,
    },
});

// Index for property and user fields
bookingSchema.index({ propertyId: 1, userId: 1 }, { unique: true });
// Without { unique: true }:
// The index would still optimize queries, but it wouldn’t prevent multiple bookings by the same user for the same property.
// With { unique: true }:
// The index not only optimizes queries but also enforces a business rule (e.g., a user can only book a property once).

const Booking = model('booking', bookingSchema);
module.exports = Booking;
