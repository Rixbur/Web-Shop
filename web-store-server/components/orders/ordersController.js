const mongoose = require('mongoose');

const Order = require('./orderModel');

module.exports.getOrders = async function (req, res, next) {
  try {
    const orders = await Order.find({}).exec();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports.getOrdersByEmail = async function (req, res, next) {
  const userEmail = req.params.userEmail;
  console.log(req.params);
  try {
    const order = await Order.find({email: userEmail}).exec();
    if (!order) {
      return res
        .status(404)
        .json({ message: 'The order from given email does not exist' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports.createAnOrder = async function (req, res, next) {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    products: req.body.products.map(p => p._id),
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
  });
  try {
    const savedObject = await order.save();
    res.status(201).json(savedObject);
  } catch (err) {
    next(err);
  }
};

module.exports.getAnOrderById = async function (req, res, next) {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId).populate('products').exec();
    if (!order) {
      return res
        .status(404)
        .json({ message: 'The order with given id does not exist' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAnOrderById = async function (req, res, next) {
  const orderId = req.params.orderId;

  try {
    await Order.deleteOne({ _id: orderId }).exec();
    res.status(200).json({ message: 'The order is successfully deleted' });
  } catch (err) {
    next(err);
  }
};
