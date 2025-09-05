const express = require('express');
const Order = require('./model/orderSchema');
const InventoryItem = require('./model/inventorySchema');
const orderValidation = require('./model/orderValidation');
const auth = require('./middleware/auth');

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  const { error } = orderValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { items } = req.body;

  try {
    // Check inventory availability and update quantity
    for (let item of items) {
      const product = await InventoryItem.findById(item.product);
      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product?.name || 'an item'}` });
      }

      // Reduce inventory
      product.quantity -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      items,
      userId: req.user.userId,
      status: 'pending'
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (pending + completed)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark an order as completed
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'completed' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
