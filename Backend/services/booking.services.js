const booking = require('../models/booking.model');
const property = require('../models/property.model');

class BookingService {
    static async create(payload) {
        const propertyData = await property.findById(payload.property);
        const propertyOwner = propertyData.owner;
        
        if (propertyOwner === payload.user) {
            throw new Error('You cannot book your own property');
        }

        return await booking.create({property: payload.property, propertyOwner : propertyOwner, user : payload.user, date: payload.date, status: 'confirmed'});
    }

    static async getAll(payload) {
        return await booking.find(payload);
    }

    static async cancelAllBookings(propertyId) {
        return await booking.updateMany({property: propertyId}, {status: 'cancelled'});
    }

    static async cancelBooking(bookingId) {
        return await booking.findByIdAndUpdate(bookingId, {status: 'cancelled'}, {new: true});
    }

}

module.exports = BookingService;