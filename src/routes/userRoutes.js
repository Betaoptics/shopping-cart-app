const express = require('express');
const router = express.Router();
const usersController = require('../directories/Backend/controllers/userController');
const verifyJWT = require('../directories/Backend/middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;