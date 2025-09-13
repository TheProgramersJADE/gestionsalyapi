const model = require('../models/servicio');

exports.index = async (req, res) => {
  const servicios = await model.findAll();
  res.json(servicios);
};

exports.show = async (req, res) => {
  const servicio = await model.findById(req.params.id);
  if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
  res.json(servicio);
};

exports.store = async (req, res) => {
  try {
    const result = await model.store(req.body);
    res.status(201).json({ message: 'Servicio creado', id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await model.update(req.params.id, req.body);
    res.json({ message: 'Servicio actualizado', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    await model.remove(req.params.id);
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};