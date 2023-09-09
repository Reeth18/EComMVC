const express = require ('express');
const productRouter = express.Router();

const {
    getProducts,
    addProducts,
    getProductsById,
    getProductsByCategory
} = require ('../Controllers/product.controller');


// Creating a Route for add Products
// /products/products : get request : for getting the list of products from server
productRouter.get('/products', getProducts);

// /products/new : POST request
productRouter.post('/new', addProducts);


// /products/:category :get request : searching for product by category.
productRouter.get('/getproducts/:category', getProductsByCategory)

// /products/:id: get request : searching for product by id.
productRouter.get('/:id', getProductsById)


// exporting to the index.js
module.exports = productRouter;

