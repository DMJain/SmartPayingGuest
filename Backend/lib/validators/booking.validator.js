const { z } = require('zod')

const bookingCreationValidationSchema = z.object({
  propertyId: z.string(),
  date: z.string(),
  totalPrice: z.string(),
})

const verifyPaymentValidationSchema = z.object({
    propertyId: z.string(),
    date: z.string(),
    orderId: z.string(),
})

const createBookingValidationSchema = z.object({
    propertyId: z.string(),
  date: z.string(),
  paymentId: z.string(),
})

module.exports = {
  bookingCreationValidationSchema,
  verifyPaymentValidationSchema,
  createBookingValidationSchema,
}
