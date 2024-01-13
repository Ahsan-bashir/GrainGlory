const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const billSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    payment_method: {
        type: String,
        default:'cashOnDelivery'
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

billSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

billSchema.set('toJSON', {
    virtuals: true
});

exports.Bill = moongoose.model('Bill', billSchema);
