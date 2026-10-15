const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ message: 'Auth error: no token provided' });
    }

    const decoded = jwt.verify(token, config.get('secretKey'));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error: invalid token' });
  }
};