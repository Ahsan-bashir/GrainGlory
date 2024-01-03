// /*this is the description for all collections :"## Rice Trading Website ERD

// **Entities:**

// * **User:** (ID, Username, Password, Email, Role)
//     * Role: (ID, Name) - Possible values: Customer, Admin
// * **Product:** (ID, Name, Description, Price, Unit, Quantity)
// * **Order:** (ID, User_ID, Date, Status)
//     * Status: (ID, Name) - Possible values: Pending, Confirmed, Shipped, Delivered, Cancelled
// * **Order_Item:** (ID, Order_ID, Product_ID, Quantity, Price)
// * **Bill:** (ID, Order_ID, Amount, Payment_Method, Date)
//     * Payment_Method: (ID, Name) - Currently only Cash on Delivery (COD)

// **Relationships:**

// * **One User can have many Orders.** (One-to-Many)
// * **One Order can have many Order_Items.** (One-to-Many)
// * **One Order_Item references one Product.** (Many-to-One)
// * **One Order has one Bill.** (One-to-One)
// * **One User has one Role.** (One-to-One)

// **Additional Notes:**

// * The ERD can be further extended to include additional features, such as:
//     * Reviews and ratings for products
//     * Address management for customers
//     * Different payment methods (future implementation)
//     * Inventory management for products
//     * Promotions and discounts
// * Scalability can be achieved through proper database design and choice of technology.
// * Security can be ensured through authentication, authorization, and data encryption measures.
// * Robust data backup and recovery can be implemented through regular backups and disaster recovery plans.

// This is a basic ERD for the rice trading website. You can modify and extend it based on your specific requirements and functionalities.

// I hope this helps! Let me know if you have any other questions.

//  */

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//     user_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     status: {
//         type: Schema.Types.ObjectId,
//         ref: 'Status',
//         required: true
//     }
// });

// module.exports = mongoose.model('Order', orderSchema);

// // Path: src/server/models/test.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const orderItemSchema = new Schema({
//     order_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'Order',
//         required: true
//     },
//     product_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     }
// });

// module.exports = mongoose.model('OrderItem', orderItemSchema);

// // Path: src/server/models/test.js
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: String,
//     price: {
//         type: Number,
//         required: true
//     },
//     unit: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// });

// module.exports = mongoose.model('Product', productSchema);

// // Path: src/server/models/test.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const roleSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('Role', roleSchema);

// // Path: src/server/models/test.js

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const statusSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('Status', statusSchema);

// // Path: src/server/models/test.js

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     password: String,
//     email: String,
//     role_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'Role',
//         required: true
//     }
// });

// module.exports = mongoose.model('User', userSchema);

// // Path: src/server/routes/test.js

// const express = require('express');
// const router = express.Router();

// const Product = require('../models/product');
// const Order = require('../models/order');
// const OrderItem = require('../models/orderItem');
// const User = require('../models/user');
// const Role = require('../models/role');
// const Status = require('../models/status');

// router.get('/test', (req, res, next) => {
//     res.send('API works!');
// });
