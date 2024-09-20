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
        </div>
        <div class="producto-imagen">
          <img src="data:image/png;base64,${producto.imagen_base64}" alt="${producto.descripcion}">
        </div>
        <button onclick="eliminarProducto('${producto.id}')" class="delete-link">Eliminar</button>
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
  
  // Función para eliminar un producto
  async function eliminarProducto(id) {
    const response = await fetch(`http://localhost:3001/productos/${id}`, { method: 'DELETE' });
  
    if (response.ok) {
      alert('Producto eliminado correctamente');
      cargarProductos(); // Recargar la lista de productos
    } else {
      alert('Error al eliminar el producto');
    }
  }
  
  // Recargar automáticamente cuando entras a la página
  window.onload = cargarProductos;
  