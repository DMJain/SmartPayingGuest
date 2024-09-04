const {z} = require('zod')

const bookingValidator = z.object({
    property: z.string(),
    date: z.string().optional(),
})

module.exports = {bookingValidator};