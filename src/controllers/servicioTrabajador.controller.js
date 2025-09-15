const model = require('../models/servicioTrabajador');

exports.index = async (req, res) => {
    try {
      let registros;
  
      if (req.user.role_id === 2) {
        // Solo trabajador: mostramos sus registros
        registros = await model.findByTrabajador(req.user.id);
      } else {
        // Admin: ve todos
        registros = await model.findAll();
      }
  
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.show = async (req, res) => {
    const registro = await model.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  };
  
  exports.store = async (req, res) => {
    try {
      const data = {
        id_servicio: req.body.id_servicio,
        id_trabajador: req.user.id   // <- esto viene del token
      };
      const result = await model.store(data);
      res.status(201).json({ message: 'Servicio asignado', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  

  exports.update = async (req, res) => {
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