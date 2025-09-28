const express = require('express');
const router = express.Router();
const controller = require('../controllers/citas.controller'); 
const { verifyToken, onlyCliente, onlyTrabajador, onlyAdmin } = require('../middlewares/auth');// Importa el middleware de autenticación

router.get('/', verifyToken, controller.index);
router.get('/',verifyToken, onlyAdmin, onlyTrabajador, controller.index);       // Listar todas las citas
router.get('/:id',verifyToken, onlyTrabajador, onlyAdmin, controller.show);     // Obtener una cita por ID
router.post('/',verifyToken, onlyCliente, controller.store);      // Crear una nueva cita
router.put('/:id',verifyToken, onlyAdmin, onlyTrabajador, controller.update);   // Actualizar una cita
router.delete('/:id',verifyToken, onlyAdmin, onlyTrabajador, controller.destroy); // Eliminar una cita

module.exports = router;