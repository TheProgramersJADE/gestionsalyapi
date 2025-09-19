const express = require('express');
const router = express.Router();
const controller = require('../controllers/citas.controller'); 
const { verifyToken, onlyCliente, onlyTrabajador, onlyAdmin } = require('../middlewares/auth');// Importa el middleware de autenticación

router.get('/',verifyToken, onlyAdmin, controller.index);       // Listar todas las citas
router.get('/:id',verifyToken, onlyAdmin, controller.show);     // Obtener una cita por ID
router.post('/',verifyToken, onlyAdmin, onlyCliente, controller.store);      // Crear una nueva cita
router.put('/:id',verifyToken, onlyTrabajador, controller.update);   // Actualizar una cita
router.delete('/:id',verifyToken, onlyCliente, controller.destroy); // Eliminar una cita

module.exports = router;