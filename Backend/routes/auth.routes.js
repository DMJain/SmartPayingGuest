const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', authController.signUp) // Post Route for signing UP to application
router.post('/signin', authController.signIn) //Post Route for siging In to application

module.exports = router;
