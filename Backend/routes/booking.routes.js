const controller = require('../controllers/booking.controller');
const { checkifLoggedIn } = require('../middleware/auth.middleware');

const express = require('express');

const router = express.Router();

router.use(checkifLoggedIn);

router.post('/initiate', controller.handleCreateBooking)
router.post('/verify-payment', controller.verifyPayment)
router.post('/createBooking', controller.createBooking)




module.exports = router;
