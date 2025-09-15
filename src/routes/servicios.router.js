const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicios.controller');
const { verifyToken, onlyAdmin } = require('../middlewares/auth');

// Público (cualquier cliente lo puede ver sin token)
router.get('/', controller.index);        // Listar todos
router.get('/:id', controller.show);      // Obtener uno

// Solo admin (requiere token y rol admin)
router.post('/', verifyToken, onlyAdmin, controller.store);       // Crear
router.put('/:id', verifyToken, onlyAdmin, controller.update);    // Actualizar
router.delete('/:id', verifyToken, onlyAdmin, controller.destroy); // Eliminar

module.exports = router;
