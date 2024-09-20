const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para manejar datos en formato JSON

// Configura la conexión a la base de datos de InfinityFree
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'sql206.infinityfree.com',  // Host de InfinityFree
  user: process.env.DB_USER || 'if0_37347238',             // Usuario de la base de datos
  password: process.env.DB_PASSWORD || 'Soldadofoxy10', // Contraseña del panel de control de InfinityFree
  database: process.env.DB_NAME || 'if0_37347238_catalogo' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL en InfinityFree');
});

// Rutas

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo productos:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un producto
app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, precio_venta, precio_mayorista, imagen } = req.body;
  const query = 'INSERT INTO productos (nombre, descripcion, precio_venta, precio_mayorista, imagen) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, precio_venta, precio_mayorista, imagen], (err, result) => {
    if (err) {
      console.error('Error agregando producto:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json({ id: result.insertId, ...req.body });
    }
  });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error eliminando producto:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Ruta para editar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio_venta, precio_mayorista, imagen } = req.body;
  const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio_venta = ?, precio_mayorista = ?, imagen = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, precio_venta, precio_mayorista, imagen, id], (err, result) => {
    if (err) {
      console.error('Error actualizando producto:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.sendStatus(200);
    }
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
