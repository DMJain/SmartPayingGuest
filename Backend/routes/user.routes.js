const express = require('express');
const { checkifLoggedIn } = require('../middleware/auth.middleware');

const propController = require('../controllers/property.controller');

const router = express.Router();

router.get('/property', propController.getAllProperties) // Get Route for getting all properties created by a user
router.get('/property/:id', propController.getPropertyByID) // Get Route for getting a property by id
router.post('/property/create',checkifLoggedIn, propController.createProperty) // Post Route for creating a property

module.exports = router;
