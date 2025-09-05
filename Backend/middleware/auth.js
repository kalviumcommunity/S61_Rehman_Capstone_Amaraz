const auth = (req, res, next) => {
  try {
<<<<<<< HEAD
    const authHeader = req.headers.authorization;
    console.log('🔍 Auth Header:', authHeader); 
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided!' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    console.log('🔍 Extracted Token:', token); 
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔍 Decoded Token:', decoded); 
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Auth Error:', err.message);
    res.status(401).json({ message: 'Authentication failed!' });
=======
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
>>>>>>> bbfcb15 (fixed bugs and added new features)
  }
};
module.exports = auth;
