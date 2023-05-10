const express = require('express');
const router = express.Router();
const historyController = require('../directories/Backend/controllers/historyController')
const verifyJWT = require('../directories/Backend/middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(historyController.getHistory)

module.exports = router;