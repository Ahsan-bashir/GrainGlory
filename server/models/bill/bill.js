const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        default:'cashOnDlivery'
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

exports.Bill = moongoose.model('Bill', billSchema);
