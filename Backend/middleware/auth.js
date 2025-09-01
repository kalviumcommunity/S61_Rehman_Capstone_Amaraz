const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
    const token = bearer || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Authentication failed!' });
    }

    req.user = { userId: decoded.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }
};

module.exports = auth;
