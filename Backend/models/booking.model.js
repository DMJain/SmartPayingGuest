const {Schema, model} = require('mongoose');
const { date, string } = require('zod');

const bookingSchema = new Schema({
    property: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true,
    },
    propertyOwner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
});

// Index for property and user fields
bookingSchema.index({ property: 1, user: 1 }, { unique: true });
// Without { unique: true }:
// The index would still optimize queries, but it wouldn’t prevent multiple bookings by the same user for the same property.
// With { unique: true }:
// The index not only optimizes queries but also enforces a business rule (e.g., a user can only book a property once).

const Booking = model('booking', bookingSchema);
module.exports = Booking;
