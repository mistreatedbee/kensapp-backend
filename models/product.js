const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: String,
  images: [String],
  categoryId: String,
  categoryName: String,
  stock: Number,
  isActive: { type: Boolean, default: true },
  discountPrice: Number,
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
