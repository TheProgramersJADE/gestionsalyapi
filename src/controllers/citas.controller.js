const model = require('../models/cita');
const modelServicio = require('../models/servicio'); // Importa el modelo de servicios

exports.store = async (req, res) => {
    try {
        const { id_servicio, nombre_trabajador, fecha_hora, nombre_cliente, telefono_cliente } = req.body;
        
        // 1. Validar que el servicio existe
        const servicio = await modelServicio.findById(id_servicio);
        if (!servicio) {
            return res.status(404).json({ error: 'El servicio con el ID proporcionado no existe.' });
        }
        
        // 3. Obtener el ID del cliente desde el token
        const id_cliente = req.user.id;

        // 4. Crear el objeto de datos con los IDs
        const data = {
            nombre_cliente,
            telefono_cliente,
            fecha_hora,
            nombre_trabajador, 
            id_servicio,
            id_cliente
        };

        const result = await modelCita.storeCita(data);
        res.status(201).json({ message: 'Cita creada exitosamente', id: result.id });

    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear la cita.' });
    }
};

// ... el resto de tu código de controlador

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