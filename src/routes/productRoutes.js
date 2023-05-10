const express = require('express');
const router = express.Router();
const productController = require('../directories/Backend/controllers/productController');
const verifyJWT = require('../directories/Backend/middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;