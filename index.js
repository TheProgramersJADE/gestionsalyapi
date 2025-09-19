const express = require('express');
const path = require('path');
require('dotenv').config();
const citasRoutes = require('./src/routes/citas.router');
const resennasRoutes = require('./src/routes/resennas.router');
const serviciosRoutes = require('./src/routes/servicios.router');
const servicioTrabajadorRoutes = require('./src/routes/servicioTrabajador.router');
const { pool } = require('./src/models/mysql'); 

require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8081;

//Middleware para recibir JSON
app.use(express.json()); 
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

// Rutas de los CRUD
app.use('/servicios', serviciosRoutes);
app.use('/resennas', resennasRoutes);
app.use('/citas', citasRoutes);
app.use('/servicio-trabajador', servicioTrabajadorRoutes); 


// Par asaber si la coneccion a la base funciona
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

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});