const express = require('express');
const CompletedOrder = require('./model/completedOrder');
const InventoryItem = require('./model/inventorySchema');
const auth = require('./middleware/auth');

const router = express.Router();

router.get('/overview-stats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Completed Orders & Profit Calculation
    const completedOrders = await CompletedOrder.find({ userId });
    let totalRevenue = 0;
    let totalCost = 0;

    for (let order of completedOrders) {
      for (let item of order.items) {
        totalRevenue += item.price * item.quantity;

        const inventoryItem = await InventoryItem.findOne({ userId, name: item.name });
        const costPrice = inventoryItem?.purchasedPrice || item.price * 0.7;
        totalCost += costPrice * item.quantity;
      }
    }

    // Inventory Info
    const inventoryItems = await InventoryItem.find({ userId });
    const inventoryCount = inventoryItems.length;
    let inventoryCost = 0;

    inventoryItems.forEach(item => {
      const cost = item.purchasedPrice || item.price * 0.7;
      inventoryCost += cost * item.quantity;
    });

    res.json({
      profit: totalRevenue - totalCost,
      totalOrders: completedOrders.length,
      inventoryCount,
      inventoryCost,
    });
  } catch (error) {
    console.error("Overview stats error:", error);
    res.status(500).json({ message: 'Failed to load overview stats.' });
  }
});

module.exports = router;
