const express = require('express');
const router = express.Router();
const controller = require('../controllers/resennas.controller');
const { verifyToken, onlyCliente, onlyTrabajador, onlyAdmin } = require('../middlewares/auth');// Importa el middleware de autenticación

router.get('/',verifyToken, onlyAdmin, controller.index);       // Listar todas las reseñas
router.get('/:id',verifyToken, onlyAdmin, controller.show);     // Obtener una reseña por ID
router.post('/',verifyToken, onlyCliente, controller.store);      // Crear una nueva reseña
router.put('/:id',verifyToken, onlyAdmin, controller.update);   // Actualizar una reseña
router.delete('/:id',verifyToken, onlyAdmin, controller.destroy); // Eliminar una reseña

module.exports = router;