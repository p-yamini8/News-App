const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
      if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed', error: err.message });
  }
};
