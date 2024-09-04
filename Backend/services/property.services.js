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

    static async findAll(payload) {
        try {
            return await Property.find(payload);
        } catch (err) {
            console.error('Error fetching properties for owner:', err);
            throw err;
        }
    }

    static async update(id, data){
        return Property.findByIdAndUpdate(id, data, {new: true});
    }
}

module.exports = PropertyService;
