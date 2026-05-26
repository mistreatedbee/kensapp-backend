const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  _id: { type: String, default: 'store_settings' },
  storeName: { type: String, default: 'Kens App' },
  logo: { type: String, default: '/logo.svg' },
  whatsappNumber: { type: String, default: '073 204 7642' },
  phoneNumber: { type: String, default: '073 204 7642' },
  email: { type: String, default: 'hello@kensapp.com' },
  address: String,
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  deliveryInfo: String,
  footerText: String,
  currency: { type: String, default: 'R' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
