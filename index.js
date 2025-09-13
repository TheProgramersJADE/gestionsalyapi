const express = require('express');
const path = require('path');
require('dotenv').config();
const serviciosRoutes = require('./src/routes/servicios.router');
const { pool } = require('./src/models/mysql'); // ajusta la ruta si es necesario

require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.json()); // ← Para recibir JSON
app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs');

// Rutas de vistas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({ msg: 'GESTION DE SALY ' });
});

// Rutas de servicios (CRUD)
app.use('/servicios', serviciosRoutes);


app.get('/test-db', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT 1 + 1 AS resultado');
    conn.release();
    res.send(`✅ Resultado de prueba: ${rows[0].resultado}`);
  } catch (err) {
    console.error('❌ Error en conexión o consulta:', err.message);
    res.status(500).send('Error al conectar con la base de datos');
  }
});

app.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});