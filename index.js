const express = require ('express');
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const dotenv = require('dotenv').config();

const app = express();
app.use(morgan());
app.use(express.json());

// ****** Connect to the Database ***** //
const main = require ('./dbConnection');
main().then(() => console.log("Loading...Database Connected with the Server"))
.catch((error) => console.error(error.message, "Could not connect Database to the Server..."));
// *********************************** //

// ***** Using all of the Custom Routers ***** //
// ***** Product Router ***** //
const productRouter = require ('./Routes/product.route');
app.use ('/products', productRouter);
// **************************** //

// ***** User Router ***** //
const userRouter = require ('./Routes/user.route');
app.use ('/auth', userRouter);

// ***** Connect the Server ***** //
const portNo = process.env.portNo;
app.listen(portNo, () => {
    console.log(`Server is running on ${portNo}`);
});
// ***************************** //
