const mongoose = require('mongoose');

const completedOrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number,
    }
  ],
  totalAmount: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now,
  }
});

const CompletedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = CompletedOrder;
