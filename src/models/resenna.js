const { pool } = require('./mysql');


// Crear una nueva reseña
const storeResena = async ({ nombre_cliente, nombre_trabajador, calificacion, comentario, fecha }) => {
  const sql = `
    INSERT INTO resennas (nombre_cliente, nombre_trabajador, calificacion, comentario, fecha)
    VALUES (?, ?, ?, ?, ?)
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [nombre_cliente, nombre_trabajador, calificacion, comentario, fecha]);
    return { id: result.insertId };
  } finally {
    conn.release();
  }
};


// Obtener todas las reseñas con paginación
const findAllResenas = async (page = 1, limit = 10) => {
  const conn = await pool.getConnection();
  try {
    const offset = (page - 1) * limit;

    // Consulta principal (limit + offset)
    const [rows] = await conn.query('SELECT * FROM resennas LIMIT ? OFFSET ?', [limit, offset]);

    // Consulta para obtener el total de registros
    const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM resennas');

    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      data: rows
    };
  } finally {
    conn.release();
  }
};

module.exports = {
  findAllResenas,
  // ... otras funciones si las tienes (findResenaById, storeResena, etc.)
};

// Obtener una reseña por su ID
const findResenaById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM resennas WHERE id_resena = ?', [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

// Actualizar una reseña
const updateResena = async (id, data) => {
  const sql = `
    UPDATE resennas
    SET nombre_cliente = ?, nombre_trabajador = ?, calificacion = ?, comentario = ?, fecha = ?
    WHERE id_resena = ?
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [
      data.nombre_cliente,
      data.nombre_trabajador,
      data.calificacion,
      data.comentario,
      data.fecha,
      id,
    ]);
    return result;
  } finally {
    conn.release();
  }
};

// Eliminar una reseña
const removeResena = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute('DELETE FROM resennas WHERE id_resena = ?', [id]);
    return result;
  } finally {
    conn.release();
  }
};

async function findByResenna(id_servicio) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM servicios WHERE id_servicio = ?',
    [id_servicio]
  );
  conn.release();
  return rows;
}

module.exports = { storeResena, findAllResenas, findResenaById, updateResena, removeResena, findByResenna};