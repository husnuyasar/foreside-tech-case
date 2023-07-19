const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDetail: {
    type: String,
    required: true,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;