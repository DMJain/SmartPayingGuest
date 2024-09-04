const {createBooking} = require('../controllers/booking.controller');
const { checkifLoggedIn } = require('../middleware/auth.middleware');

const express = require('express');

const router = express.Router();

router.use(checkifLoggedIn);

router.post('/create', createBooking);



module.exports = router;
