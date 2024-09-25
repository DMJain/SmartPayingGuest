const booking = require('../models/booking.model');
const property = require('../models/property.model');

class BookingService {
    static async create(payload) {
        const propertyData = await property.findById(payload.propertyId);
        const propertyOwner = propertyData.owner;
        
        if (propertyOwner === payload.userId) {
            throw new Error('You cannot book your own property');
        }

        return await booking.create({propertyId: payload.propertyId, propertyOwnerId : propertyOwner, userId : payload.userId, date: payload.date, status: 'confirmed', paymentId: payload.paymentId});
    }

    static async getAll(payload) {
        return await booking.find(payload).populate('propertyId').populate('userId').populate('propertyOwnerId');
    }

    static async cancelAllBookings(propertyId) {
        return await booking.updateMany({property: propertyId}, {status: 'cancelled'});
    }

    static async cancelBooking(bookingId) {
        return await booking.findByIdAndUpdate(bookingId, {status: 'cancelled'}, {new: true});
    }

}

module.exports = BookingService;