const model = require('../models/resenna');
const modelServicio = require('../models/servicio'); // Importar el modelo de servicios

exports.store = async (req, res) => {
    try {
        const { nombre_cliente, nombre_trabajador, calificacion, comentario, id_servicio } = req.body;

        // 1. Validar que el servicio existe
        const servicio = await modelServicio.findById(id_servicio);
        if (!servicio) {
            return res.status(404).json({ error: 'El servicio con el ID proporcionado no existe.' });
        }

        // 3. Crear el objeto de datos para el modelo
        const resenaData = {
            nombre_cliente,
            nombre_trabajador,
            calificacion,
            comentario,
            id_servicio
        };
        
        const result = await modelResena.storeResena(resenaData);
        res.status(201).json({ message: 'Reseña creada', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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