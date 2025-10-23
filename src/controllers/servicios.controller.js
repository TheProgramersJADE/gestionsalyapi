const model = require('../models/servicio');

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const servicios = await model.findAll(page, limit);
    res.json(servicios);
  } catch (error) {
    console.error('Error al listar los servicios:', error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

exports.show = async (req, res) => {
  const servicio = await model.findById(req.params.id);
  if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
  res.json(servicio);
};

exports.store = async (req, res) => {
  const { nombre_servicio, descripcion, duracion, precio } = req.body; 
  const camposFaltantes = {};
  if (!nombre_servicio) camposFaltantes.nombre_servicio = 'requerido';
  if (!descripcion ) camposFaltantes.descripcion = 'requerido';
  if (!duracion) camposFaltantes.duracion = 'requerido';
  if (!precio) camposFaltantes.precio = 'requerido';

  if (Object.keys(camposFaltantes).length > 0) {
    return res.status(400).json({ 
      error: 'Faltan campos obligatorios', 
      camposFaltantes 
    });
  }
  try {
    const result = await model.store(req.body);
    res.status(201).json({ message: 'Servicio creado', id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { nombre_servicio, descripcion, duracion, precio } = req.body;
  const camposFaltantes = {};
  if (!nombre_servicio) camposFaltantes.nombre_servicio = 'requerido';
  if (!descripcion) camposFaltantes.descripcion = 'requerido';
  if (!duracion) camposFaltantes.duracion = 'requerido';
  if (!precio) camposFaltantes.precio = 'requerido';

  if (Object.keys(camposFaltantes).length > 0) {
    return res.status(400).json({ 
      error: 'Faltan campos obligatorios', 
      camposFaltantes 
    });
  }
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