const express = require('express');
const { checkifLoggedIn } = require('../middleware/auth.middleware');

const propController = require('../controllers/property.controller');
const bookingController = require('../controllers/booking.controller');


const router = express.Router();

router.use(checkifLoggedIn);

router.get('/property', propController.getAllOwnerProperties) // Get Route for getting all properties created by a user
router.get('/property/:id/bookings', bookingController.getBookings) // Get Route for getting all bookings for a property)
router.post('/property/create', propController.createProperty) // Post Route for creating a property
router.put('/property/:id', propController.updateProperty) // Put Route for updating a property by id


module.exports = router;