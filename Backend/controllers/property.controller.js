const { propertyValidator , propertyUpdateValidator} = require("../lib/validators/property.validator");
const PropertyService = require("../services/property.services")


async function createProperty(req, res) {
    req.body.owner = req.user._id;
    const validateReq = await propertyValidator.safeParseAsync(req.body);

    if (validateReq.error) {
        return res.status(400).json({ error: validateReq.error });
    }

    try{
        const property = await PropertyService.create(validateReq.data);
        return res.status(201).json({ status: 'success', data: property });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}

async function updateProperty(req, res) {
    const id = req.params.id;
    const validateReq = await propertyUpdateValidator.safeParseAsync(req.body);

    if (validateReq.error) {
        return res.status(400).json({ error: validateReq.error });
    }

    try{
        const property = await PropertyService.update(id, validateReq.data);
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
        return res.status(404).json({ status: 'error', error: 'Property not found' });
    }

    return res.status(200).json({ status: 'success', data: property });
}

async function getAllProperties(req, res) {
    const properties = await PropertyService.findAll(req.user._id);

    return res.status(200).json({ status: 'success', data: properties });
}

module.exports = {
    createProperty,
    getPropertyByID,
    getAllProperties,
    updateProperty
};
