const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const auth = require('../middleware/auth');
const { broadcast } = require('../lib/events');
const { slugify } = require('../lib/slug');

const DEFAULT_CATEGORIES = [
  {
    name: 'Cleaning Products',
    slug: 'cleaning-products',
    description: 'Professional detergents, sanitizers and hygiene essentials.',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80',
    sortOrder: 1,
    isActive: true
  },
  {
    name: 'Fragrances',
    slug: 'fragrances',
    description: 'Fresh, long-lasting fragrances for homes and workplaces.',
    image: 'https://images.unsplash.com/photo-1595425964071-2c1ec4d3dcb2?auto=format&fit=crop&w=900&q=80',
    sortOrder: 2,
    isActive: true
  },
  {
    name: 'Pest Control Services',
    slug: 'pest-control',
    description: 'Residential and commercial pest management solutions.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    sortOrder: 3,
    isActive: true
  }
];

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    let categories = await Category.find().sort({ sortOrder: 1, createdAt: -1 });
    if (categories.length === 0) {
      categories = await Category.insertMany(DEFAULT_CATEGORIES);
    }
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categories
router.post('/', auth, async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.name)
    });
    await category.save();
    broadcast('categories', { resource: 'categories' });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/categories/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const update = {
      ...req.body,
      slug: req.body.slug ? slugify(req.body.slug) : req.body.name ? slugify(req.body.name) : undefined
    };
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    broadcast('categories', { resource: 'categories' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    broadcast('categories', { resource: 'categories' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
