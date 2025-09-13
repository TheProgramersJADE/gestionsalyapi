const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicios.controller');

router.get('/', controller.index);           // Listar todos
router.get('/:id', controller.show);         // Obtener uno
router.post('/', controller.store);          // Crear
router.put('/:id', controller.update);       // Actualizar
router.delete('/:id', controller.destroy);   // Eliminar

module.exports = router;