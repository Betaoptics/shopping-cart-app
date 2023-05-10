const express = require('express');
const router = express.Router();
const cartRowController = require('../directories/Backend/controllers/cartRowController');
const verifyJWT = require('../directories/Backend/middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(cartRowController.getCartRow)
    .post(cartRowController.createCartRow)
    .patch(cartRowController.updateCartRow)
    .delete(cartRowController.deleteCartRow);

module.exports = router;