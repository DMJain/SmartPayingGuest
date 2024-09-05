const express = require('express');
const { checkifLoggedIn } = require('../middleware/auth.middleware');

const propController = require('../controllers/property.controller');
const bookingController = require('../controllers/booking.controller');


const router = express.Router();

router.use(checkifLoggedIn);

router.get('/property', propController.getAllOwnerProperties) // Get Route for getting all properties created by a user
router.get('/property/:id/bookings', bookingController.getBookingsPerProperty) // Get Route for getting all bookings for a property)
router.post('/property/create', propController.createProperty) // Post Route for creating a property
router.get('/bookings', bookingController.getAllOwnerBookings) // Get Route for getting all bookings for a user
router.put('/property/:id', propController.updateProperty) // Put Route for updating a property by id
router.delete('/property/:id', propController.deleteProperty) // Delete Route for deleting a property by id also cancelling all bookings for that property


module.exports = router;