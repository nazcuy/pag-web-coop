const ContenedorProductos = document.getElementById('ContenedorProductos');
const ContenedorItemsCarrito = document.getElementById('ContenedorItemsCarrito');
const seccionCarrito = document.getElementById('seccionCarrito');
const subtotalElement = document.getElementById('subtotal');
const costoEnvioElement = document.getElementById('costoEnvio');
const totalElement = document.getElementById('total');
const finalizarCompraBtn = document.getElementById('finalizarCompra');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
        
const productos = [
    { 
        id: 1, 
        nombre: "Laptop Reciclada", 
        precio: 3499.99, 
        descripcion: "Laptop reciclada con SO Windows 10 y procesador Intel Core i5-1035G1.", 
        imagen: "../assets/img/laptop.jpg" 
    },
    { 
        id: 2, 
        nombre: "Smartphone Reacondicionado", 
        precio: 2000.00, 
        descripcion: "Smartphone reciclado con SO Android 11.", 
        imagen: "../assets/img/smartphone.jpg" 
    },
    { 
        id: 3, 
        nombre: "Tablet Recuperada", 
        precio: 1300.00, 
        descripcion: "Tablet reciclada con SO Android 11.", 
        imagen: "../assets/img/tablet.jpg" 
    },
    { 
        id: 4, 
        nombre: "Celular Reciclado", 
        precio: 1899.99, 
        descripcion: "Celular reciclado con SO Android 10.", 
        imagen: "../assets/img/celular.jpg" 
    },
    { 
        id: 5, 
        nombre: "Kit Accesorios electrónicos", 
        precio: 4559.99, 
        descripcion: "Kit de accesorios electrónicos con 60 componentes de alta calidad para conectar y reparar dispositivos electrónicos.", 
        imagen: "../assets/img/kit.jpg" 
    },
    { 
        id: 6, 
        nombre: "Curso Reparación", 
        precio: 8969.99, 
        descripcion: "Curso de reparación de dispositivos electrónicos con 10 lecciones y 2 horas de contenido.", 
        imagen: "../assets/img/curso.jpg" 
    }
];
        
let carrito = [];
const COSTO_ENVIO = 5999.99;

function mostrarProductos() {
  ContenedorProductos.innerHTML = '';
  
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const columna = document.createElement('div');
    columna.className = 'col-md-6 col-lg-4 mb-4';
    
    columna.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text text-muted">${producto.descripcion}</p>
          <p class="card-text fw-bold">$${producto.precio.toFixed(2)}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="input-group" style="width: 120px">
              <button class="btn btn-outline-secondary decrementar" type="button" data-id="${producto.id}">-</button>
              <input type="text" class="form-control text-center" value="1" min="1" id="cantidad-${producto.id}">
              <button class="btn btn-outline-secondary incrementar" type="button" data-id="${producto.id}">+</button>
            </div>
            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">
              <i class="bi bi-cart-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `;
    
    ContenedorProductos.appendChild(columna);
  }
  
  document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
  });
  
  document.querySelectorAll('.incrementar').forEach(btn => {
    btn.addEventListener('click', incrementarCantidad);
  });
  
  document.querySelectorAll('.decrementar').forEach(btn => {
    btn.addEventListener('click', decrementarCantidad);
  });
}

function mostrarAlerta(titulo, mensaje, icono = 'success') {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
    confirmButtonText: 'Aceptar',
    customClass: {
      popup: 'alerta-cooperativa',
      confirmButton: 'btn-alerta-cooperativa'
    }
  });
}

function agregarAlCarrito(event) {
  const id = parseInt(event.target.dataset.id);
  const cantidadInput = document.getElementById(`cantidad-${id}`);
  const cantidad = parseInt(cantidadInput.value) || 1;
  const producto = productos.find(p => p.id === id);
  
  if (!producto) return;
  
  const itemExistente = carrito.find(item => item.id === id);
  
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad
    });
  }
  
  guardarCarrito();
  actualizarCarrito();
  
  seccionCarrito.classList.remove('d-none');
  cantidadInput.value = 1;
  mostrarAlerta(
    '¡Producto agregado!', 
    `Agregaste ${cantidad} ${producto.nombre} al carrito`,
    'success'
  );
}

function actualizarCarrito() {
  ContenedorItemsCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    ContenedorItemsCarrito.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
    seccionCarrito.classList.add('d-none');
    return;
  }
  
  let subtotal = 0;
  
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const totalItem = item.precio * item.cantidad;
    subtotal += totalItem;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'd-flex justify-content-between align-items-center border-bottom pb-2 mb-2';
    cartItem.innerHTML = `
      <div>
        <h6 class="mb-0">${item.nombre}</h6>
        <small class="text-muted">$${item.precio.toFixed(2)} c/u</small>
      </div>
      <div class="d-flex align-items-center">
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-secondary decrementar-carrito" data-id="${item.id}">-</button>
          <span class="px-2">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary incrementar-carrito" data-id="${item.id}">+</button>
        </div>
        <span class="ms-2 fw-bold">$${totalItem.toFixed(2)}</span>
        <button class="btn btn-sm btn-danger ms-2 eliminar-item" data-id="${item.id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    
    ContenedorItemsCarrito.appendChild(cartItem);
  }
  
  const total = subtotal + COSTO_ENVIO;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  costoEnvioElement.textContent = `$${COSTO_ENVIO.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
  
  document.querySelectorAll('.incrementar-carrito').forEach(btn => {
    btn.addEventListener('click', incrementarCantidadCarrito);
  });
  
  document.querySelectorAll('.decrementar-carrito').forEach(btn => {
    btn.addEventListener('click', decrementarCantidadCarrito);
  });
  
  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', eliminarDelCarrito);
  });
}

function incrementarCantidad(event) {
  const id = event.target.dataset.id;
  const input = document.getElementById(`cantidad-${id}`);
  input.value = parseInt(input.value) + 1;
}

function decrementarCantidad(event) {
  const id = event.target.dataset.id;
  const input = document.getElementById(`cantidad-${id}`);
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function incrementarCantidadCarrito(event) {
  const id = parseInt(event.target.dataset.id);
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad++;
    guardarCarrito();
    actualizarCarrito();
  }
}

function decrementarCantidadCarrito(event) {
  const id = parseInt(event.target.dataset.id);
  const item = carrito.find(item => item.id === id);
  if (item && item.cantidad > 1) {
    item.cantidad--;
    guardarCarrito();
    actualizarCarrito();
  }
}

function eliminarDelCarrito(event) {
  const boton = event.target.closest('.eliminar-item');
  if (!boton) return;
  const id = parseInt(boton.dataset.id);
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function finalizarCompra() {
  let subtotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    subtotal += carrito[i].precio * carrito[i].cantidad;
  }
  const total = subtotal + COSTO_ENVIO;
  mostrarAlerta(
    '¡Compra exitosa!', 
    `Gracias por confiar en la cooperativa!\n\nTotal: $${total.toFixed(2)}`,
    'success'
  );
  vaciarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
    if (carrito.length > 0) {
      seccionCarrito.classList.remove('d-none');
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  cargarCarrito();
  finalizarCompraBtn.addEventListener('click', finalizarCompra);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
});