const express = require('express');
const router = express.Router();
const controller = require('../controllers/citas.controller');

router.get('/', controller.index);       // Listar todas las citas
router.get('/:id', controller.show);     // Obtener una cita por ID
router.post('/', controller.store);      // Crear una nueva cita
router.put('/:id', controller.update);   // Actualizar una cita
router.delete('/:id', controller.destroy); // Eliminar una cita

module.exports = router;