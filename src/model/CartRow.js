const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// See docs at: https://mongoosejs.com/docs/schematypes.html

const cartRow = new Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    count: {
        type: Number,
        default: 0
    },
    boughtDate: {
        type: Date,
        default: Date.now()
    },
});

const CartRow = mongoose.model('CartRow', cartRow);
module.exports = CartRow;