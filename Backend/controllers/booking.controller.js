const axios = require('axios');

const User = require('../models/user.model');
const BookingService = require('../services/booking.services');
const PropertyService = require('../services/property.services');

const {
    bookingCreationValidationSchema,
    verifyPaymentValidationSchema,
    createBookingValidationSchema,
} = require('../lib/validators/booking.validator');
const { hash, createId } = require('../lib/utils/encrypt');

ClientId = process.env.CASHFREE_CLIENT_ID;
ClientSecret = process.env.CASHFREE_CLIENT_SECRET;

async function handleCreateBooking(req, res) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });


    const validationResult =
        await bookingCreationValidationSchema.safeParseAsync(req.body);

    if (validationResult.error)
        return res.status(400).json({ error: validationResult.error });

    const { propertyId, date, totalPrice } = validationResult.data;

    const property = await PropertyService.getById(propertyId);
    
    if(req.user._id == property.owner) return res.status(400).json({error: 'You cannot book your own property'});
    
    const user = await User.findById(req.user._id).select({
        firstname: true,
        lastname: true,
        email: true,
        role: true,
    });

    const order_expiry_time = new Date(Date.now() + 5.8 * 60 * 60 * 1000)
        .toISOString()
        .replace(/\.\d+Z/, '+05:30');

    const orderId = await createId();

    if (!property) return res.status(400).json({ error: 'Invalid property' });

    try {
        let request = {
            method: 'POST',
            url: 'https://sandbox.cashfree.com/pg/orders',
            headers: {
            accept: 'application/json',
            'x-api-version': '2023-08-01',
            'content-type': 'application/json',
            'x-client-id': ClientId,
            'x-client-secret': ClientSecret,
            },
            data: {
            customer_details: {
                customer_id: user._id,
                customer_phone: '9999999999',
                customer_email: user.email,
                customer_name: `${user.firstname} ${user.lastname}`,
            },
            order_id: orderId,
            order_amount: Number(totalPrice),
            order_currency: 'INR',
            order_expiry_time: order_expiry_time,
            },
        };

        axios
            .request(request)
            .then((response) => {
                console.log('/payment response', response.data);
                res.json(response.data);
            })
            .catch((error) => {
                console.error('payment error', error.response.data.message);
            });
    } catch (error) {
        console.log(error);
    }
}

async function verifyPayment(req, res) {
    const validationResult = await verifyPaymentValidationSchema.safeParseAsync(
        req.body
    );

    if (validationResult.error)
        return res.status(400).json({ error: validationResult.error });

    

    const { propertyId, orderId, date } = validationResult.data;

    try {
        let request = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${orderId}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'x-client-id': ClientId,
                'x-client-secret': ClientSecret,
            },
        };

        axios
            .request(request)
            .then((response) => {
                console.log('/verify response', response.data);
                res.json(response.data);
            })
            .catch((error) => {
                console.error('payment error', error.response.data.message);
            });
    } catch (error) {
        console.log(error);
    }
}

async function createBooking(req, res) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    const validateResult = await createBookingValidationSchema.safeParseAsync(req.body);
    if (validateResult.error) return res.status(400).json({ error: validateResult.error });
    
    const {propertyId, date, paymentId} = validateResult.data;
    const userId = req.user._id;

    try {
        await BookingService.create({propertyId, date, paymentId, userId});
        res.status(201).json({message: 'Booking created successfully'});
    } catch (error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
    
}

async function getBookingsPerProperty(req, res) {
    const propertyId = req.params.id;
    const bookings = await BookingService.getAll({ propertyId: propertyId});
    res.status(200).json({ status: 'success',data: bookings});
}

async function getAllOwnerBookings(req, res) {
    const userId = req.user._id;
    const bookings = await BookingService.getAll({ propertyOwnerId: userId });
    res.status(200).json({ status: 'success',data: bookings});
}

async function getAllUserBookings(req, res) {
    const userId = req.user._id;
    const bookings = await BookingService.getAll({ userId: userId });
    res.status(200).json({ status: 'success',data: bookings});
}

async function cancelBooking(req, res) {
    const bookingId = req.params.bookingId;
    const booking = await BookingService.cancelBooking(bookingId);
    res.status(200).json({ status: 'success',data: booking});
}

module.exports = { handleCreateBooking, verifyPayment, createBooking , getBookingsPerProperty,cancelBooking, getAllOwnerBookings, getAllUserBookings};

//module.exports = {createBooking, getBookingsPerProperty, getAllOwnerBookings, cancelBooking, getAllUserBookings};
