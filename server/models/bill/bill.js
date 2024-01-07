const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
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
