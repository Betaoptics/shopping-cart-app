const express = require('express');
const router = express.Router();
const authController = require('../directories/Backend/controllers/authController');
const loginLimiter = require('../directories/Backend/middleware/loginEmitter');

router.route('/').post(loginLimiter, authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router;