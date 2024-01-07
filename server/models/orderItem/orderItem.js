const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);