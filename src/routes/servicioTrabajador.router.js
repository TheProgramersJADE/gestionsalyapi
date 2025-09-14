const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicioTrabajador.controller');

router.get('/', controller.index);              // GET todos
router.get('/:id', controller.show);            // GET uno por ID
router.post('/', controller.store);             // POST crear
router.put('/:id', controller.update);          // PUT actualizar
router.delete('/:id', controller.destroy);      // DELETE eliminar


module.exports = router;
