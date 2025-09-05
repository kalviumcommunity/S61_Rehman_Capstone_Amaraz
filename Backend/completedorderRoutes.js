const express = require('express');
const CompletedOrder = require('./model/completedOrder');
const InventoryItem = require('./model/inventorySchema');
const auth = require('./middleware/auth');

const router = express.Router();

router.get('/completed-orders', auth, async (req, res) => {
  try {
    const completedOrders = await CompletedOrder.find({ userId: req.user.userId }).sort({ completedAt: -1 });
    res.json(completedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch completed orders.' });
  }
});

router.post('/complete-orders', auth, async (req, res) => {
    try {
      const userId = req.user.userId;
      const pendingItems = await InventoryItem.find({ userId, status: 'pending' });
  
      if (pendingItems.length === 0) {
        return res.status(400).json({ message: 'No pending items to complete.' });
      }
  
      let totalAmount = 0;
  
      // Prepare items to be stored in CompletedOrder before modifying them
      const completedItems = pendingItems.map(item => {
        const subtotal = item.price * item.pendingQuantity;
        totalAmount += subtotal;
        return {
          name: item.name,
          price: item.price,
          quantity: item.pendingQuantity, // store actual quantity before resetting
          subtotal: subtotal
        };
      });
  
      // Save completed order first
      const completedOrder = new CompletedOrder({
        items: completedItems,
        totalAmount,
        userId
      });
  
      await completedOrder.save();
  
      // Now update inventory
      for (let item of pendingItems) {
        item.quantity -= item.pendingQuantity;
        item.status = 'completed';
        item.pendingQuantity = 0;
        await item.save();
      }
  
      res.status(200).json({ message: 'Order completed successfully.' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  

module.exports = router;
