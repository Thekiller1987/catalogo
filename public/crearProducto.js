document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const codigo = document.getElementById('codigo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precioVenta = document.getElementById('precio-venta').value;
    const precioMayorista = document.getElementById('precio-mayorista').value;
    const imagen = document.getElementById('imagen').files[0];
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imagenBase64 = reader.result.split(',')[1];
  
      const producto = {
        codigo,
        descripcion,
        precioVenta,
        precioMayorista,
        imagenBase64
      };
  
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
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
        alert('Error al agregar el producto');
      }
    };
  
    reader.readAsDataURL(imagen);
  });
  