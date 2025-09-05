const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    console.log('Auth headers:', req.headers.authorization);
    const token = req.headers.authorization.replace('Bearer ', '');
    console.log('Token to verify:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Authentication failed near verification !' });
  }
};

module.exports = auth;
