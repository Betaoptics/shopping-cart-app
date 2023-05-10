const Product = require('../../../model/Product');
const User = require('../../../model/User');
const CartRow = require('../../../model/CartRow');

// @desc Get all carRows
// @route GET /notes
// @access Private
const getCartRow = async (req, res) => {

    const { productID } = req.query;
    console.log("productID: ", productID);
    const findAll = await CartRow.findOne({ productID }).collation().lean().exec();
    console.log("foundAll: ", findAll);
    res.json(findAll);

}

// @desc Create a cartRow
// @route POST /cartRow
// @access Private
const createCartRow = async (req, res) => {

    const {
        productID,
        count,
        boughtDate,
    } = req.body;

    console.log(req.body);

    // Check for duplicate 
    const duplicate = await CartRow.findOne({ productID }).collation().lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate cartRow' });
    }

    const cartRowItem = await CartRow.create({
        productID,
        count,
        boughtDate,
    })

    if (cartRowItem) { // Created 
        return res.status(201).json({ message: 'New cart created' })
    } else {
        return res.status(400).json({ message: 'Invalid cartRow data received' })
    }

}

// @desc Update a cartRow
// @route PATCH /cartRow
// @access Private
const updateCartRow = async (req, res) => {

    const { productID, count, boughtDate } = req.body;
    console.log("updateCartRow response: ", req.body);

    // Confirm data 
    if (!productID || !count || typeof boughtDate !== 'string') {
        return res.status(400).json({ message: 'All cartRow fields except password are required' });
    }

    // Does the cartRow exist to update?
    const getID = await CartRow.findOne({ productID }).collation().lean().exec();
    const cartRow = await CartRow.findById( getID._id );
    console.log("\n cartRow: ", cartRow, "\n");

    if (!cartRow) {
        return res.status(400).json({ message: 'CartRow not found' });
    }

    cartRow.count = count;
    cartRow.boughtDate = boughtDate;

    const updatedCartRow = await cartRow.save();

    console.log("\n updatedCartRow: ", updatedCartRow, "\n");

    res.json({ message: `${updatedCartRow.productID} updated` });

}

// @desc Delete a cartRow
// @route DELETE /cartRow
// @access Private
const deleteCartRow = async (req, res) => {

    const { productID } = req.body;

    // Confirm data
    if (!productID) {
        return res.status(400).json({ message: 'cartRow ProductID Required' });
    }

    // Does the cartRow exist to delete?
    const getID = await CartRow.findOne({ productID }).collation().lean().exec();
    const cartRow = await CartRow.findById( getID._id );

    if (!cartRow) {
        return res.status(400).json({ message: 'CartRow not found' });
    }

    const result = await cartRow.deleteOne();

    const reply = `Cartrow ${result.productID} with ID ${result._id} deleted`;

    res.json(reply);

}

module.exports = {
    getCartRow,
    createCartRow,
    updateCartRow,
    deleteCartRow,
}