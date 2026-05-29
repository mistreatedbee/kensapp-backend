const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ lastOrderDate: -1, updatedAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    const orderQuery = customer.phone
      ? { customerPhone: customer.phone }
      : customer.email
        ? { customerEmail: customer.email }
        : { customerName: customer.name };
    const orders = await Order.find(orderQuery).sort({ createdAt: -1 });
    res.json({ customer, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
