
const { propertyValidator } = require('../lib/validators/property.validator');
const PropertyService = require('../services/property.services');
const BookingService = require('../services/booking.services');

async function createProperty(req, res) {
    req.body.owner = req.user._id;
    const validateReq = await propertyValidator.safeParseAsync(req.body);

    if (validateReq.error) {
        return res.status(400).json({ error: validateReq.error });
    }

    try {
        const property = await PropertyService.create(validateReq.data);
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

async function approveProperty(req, res) {
    const id = req.params.id;
    try{
        const property = await PropertyService.update(id, {status: 'approved'});
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
    approveProperty,
    getOwnerPropertyByUd
};
