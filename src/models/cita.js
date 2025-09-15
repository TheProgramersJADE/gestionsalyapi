const { pool } = require('./mysql');

// Crear una nueva cita
const storeCita = async ({ nombre_cliente, telefono_cliente, fecha_hora, nombre_trabajador, id_servicio }) => {
  const sql = `
    INSERT INTO citas (nombre_cliente, telefono_cliente, fecha_hora, nombre_trabajador, id_servicio)
    VALUES (?, ?, ?, ?, ?)
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [nombre_cliente, telefono_cliente, fecha_hora, nombre_trabajador, id_servicio]);
    return { id: result.insertId };
  } finally {
    conn.release();
  }
};

// Obtener todas las citas
const findAllCitas = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM citas');
    return rows;
  } finally {
    conn.release();
  }
};

// Obtener una cita por su ID
const findCitaById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM citas WHERE id_cita = ?', [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

// Actualizar una cita
const updateCita = async (id, data) => {
  const sql = `
    UPDATE citas
    SET nombre_cliente = ?, telefono_cliente = ?, fecha_hora = ?, nombre_trabajador = ?, id_servicio = ?
    WHERE id_cita = ?
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [
      data.nombre_cliente,
      data.telefono_cliente,
      data.fecha_hora,
      data.nombre_trabajador,
      data.id_servicio,
      id,
    ]);
    return result;
  } finally {
    conn.release();
  }
};

// Eliminar una cita
const removeCita = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute('DELETE FROM citas WHERE id_cita = ?', [id]);
    return result;
  } finally {
    conn.release();
  }
};

async function findByCita(id_servicio) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM servicios WHERE id_servicio = ?',
    [id_servicio]
  );
  conn.release();
  return rows;
}

module.exports = { storeCita, findAllCitas, findCitaById, updateCita, removeCita, findByCita };