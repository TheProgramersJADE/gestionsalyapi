const model = require('../models/cita');

exports.index = async (req, res) => {
  const citas = await model.findAllCitas();
  res.json(citas);
};

exports.show = async (req, res) => {
  const cita = await model.findCitaById(req.params.id);
  if (!cita) {
    return res.status(404).json({ error: 'Cita no encontrada' });
  }
  res.json(cita);
};

exports.store = async (req, res) => {
  try {
    const result = await model.storeCita(req.body);
    res.status(201).json({ message: 'Cita creada', id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await model.updateCita(req.params.id, req.body);
    res.json({ message: 'Cita actualizada', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    await model.removeCita(req.params.id);
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};