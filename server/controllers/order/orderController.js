const Order = require('../../models/order/order');
const OrderItem = require('../../models/orderItem/orderItem');

exports.getOrders = async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });
    if (!orderList) {
        res.status(500).json({ success: false, message: "No orders to show" });
    }
    res.send(orderList);
}

exports.getOrder = async (req, res) => {
    const order = await Order.find(req.params.id)
        .populate('user', 'name')
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } });
    if (!order) {
        res.status(500).json({ success: false, message: "No order to show" });
    }
    res.send(order);
}

exports.placeOrder = async (req, res) => {

    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }));

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }));

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    });

    order = await order.save();
    if (!order) {
        return res.status(400).send('the order cannot be created!');
    }
    res.send(order);
}

exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true });

    if (!order) {
        return res.status(404).send('the order cannot be updated!');
    }
    res.send(order);
};

exports.deleteOrder = async (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async (orderItem) => {
                await OrderItem.findByIdAndDelete(orderItem);
                return res.status(200).json({ success: true, message: 'the order is deleted!' });
            })
        } else {
            return res.status(404).json({ success: false, message: 'order not found!' });
        }

    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
}

exports.getTotalSales = async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ]);
    if (!totalSales) {
        return res.status(400).send('The order sales cannot be generated');
    }
    res.send({ totalsales: totalSales.pop().totalsales });
}

exports.getOrdersCount = async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count);
    if (!orderCount) {
        res.status(500).json({ success: false, message: "No order to show" });
    }
    res.send({ orderCount: orderCount });
}

exports.getUserOrders = async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid })
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
        .sort({ 'dateOrdered': -1 });
    if (!userOrderList) {
        return res.status(500).json({ success: false, message: 'No orders to show' });
    }
    res.send(userOrderList);
}
