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
}

module.exports = BookingService;