const express = require('express');
const router = express.Router();
const Settings = require('../models/settings');
const auth = require('../middleware/auth');

const DEFAULT_SETTINGS = {
  _id: 'store_settings',
  storeName: 'Kens App',
  logo: '/logo.svg',
  whatsappNumber: '073 204 7642',
  phoneNumber: '073 204 7642',
  email: 'hello@kensapp.com',
  address: '123 Design Avenue, Creative District',
  currency: 'R',
  deliveryInfo: 'Free delivery on orders over R150. Standard delivery takes 3-5 business days.',
  footerText: '',
  socialLinks: {}
};

// GET /api/settings — public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findById('store_settings');
    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — protected (admin)
router.put('/', auth, async (req, res) => {
  try {
    const { _id, id, __v, ...updateData } = req.body;
    const settings = await Settings.findByIdAndUpdate(
      'store_settings',
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
