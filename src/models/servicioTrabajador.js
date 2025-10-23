const { pool } = require('./mysql');

// Crear un registro
async function store(data) {
  const conn = await pool.getConnection();
  const result = await conn.query('INSERT INTO servicios_trabajador (id_servicio, id_trabajador) VALUES (?, ?)', [data.id_servicio, data.id_trabajador]);
  conn.release();
  return result;
}

// Obtener todos
async function findAll(page = 1, limit = 10) {
  const conn = await pool.getConnection();
  try {
    const offset = (page - 1) * limit;

    // Consulta paginada
    const [rows] = await conn.query(
      'SELECT * FROM servicios_trabajador LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // Total de registros
    const [[{ total }]] = await conn.query(
      'SELECT COUNT(*) AS total FROM servicios_trabajador'
    );

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
}

// ✅ También agregamos paginación a la función por trabajador
async function findByTrabajador(id_trabajador, page = 1, limit = 10) {
  const conn = await pool.getConnection();
  try {
    const offset = (page - 1) * limit;

    const [rows] = await conn.query(
      'SELECT * FROM servicios_trabajador WHERE id_trabajador = ? LIMIT ? OFFSET ?',
      [id_trabajador, limit, offset]
    );

    const [[{ total }]] = await conn.query(
      'SELECT COUNT(*) AS total FROM servicios_trabajador WHERE id_trabajador = ?',
      [id_trabajador]
    );

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
}

// Obtener por ID
async function findById(id) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query('SELECT * FROM servicios_trabajador WHERE id = ?', [id]);
  conn.release();
  return rows[0];
}

// Actualizar
async function update(id, data) {
  const conn = await pool.getConnection();
  const result = await conn.query('UPDATE servicios_trabajador SET id_servicio = ?, id_trabajador = ? WHERE id = ?', [data.id_servicio, data.id_trabajador, id]);
  conn.release();
  return result;
}

// Eliminar
async function remove(id) {
  const conn = await pool.getConnection();
  const result = await conn.query('DELETE FROM servicios_trabajador WHERE id = ?', [id]);
  conn.release();
  return result;
}

async function findByTrabajador(id_trabajador) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM servicios_trabajador WHERE id_trabajador = ?',
    [id_trabajador]
  );
  conn.release();
  return rows;
}


module.exports = { store, findAll, findById, update, remove, findByTrabajador };
