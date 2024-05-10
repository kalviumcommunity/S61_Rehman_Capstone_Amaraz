const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'))

router.post('/post', (req, res) => {
  res.send(req.body)
})
router.put('/update/:id', (req, res) => {
    const inventoryId = req.params.id;
    const updateData = req.body;
    res.send(updateData);
});

module.exports = router;