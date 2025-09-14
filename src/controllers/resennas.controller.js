const model = require('../models/resenna');

exports.index = async (req, res) => {
  const resennas = await model.findAllResenas();
  res.json(resennas);
};

exports.show = async (req, res) => {
  const resenna = await model.findResenaById(req.params.id);
  if (!resenna) {
    return res.status(404).json({ error: 'Reseña no encontrada' });
  }
  res.json(resenna);
};

exports.store = async (req, res) => {
  try {
    const result = await model.storeResena(req.body);
    res.status(201).json({ message: 'Reseña creada', id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await model.updateResena(req.params.id, req.body);
    res.json({ message: 'Reseña actualizada', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    await model.removeResena(req.params.id);
    res.json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};