const { pool } = require('./mysql');

const store = async ({ nombre_servicio, descripcion, duracion, precio }) => {
  const sql = `
    INSERT INTO servicios (nombre_servicio, descripcion, duracion, precio)
    VALUES (?, ?, ?, ?)
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [nombre_servicio, descripcion, duracion, precio]);
    return { id: result.insertId };
  } finally {
    conn.release();
  }
};

const findAll = async (page = 1, limit = 10) => {
  const conn = await pool.getConnection();
  try {
    const offset = (page - 1) * limit;

    // Consulta con LIMIT y OFFSET
    const [rows] = await conn.query('SELECT * FROM servicios LIMIT ? OFFSET ?', [limit, offset]);

    // Obtener el total de registros
    const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM servicios');

    const totalPages = Math.ceil(total / limit);

    // Retornar la información con metadatos de paginación
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

const findById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM servicios WHERE id_servicio = ?', [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

const update = async (id, data) => {
  const sql = `
    UPDATE servicios
    SET nombre_servicio = ?, descripcion = ?, duracion = ?, precio = ?
    WHERE id_servicio = ?
  `;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(sql, [
      data.nombre_servicio,
      data.descripcion,
      data.duracion,
      data.precio,
      id,
    ]);
    return result;
  } finally {
    conn.release();
  }
};

const remove = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute('DELETE FROM servicios WHERE id_servicio = ?', [id]);
    return result;
  } finally {
    conn.release();
  }
};

module.exports = { store, findAll, findById, update, remove };