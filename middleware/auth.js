const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUser');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token || !process.env.JWT_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(payload.sub);
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
