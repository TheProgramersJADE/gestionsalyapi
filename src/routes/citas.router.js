const express = require('express');
const router = express.Router();
const controller = require('../controllers/citas.controller'); 
const { verifyToken, onlyCliente } = require('../middlewares/auth');// Importa el middleware de autenticación

router.get('/', controller.index);
router.get('/', controller.index);       // Listar todas las citas
router.get('/:id', controller.show);     // Obtener una cita por ID
router.post('/',verifyToken, onlyCliente, controller.store);      // Crear una nueva cita 
router.put('/:id', controller.update);   // Actualizar una cita
router.delete('/:id', controller.destroy); // Eliminar una cita

module.exports = router;