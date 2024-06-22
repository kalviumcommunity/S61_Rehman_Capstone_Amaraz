const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const auth = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('Email or username already registered');
    }
    res.status(400).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});

module.exports = router;
