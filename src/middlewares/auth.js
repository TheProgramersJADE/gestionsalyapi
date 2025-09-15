// src/middlewares/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

// Verifica que el token sea válido
exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token requerido' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // aquí tienes { id, username, role_id }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Solo admin
exports.onlyAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ error: 'Acceso solo para admin' });
  }
  next();
};

// Solo trabajador
exports.onlyTrabajador = (req, res, next) => {
  if (req.user.role_id !== 2) {
    return res.status(403).json({ error: 'Acceso solo para trabajadores' });
  }
  next();
};
