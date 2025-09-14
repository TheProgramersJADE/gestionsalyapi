const { pool } = require('./mysql');

// Crear un registro
async function store(data) {
  const conn = await pool.getConnection();
  const result = await conn.query('INSERT INTO servicios_trabajador (id_servicio, id_trabajador) VALUES (?, ?)', [data.id_servicio, data.id_trabajador]);
  conn.release();
  return result;
}

// Obtener todos
async function findAll() {
  const conn = await pool.getConnection();
  const [rows] = await conn.query('SELECT * FROM servicios_trabajador');
  conn.release();
  return rows;
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

module.exports = { store, findAll, findById, update, remove };
