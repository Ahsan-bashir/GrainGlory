const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
   date:{
         type:Date,
         required:true
    },
   status:{
         type:Date,
         required:true
    },

}); 

exports.Order = mongoose.model('Order', orderSchema);