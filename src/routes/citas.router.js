const express = require('express');
const router = express.Router();
const controller = require('../controllers/citas.controller'); 
const { verifyToken, onlyCliente, onlyTrabajador, onlyAdmin } = require('../middlewares/auth');// Importa el middleware de autenticación

router.get('/', verifyToken, controller.index);
router.get('/',verifyToken, onlyAdmin, onlyTrabajador, onlyCliente, controller.index);       // Listar todas las citas
router.get('/:id',verifyToken, onlyTrabajador, onlyCliente, onlyAdmin, controller.show);     // Obtener una cita por ID
router.post('/',verifyToken, onlyAdmin, onlyCliente, controller.store);      // Crear una nueva cita
router.put('/:id',verifyToken, onlyAdmin, onlyTrabajador, onlyCliente, controller.update);   // Actualizar una cita
router.delete('/:id',verifyToken, onlyAdmin, onlyCliente, onlyTrabajador, controller.destroy); // Eliminar una cita

module.exports = router;