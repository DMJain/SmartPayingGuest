const BookingService = require('../services/booking.services');
const { bookingValidator} = require('../lib/validators/booking.validator');

const createBooking = async (req, res) => {
    const validateReq = await bookingValidator.safeParseAsync(req.body);
    const user = req.user._id;

    try {
        const booking = await BookingService.create({ ...validateReq.data, user });
        return res.status(201).json({ status: 'success', data: booking });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}

const getBookings = async (req, res) => {
    const user = req.user._id;
    const propertyId = req.params.id;
    try {
        const bookings = await BookingService.getAll({propertyOwner:user, property: propertyId});
        return res.status(200).json({ status: 'success', data: bookings });
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}

module.exports = {createBooking, getBookings};
