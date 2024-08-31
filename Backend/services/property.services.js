const Property = require('../models/property.model');

class PropertyService {
    static async create(data) {
        try {
            return await Property.create(data);
        } catch (err) {
            console.error('Error creating property:', err);
            throw err;
        }
    }

    static async getById(id) {
        try {
            return await Property.findById(id);
        } catch (err) {
            console.error('Error fetching property by ID:', err);
            throw err;
        }
    }

    static async findAll(owner) {
        try {
            return await Property.find({ owner });
        } catch (err) {
            console.error('Error fetching properties for owner:', err);
            throw err;
        }
    }
}

module.exports = PropertyService;
