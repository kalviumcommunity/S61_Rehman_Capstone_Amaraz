const express = require('express');
const InventoryItem = require('./model/inventorySchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findOne({ _id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/post', async (req, res) => {
  try {
    const { name, quantity, purchasedPrice, price, supplier } = req.body;

    const newInventoryItem = new InventoryItem({
      name,
      quantity,
      purchasedPrice,
      price,
      supplier
    });

    await newInventoryItem.save();
    res.json(newInventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity, purchasedPrice, price, supplier } = req.body;

  try {
    const updatedFields = { name, quantity, purchasedPrice, price, supplier };

    const updatedItem = await InventoryItem.findOneAndUpdate(
      { _id: itemId },
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

router.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await InventoryItem.findOneAndDelete({ _id: itemId });
    if (!deletedItem) {
      return res.status(404).send("Item is unavailable");
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;