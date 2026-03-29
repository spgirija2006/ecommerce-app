const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, default: 'General' },
  emoji: { type: String, default: '🛒' },
  stock: { type: Number, default: 10 },
  likes: [{ type: String }],
  reviews: [{
    userName: String,
    comment: String,
    rating: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);