const express = require('express');
const router = express.Router();
const controller = require('../controllers/resennas.controller');

router.get('/', controller.index);       // Listar todas las reseñas
router.get('/:id', controller.show);     // Obtener una reseña por ID
router.post('/', controller.store);      // Crear una nueva reseña
router.put('/:id', controller.update);   // Actualizar una reseña
router.delete('/:id', controller.destroy); // Eliminar una reseña

module.exports = router;