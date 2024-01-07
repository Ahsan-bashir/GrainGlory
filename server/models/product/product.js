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
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
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
        type: Date, // Change the type to Date
        required: true
    },
    category: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('Product', productSchema);