const express = require('express');
const multer = require('multer');
const InventoryItem = require('./model/inventorySchema');
const auth = require('./middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

router.post('/post', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, quantity, purchasedPrice, price, supplier } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newInventoryItem = new InventoryItem({
      name,
      quantity,
      purchasedPrice,
      price,
      supplier,
      imageUrl,
      userId: req.user.userId
    });

    await newInventoryItem.save();
    res.json(newInventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update/:id', auth, upload.single('image'), async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity, purchasedPrice, price, supplier, pendingQuantity, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updatedFields = { name, quantity, purchasedPrice, price, supplier, pendingQuantity, status };
    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

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

router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send('File uploaded successfully');
});

module.exports = router;
