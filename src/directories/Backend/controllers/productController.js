const Product = require('../../../model/Product');
const User = require('../../../model/User');

// @desc Get all products 
// @route GET /product
// @access Private
const getAllProducts = async (req, res) => {
    // Get all notes from MongoDB
    const products = await Product.find().lean();

    // If no products 
    if (!products?.length) {
        return res.status(204).json({ message: 'No products found.' })
    };

    res.json(products);

}

// @desc Create a product 
// @route POST /products
// @access Private
const createProduct = async (req, res) => {
    
    console.log("req:", req.body);
    
    const { 
        id, 
        productType, 
        productName, 
        useAmountPerDay,
        calories,
        sizeInKG,
        priceOfProduct,
        boughtDate,
        lastUseDate,
        selected,
        count,
        localization 
    } = req.body;

    if (!id || !productName || !localization) {
        return res.status(400).json({ message: 'All product fields are required' });
    }

    const duplicate = await Product.findOne({ id: id, productName: productName, localization: localization}).collation().lean().exec();

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate product!' }); // Conflict
    } 

    // Create and store the new product 
    const product = await Product.create({ 
        id, 
        productType, 
        productName, 
        useAmountPerDay, 
        calories, 
        sizeInKG,
        priceOfProduct, 
        boughtDate, 
        lastUseDate, 
        selected, 
        count,
        localization 
    })

    if (product) { // Created 
        return res.status(201).json({ message: 'New product created' })
    } else {
        return res.status(400).json({ message: 'Invalid product data received' })
    }

}

// @desc Create a shopping cart, not implemented fully! 
// @route POST /cart
// @access Private
const createCart = async (req, res) => {
    console.log("req:", req.body);
    const { 
        cartID,
        cart,
    } = req.body

    if (!cartID || !cart) {
        return res.status(400).json({ message: 'All cart fields are required' });
    }

    const duplicate = await CartTest.findOne({ cartID: cartID, cart: cart}).collation().lean().exec();

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate cart!' }); // Conflict
    } 

    // ALTERNATE POSSIBLE SOLUTION, uncomment below for testing.
    // Get all products
    const products = await Product.find().lean();

    // If no products 
    if (!products?.length) {
        return res.status(204).json({ message: 'No products found.' })
    };

    res.json(products);
    
    // Create and store the new product 
    const shoppingList2 = await CartTest.create({ 
        cartID,
        cart: [products]
    })

    if (shoppingList2) { // Created 
        return res.status(201).json({ message: 'New cart created' })
    } else {
        return res.status(400).json({ message: 'Invalid cart data received' })
    }

}

// @desc Update a product 
// @route PATCH /product
// @access Private
const updateProduct = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Product ID required.' });
    }

    const product = await Product.findOne({_id: req.params.id}).exec();
    console.log("Product: ", product);

    if(!product) {
        return res.status(204).json({"message": `No product matches ID ${req.params.id}.` });
    }

    //Updating product here
    if(req.body?.count) product.count = req.body.count;
    const result = await product.save();
    res.json(result);
}

// @desc Delete a product 
// @route DELETE /product
// @access Private
const deleteProduct = async(req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    const result = await product.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

module.exports = {
    getAllProducts,
    createProduct,
    createCart,
    updateProduct,
    deleteProduct
}