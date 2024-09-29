const algoliasearch = require('algoliasearch');
const { propertyValidator } = require('../lib/validators/property.validator');
const PropertyService = require('../services/property.services');
const BookingService = require('../services/booking.services');
const { object } = require('zod');

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY);
const index = client.initIndex("stayNest");

async function createProperty(req, res) {
    req.body.owner = req.user._id;
    const validateReq = await propertyValidator.safeParseAsync(req.body);

    if (validateReq.error) {
        return res.status(400).json({ error: validateReq.error });
    }

    try {
        const property = await PropertyService.create(validateReq.data);
        const records = [{
            objectID: property._id,
            name: property.name,
        }]
        
        // Index data to Algolia
        index.saveObjects(records)
            .then(() => console.log('Data indexed to Algolia'))
            .catch(err => console.error('Error indexing to Algolia:', err));
        return res.status(201).json({ status: 'success', data: property });
    } catch (err) {
        console.log('Error', err);
        return res
            .status(500)
            .json({ status: 'error', error: 'Internal Server Error' });
    }
}

async function updateProperty(req, res) {
    const _id = req.params.id;
    const validateReq = await propertyUpdateValidator.safeParseAsync(req.body);

    if (validateReq.error) {
        return res.status(400).json({ error: validateReq.error });
    }

    try{
        const property = await PropertyService.update(_id, validateReq.data);
        return res.status(201).json({ status: 'success', data: property });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}

async function getPropertyByID(req, res) {
    const id = req.params.id;
    const property = await PropertyService.getById(id);

    if (!property) {
        return res
            .status(404)
            .json({ status: 'error', error: 'Property not found' });
    }

    return res.status(200).json({ status: 'success', data: property });
}

async function getOwnerPropertyByUd(req, res) {
    const id = req.params.id;
    const property = await PropertyService.find({_id : id, owner : req.user._id});

    if (!property) {
        return res
            .status(404)
            .json({ status: 'error', error: 'Property not found' });
    }

    return res.status(200).json({ status: 'success', data: property })
}

async function getAllOwnerProperties(req, res) {
    console.log(req.user._id);
    const properties = await PropertyService.findAll({owner : req.user._id});

    return res.status(200).json({ status: 'success', data: properties });
}

async function getAllProperties(req, res) {
    const {city = null, limit = 20} = req.query;
    const properties = city 
        ? await PropertyService.findAll({status: 'approved', city : city}, limit)
        : await PropertyService.findAll({status: 'approved'}, limit);

    return res.status(200).json({ status: 'success', data: properties });
}

async function getAllPropertiesForAdmin(req, res) {
    const properties = await PropertyService.findAll({status: 'pending'});

    return res.status(200).json({ status: 'success', data: properties });
}

async function updatePropertyStatus(req, res) {
    const id = req.params.id;
    const {status} = req.body;
    if(!status) {
        return res.status(400).json({ status: 'error', error: 'Status is required' });
    }
    try{
        const property = await PropertyService.update(id, {status: status});
        return res.status(200).json({ status: 'success', data: property });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}

async function deleteProperty(req, res) {
    const id = req.params.id;
    try{
        await PropertyService.delete(id);
        await BookingService.cancelAllBookings(id);
        return res.status(200).json({ status: 'success', message: 'Property deleted successfully' });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}


module.exports = {
    createProperty,
    getPropertyByID,
    getAllProperties,
    getAllOwnerProperties,
    updateProperty,
    deleteProperty,
    getAllPropertiesForAdmin,
    updatePropertyStatus,
    getOwnerPropertyByUd
};
