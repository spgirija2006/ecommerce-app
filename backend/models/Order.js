const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: Number,
    price: Number
  }],
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, default: 'COD' },
  shippingAddress: String,
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);