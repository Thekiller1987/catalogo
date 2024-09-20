async function cargarProductos() {
  const response = await fetch('http://localhost:3001/productos');
  const productos = await response.json();

  const productosList = document.getElementById('product-list');
  productosList.innerHTML = '';

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('product-card');

    productoDiv.innerHTML = `
      <div class="producto-detalles">
        <h3>${producto.codigo}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio de Venta: ${producto.precio_venta}</p>
        <p>Precio Mayorista: ${producto.precio_mayorista}</p>
      </div>
      <div class="producto-imagen">
        <img src="data:image/png;base64,${producto.imagen_base64}" alt="${producto.descripcion}">
      </div>
      <button onclick="editarProducto('${producto.id}')" class="edit-link">Editar</button>
    `;

    productosList.appendChild(productoDiv);
  });
}

// Función de búsqueda
document.getElementById('search').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const codigo = card.querySelector('h3').textContent.toLowerCase();
    const descripcion = card.querySelector('p').textContent.toLowerCase();

    if (codigo.includes(searchTerm) || descripcion.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Función para redirigir a la vista de editar producto
function editarProducto(id) {
  window.location.href = `editar-producto-form.html?id=${id}`;
}

// Recargar automáticamente cuando entras a la página
window.onload = cargarProductos;
