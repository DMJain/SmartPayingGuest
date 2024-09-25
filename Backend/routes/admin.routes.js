const propController = require('../controllers/property.controller');

const express = require('express');

const router = express.Router();

router.get('/review', propController.getAllPropertiesForAdmin);//get all properties for admin to review
router.post('/approve/:id', propController.approveProperty);//approve a property

module.exports = router;
