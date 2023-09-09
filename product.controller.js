const ProductModel = require ('../Models/product.model');

// ***** /products/products : get request : for getting the list of products from server ***** //
const getProducts = async (request, response) => {
    try {
        // to get the list of products
        const productData = await ProductModel.find({});
        
        // check whether the length of productData < 1 
        // if so return the product lists are not fetched
        if (productData.length < 1){
            return response.status(401).json({
                message: "Could not fetch the product data",
            })
        }
        
        // otherwise return the list of the products
        return response.status(201).json({
            message: "Product lists fetched successfully",
            productData,
        })
    } catch (error) {
        // Error handling
        console.log(error.message);
        return response.status(401).json({
            message: `Couldn't fetch the list of products..... ${error.message}`
        });
    }
};

// ***** /products/new : post request : adding new product to the database . ***** //
const addProducts = async (request, response) => {
    try {
        // send request from client end
        const {
            name,
            totalQuantity,
            category,
            price
        } = request.body;

        // Matching with the model
        const newProduct = new ProductModel({
            Name: name,
            Total_qnty: totalQuantity,
            Category: category,
            Price: price, 
        });

        // Save the model
        let sendNewProduct = await newProduct.save();
        // New Data Added 
        return response.status(201).json({
            message: `Data Inserted Successfully`,
            sendNewProduct,
        })
    } catch (error) {
        // Display the error message
        console.log(error.message);
        return response.status(401).json({
            message: "Couldn't insert data..... Server Error or something went wrong"
        })
    }
};

// /products/:id: get request : searching for product by id.
const getProductsById = async (request, response) => {
    // Fetch the ID
    let {id} = request.params;
    try {
        // Match the ID with the fetched ID
        const getProductsByID = await ProductModel.find(
            {
                _id:id,
            }); 
            // If it doesn't match then return product doesnot exist
            if (!getProductsByID){
                return response.status(400).json({
                    message: "No product exists with this ID"
                })
            }
    
            // otherwise return the product with the entered ID
            return response.status(200).json({
                message: "Product Exists with the entered ID",
                getProductsByID
            });
    } catch (error) {
        return response.status(401).json({
            // Server error
            message: `Failed to Connect....Something went wrong ${error.message}`
        })
    }
};

// /products/:category :get request : searching for product by category.
const getProductsByCategory = async (request, response) => {
    // Fetch the category
    const {category} = request.params;
    console.log(category , ` is printing category...`);
    try {
        const getProductsByCategoryEntered = await ProductModel.find(
            {
                Category: category,
            }
        );
    
        if (getProductsByCategoryEntered.length < 1){
            return response.status(400).json({
                message: "No products there with this category"
            });
    
        }
    
        return response.status(200).json({
            message: "Products exist with the category entered",
            getProductsByCategoryEntered
        });
    } catch (error) {
        console.log(error);
        return response.status(404).json({
            message: `Server is not working...... Something went wrong ${error.message}`
        })
    }
};

// export them
module.exports = {
    getProducts,
    addProducts,
    getProductsById,
    getProductsByCategory
}