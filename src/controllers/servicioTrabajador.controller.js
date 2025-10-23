const model = require('../models/servicioTrabajador');

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let registros;

    if (req.user.role_id === 2) {
      // Solo trabajador: muestra sus registros paginados
      registros = await model.findByTrabajador(req.user.id, page, limit);
    } else {
      // Admin: ve todos los registros paginados
      registros = await model.findAll(page, limit);
    }

    res.json(registros);
  } catch (error) {
    console.error('Error al listar los servicios_trabajador:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};
  
  exports.show = async (req, res) => {
    const registro = await model.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  };
  
  exports.store = async (req, res) => {
    const { id_servicio } = req.body;
    const id_trabajador = req.user.id; // viene del token
  
    // Validación de campos obligatorios
    const camposFaltantes = {};
    if (!id_servicio) camposFaltantes.id_servicio = 'requerido';
    if (!id_trabajador) camposFaltantes.id_trabajador = 'requerido'
    
    if (Object.keys(camposFaltantes).length > 0) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios',
        camposFaltantes
      });
    }

    try {
      const data = { id_servicio, id_trabajador }; // reutilizamos las variables
      const result = await model.store(data);
      res.status(201).json({ message: 'Servicio asignado', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  

  exports.update = async (req, res) => {
    const { id_servicio, id_trabajador } = req.body;

    // Validación de campos obligatorios
    const camposFaltantes = {};
    if (!id_servicio) camposFaltantes.id_servicio = 'requerido';
    if (!id_trabajador) camposFaltantes.id_trabajador = 'requerido';

  
    if (Object.keys(camposFaltantes).length > 0) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios',
        camposFaltantes
      });
    }
    try {
      const result = await model.update(req.params.id, req.body);
      res.json({ message: 'Registro actualizado', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.destroy = async (req, res) => {
    try {
      await model.remove(req.params.id);
      res.json({ message: 'Registro eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };