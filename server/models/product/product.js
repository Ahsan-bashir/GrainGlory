const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    rich_description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
    }] ,
    countInStock: {
        type: Number, // Change the type to Number
        required: true,
        min: 0, 
        max: 2000
    },
    isFeatured: {
        type: Boolean, 
        default: false
    },
    numReviews: {
        type: Number, 
        default: 0
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
       ref: 'Category',
        required: true 
    }
}); 

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Product', productSchema);