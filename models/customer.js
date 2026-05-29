const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, index: true },
  email: { type: String, index: true },
  address: String,
  orderCount: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastOrderDate: Date,
  orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

customerSchema.index({ phone: 1, email: 1 });

module.exports = mongoose.model('Customer', customerSchema);
