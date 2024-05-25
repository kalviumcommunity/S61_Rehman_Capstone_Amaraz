const express = require('express');
const router = express.Router();
const InventoryItem = require('./model/inventorySchema');

// GET
router.get('/', async (req, res) => {
  try {
      const items = await InventoryItem.find();
      res.json(items);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

//POST
router.post('/post',async (req, res) => {
  try {
    const newInventoryItem = await InventoryItem.insertMany(req.body);
    res.json(newInventoryItem);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
})

//UPDATE
router.put('/update/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(itemId, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//DELETE
router.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).send("Item is unavailable");
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;