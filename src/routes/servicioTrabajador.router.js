const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicioTrabajador.controller');
const { verifyToken, onlyTrabajador, onlyAdmin } = require('../middlewares/auth');

//Admin y trabajador pueden ver
router.get('/', verifyToken, controller.index);                      //GET Admin ve Todos, Trabajador solo los suyos
router.get('/:id', verifyToken, controller.show);                    //GET unoo por uno

//Solo trabajador puede asignarse un servicio
router.post('/', verifyToken, onlyTrabajador, controller.store);      //POST para crear nuevo resgitro en la tabla de servicio_Trabajador.

//Solo admin puede actualizar y eliminar
router.put('/:id', verifyToken, onlyAdmin, controller.update);        //PUT para actualizar un regsitro en la tabla de servicio_Trabajador. 
router.delete('/:id', verifyToken, onlyAdmin, controller.destroy);    //DELETE para eliminar un regsitro en la tabla de servicio_Trabajador.


module.exports = router;
