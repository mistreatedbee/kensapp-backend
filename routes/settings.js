const express = require('express');
const router = express.Router();
const Settings = require('../models/settings');
const auth = require('../middleware/auth');
const { broadcast } = require('../lib/events');

const DEFAULT_SETTINGS = {
  _id: 'store_settings',
  storeName: 'Kenmok CC',
  logo: '/logo.svg',
  tagline: 'Clean spaces. Fresh impressions. Reliable service.',
  description: 'Kenmok CC supplies cleaning products, fragrances and pest control services for homes and businesses.',
  contactPerson: '',
  whatsappNumber: '073 204 7642',
  phoneNumber: '073 204 7642',
  email: 'info@kenmok.co.za',
  websiteUrl: '',
  address: 'South Africa',
  operatingHours: 'Monday to Friday, 08:00 - 17:00',
  currency: 'R',
  deliveryInfo: 'Delivery and collection available by arrangement.',
  collectionInfo: 'Collection available by prior arrangement.',
  footerText: '© 2026 Kenmok CC. All rights reserved.',
  aboutInfo: 'Kenmok CC helps homes and businesses maintain cleaner, fresher and safer spaces.',
  additionalInfo: '',
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
    broadcast('settings', { resource: 'settings' });
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
