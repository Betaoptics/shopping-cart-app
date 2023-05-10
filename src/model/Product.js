const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// See docs at: https://mongoosejs.com/docs/schematypes.html

const productSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
    productType: {
        type: String
    },
    productName: {
        type: String,
        require: true
    },
    useAmountPerDay: {
        type: Number,
        default: 0
    },
    calories: {
        type: Number, 
    },
    sizeInKG: {
        type: Number, // Alternatively: Decimal128, see documentation for: https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Decimal128
    },
    priceOfProduct: {
        type: Number, // Alternatively: Decimal128, see documentation for: https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Decimal128
    },
    boughtDate: {
        type: Date,
        default: Date.now
    },
    lastUseDate: {
        type: Date
    },
    selected: {
        type: Boolean
    },
    count: {
        type: Number,
        default: 0,
    },
    localization: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);