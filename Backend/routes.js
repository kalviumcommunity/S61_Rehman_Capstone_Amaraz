const express = require('express');
const InventoryItem = require('./model/inventorySchema');
const auth = require('./middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const items = await InventoryItem.find({ userId: req.user.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const item = await InventoryItem.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/post', auth, async (req, res) => {
  try {
    const { name, quantity, purchasedPrice, price, supplier } = req.body;

    const newInventoryItem = new InventoryItem({
      name,
      quantity,
      purchasedPrice,
      price,
      supplier,
      userId: req.user.userId
    });

    await newInventoryItem.save();
    res.json(newInventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update/:id', auth, async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity, purchasedPrice, price, supplier, pendingQuantity, status } = req.body;

  try {
    const updatedFields = { name, quantity, purchasedPrice, price, supplier, pendingQuantity, status };

    const updatedItem = await InventoryItem.findOneAndUpdate(
      { _id: itemId, userId: req.user.userId },
      updatedFields,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await InventoryItem.findOneAndDelete({ 
      _id: itemId, userId: req.user.userId });
    if (!deletedItem) {
      return res.status(404).send("Item is unavailable");
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
