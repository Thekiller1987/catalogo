const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configurar la carpeta de archivos estáticos
app.use(express.static('public'));

// Conexión con la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '1987', 
  database: 'catalogo'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
  const { codigo, descripcion, precioVenta, precioMayorista, imagenBase64 } = req.body;
  const sql = 'INSERT INTO productos (codigo, descripcion, precio_venta, precio_mayorista, imagen_base64) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [codigo, descripcion, precioVenta, precioMayorista, imagenBase64], (err, result) => {
    if (err) throw err;
    res.send('Producto agregado correctamente');
  });
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM productos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Producto eliminado correctamente');
  });
});

// Ruta para editar un producto
app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  const { codigo, descripcion, precioVenta, precioMayorista, imagenBase64 } = req.body;
  const sql = 'UPDATE productos SET codigo = ?, descripcion = ?, precio_venta = ?, precio_mayorista = ?, imagen_base64 = ? WHERE id = ?';
  db.query(sql, [codigo, descripcion, precioVenta, precioMayorista, imagenBase64, id], (err, result) => {
    if (err) throw err;
    res.send('Producto actualizado correctamente');
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
