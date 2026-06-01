const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  _id: { type: String, default: 'store_settings' },
  storeName: { type: String, default: 'Kenmok CC' },
  logo: { type: String, default: '/logo2.jpg' },
  tagline: { type: String, default: 'Clean spaces. Fresh impressions. Reliable service.' },
  description: { type: String, default: 'Kenmok CC supplies cleaning products, fragrances and pest control services for homes and businesses.' },
  contactPerson: String,
  whatsappNumber: { type: String, default: '073 204 7642' },
  phoneNumber: { type: String, default: '073 204 7642' },
  email: { type: String, default: 'info@kenmok.co.za' },
  websiteUrl: String,
  address: String,
  operatingHours: { type: String, default: 'Monday to Friday, 08:00 - 17:00' },
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    tiktok: String
  },
  deliveryInfo: String,
  collectionInfo: String,
  footerText: String,
  aboutInfo: String,
  additionalInfo: String,
  currency: { type: String, default: 'R' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
