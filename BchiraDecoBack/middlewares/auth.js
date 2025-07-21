const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ msg: 'Token invalide' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ msg: 'Accès admin requis' });
  next();
};
