const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos en Railway
const db = mysql.createConnection({
  host: 'junction.proxy.rlwy.net', // Cambiar por el host de tu base de datos en Railway
  user: 'root', // El usuario de tu base de datos, en este caso, 'root'
  password: 'sLLJbGObdfZJkDfvsAhXHaPbOUWbFerH', // Cambia esta línea con tu contraseña de Railway
  database: 'railway', // La base de datos que estás usando
  port: 55111, // El puerto de Railway
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos de Railway');
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Ruta para crear un producto
app.post('/productos', (req, res) => {
  const { codigo, descripcion, precio_venta, precio_mayorista, imagen_base64 } = req.body;
  const query = 'INSERT INTO productos (codigo, descripcion, precio_venta, precio_mayorista, imagen_base64) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [codigo, descripcion, precio_venta, precio_mayorista, imagen_base64], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Producto creado correctamente', id: result.insertId });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
