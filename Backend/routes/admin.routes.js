const propController = require('../controllers/property.controller');
const { restrictToRole} = require('../middleware/auth.middleware');

const express = require('express');

const router = express.Router();

router.use(restrictToRole('admin'));

router.get('/review', propController.getAllPropertiesForAdmin);//get all properties for admin to review
router.post('/status/:id', propController.updatePropertyStatus);//approve a property

module.exports = router;
