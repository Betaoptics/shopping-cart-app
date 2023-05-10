const Product = require('../../../model/Product');
const User = require('../../../model/User');

// @desc Get all historical data 
// @route GET /history
// @access Private
const getHistory = async (req, res) => {
    const { productID } = req.query;
    console.log("productID: ", productID);

    // Get all products from MongoDB
    const products = await Product.find().lean();

    // const cartItems = await Cart.findById(req.body.cartID).lean();

    // const rows = await CartRow.where("cartID").equals(req.body.cartID);
    // cartItems.cart.concat(rows);
    // console.log("rows: ", rows);

    // const rows = await CartRow.where("cartID").equals(item._id);
    // const product = await Product.where("count").gt(0); // Find count > 0

    // Get all products where count > 0
    // const history = await CartRow.findOne({ productID }).where("count").gt(0).collation().lean().exec();

    // If no products 
    if (!products?.length) {
        return res.status(204).json({ message: 'No products found.' });
    }

    // // if no history data
    // if(!history.length) {
    //     return res.status(204).json({ message: 'No history data found.' });
    // }

    res.json(products);
    // res.json(history);
}

module.exports = {
    getHistory,
}