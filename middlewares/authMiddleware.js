const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?req.header('Authorization'):'';
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized',tag:false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized',tag:false });
  }
};

module.exports = authMiddleware;