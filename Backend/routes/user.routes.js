const express = require('express');

const propController = require('../controllers/property.controller');
const bookingController = require('../controllers/booking.controller'); 

const { checkifLoggedIn } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/property', propController.getAllProperties) // Get Route for getting all properties created by a user
router.get('/property/:id', propController.getPropertyByID) // Get Route for getting a property by id
// router.get('/bookings', checkifLoggedIn, bookingController.getAllUserBookings) // Get Route for getting all bookings for a user
// router.delete('/booking/:bookingId', checkifLoggedIn, bookingController.cancelBooking) // Delete Route for cancelling a booking by id

module.exports = router;
