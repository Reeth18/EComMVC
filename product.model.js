const mongoose = require ('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Total_qnty: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    }, 
    Price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model ('EcomProducts', productSchema);