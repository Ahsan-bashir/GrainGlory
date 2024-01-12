const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rich_description: {
        type: String,
    },
    image: {
        type: String,
    },
    images: {
        type: String,
    },
    countInStock: {
        type: Number, // Change the type to Number
        required: true
    },
    isFeatured: {
        type: Boolean, // Change the type to Boolean
        required: true
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    category: {
        type: String,
        default: ''
    }
}); 

module.exports = mongoose.model('Product', productSchema);