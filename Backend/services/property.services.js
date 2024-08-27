const Property = require('../models/property.model');

class PropertyService {
    static async create(data) {
        return await Property.create(data);
    }

    static getById(id){
        return Property.findById(id);
    }

    static findAll(owner){
        return Property.find({owner : owner});
    }

    static async update(id, data){
        return Property.findByIdAndUpdate(id, data, {new: true});
    }
}

module.exports = PropertyService;