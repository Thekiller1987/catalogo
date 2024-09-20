// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');

// Cargar los detalles del producto
async function cargarProducto() {
  const response = await fetch(`http://localhost:3001/productos/${idProducto}`);
  const producto = await response.json();

  document.getElementById('codigo').value = producto.codigo;
  document.getElementById('descripcion').value = producto.descripcion;
  document.getElementById('precio-venta').value = producto.precio_venta;
  document.getElementById('precio-mayorista').value = producto.precio_mayorista;
}

cargarProducto();

// Manejar la actualización del producto
document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value;
  const descripcion = document.getElementById('descripcion').value;
  const precioVenta = document.getElementById('precio-venta').value;
  const precioMayorista = document.getElementById('precio-mayorista').value;
  const imagen = document.getElementById('imagen').files[0];

  let imagenBase64 = null;
  if (imagen) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      imagenBase64 = reader.result.split(',')[1];
      await actualizarProducto(codigo, descripcion, precioVenta, precioMayorista, imagenBase64);
    };
    reader.readAsDataURL(imagen);
  } else {
    await actualizarProducto(codigo, descripcion, precioVenta, precioMayorista, null);
  }
});

async function actualizarProducto(codigo, descripcion, precioVenta, precioMayorista, imagenBase64) {
  const producto = {
    codigo,
    descripcion,
    precioVenta,
    precioMayorista,
    imagenBase64
  };

  const response = await fetch(`http://localhost:3001/productos/${idProducto}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });

  if (response.ok) {
    document.getElementById('success-message').style.display = 'block';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } else {
    alert('Error al actualizar el producto');
  }
}

// Recargar automáticamente cuando entras a la página
window.onload = cargarProducto;
