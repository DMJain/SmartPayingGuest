const express = require('express');

const propController = require('../controllers/property.controller');

const router = express.Router();

router.get('/property', propController.getAllProperties) // Get Route for getting all properties created by a user
router.get('/property/:id', propController.getPropertyByID) // Get Route for getting a property by id

module.exports = router;
