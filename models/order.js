const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  deliveryType: String,
  address: String,
  notes: String,
  items: [orderItemSchema],
  subtotal: Number,
  total: Number,
  status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
