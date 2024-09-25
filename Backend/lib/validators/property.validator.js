const {z} = require('zod')

const {amenities} = require('../constant')

const propertyValidator = z.object({
    owner: z.string(),
    ownerName: z.string(),
    name: z.string().min(2).max(64),
    plot: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    lat: z.string().optional(),
    lon: z.string().optional(),
    pinCode: z.number(),    
    phoneNumber: z.string().regex(/^[6-9]\d{9}$/).optional(),
    price: z.number(),
    amenities: z.array(z.enum(amenities)).optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
})

const propertyUpdateValidator = z.object({
    owner: z.string().optional(),
    ownerName: z.string().optional(),
    name: z.string().min(2).max(64).optional(),
    plot: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    lat: z.string().optional(),
    lon: z.string().optional(),
    pinCode: z.number().optional(),    
    phoneNumber: z.string().regex(/^[6-9]\d{9}$/).optional(),
    price: z.number().optional(),
    amenities: z.array(z.enum(amenities)).optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
})


module.exports = {propertyValidator, propertyUpdateValidator};