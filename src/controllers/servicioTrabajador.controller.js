const model = require('../models/servicioTrabajador');

exports.index = async (req, res) => {
    const registros = await model.findAll();
    res.json(registros);
  };
  
  exports.show = async (req, res) => {
    const registro = await model.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  };
  
  exports.store = async (req, res) => {
    try {
      const result = await model.store(req.body);
      res.status(201).json({ message: 'Registro creado', id: result.insertId });
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