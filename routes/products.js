const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
const { broadcast } = require('../lib/events');
const { slugify } = require('../lib/slug');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.name),
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    });
    await product.save();
    broadcast('products', { resource: 'products' });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const update = {
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : req.body.name ? slugify(req.body.name) : undefined,
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    broadcast('products', { resource: 'products' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    broadcast('products', { resource: 'products' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
