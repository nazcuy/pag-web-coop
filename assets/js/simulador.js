
        const productos = [
            { id: 1, nombre: "Laptop Reciclada", precio: 3499.99 },
            { id: 2, nombre: "Smartphone Reacondicionado", precio: 1999.00 },
            { id: 3, nombre: "Tablet Recuperada", precio: 1259.99 },
            { id: 4, nombre: "Kit Herramientas", precio: 4559.99 },
            { id: 5, nombre: "Curso Reparación", precio: 8969.99 }
        ];
        
        let carrito = [];
        const COSTO_ENVIO = 5999.99;
        const inicio = document.getElementById('inicio');
        const mostrar = document.getElementById('mostrar');
        const finalizar = document.getElementById('fin');
        
        function ingresarDatos() {
            console.log("=== ESTÁS INICIANDO UNA COMPRA ===");
            console.log("*** Productos disponibles ***");
            for (let i = 0; i < productos.length; i++) {
                const producto = productos[i]
                console.log(`ID: ${producto.id}: ${producto.nombre} - $${producto.precio}`);
            };
            
            const idProducto = prompt("Ingresá el ID del producto que querés comprar:");
            if (idProducto === null) {
                console.log("Cancelaste la operación.");
                return;
            }

            const id = parseInt(idProducto);
            if (!Number.isInteger(id) || id < 1 || id > productos.length) {
                alert("ID inválido. Debe ser un número entre 1 y " + productos.length);
                console.error("Ingresaste un ID inválido:", idProducto);
                return;
            }
            
            let producto = null;
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id === id) {
                    producto = productos[i];
                    break;
                }
            }
            if (producto === null) {
                alert("No existe un producto con ese ID.")
            }

            const cantidad = prompt(`¿Cuántas unidades de "${producto.nombre}" querés comprar?`);
            if (cantidad === null) {
                console.log("Cancelaste la operación");
                return;
            }
            
            const cantidadNum = parseInt(cantidad);
            if (!Number.isInteger(cantidadNum) || cantidadNum <= 0) {
                alert("Cantidad inválida. Debe ser un número mayor a cero.");
                console.error("Ingresaste una cantidad inválida:", cantidad);
                return;
            }
            
            carrito.push({
                producto: producto,
                cantidad: cantidadNum
            });
            
            console.log(`Producto agregado: ${cantidadNum} x ${producto.nombre}`);
            const continuar = confirm("¿Querés agregar otro producto al carrito?");
            if (continuar) {
                ingresarDatos();
            } else {
                console.log("Estás finalizando el ingreso de productos");
            }
        }
        

        function calcularTotales() {
            console.log("=== CALCULAR TOTALES ===");
            
            if (carrito.length === 0) {
                console.warn("Tu carrito está vacío. No hay nada que procesar.");
                return null;
            }
            
            let subtotal = 0;
            for (let i = 0; i < carrito.length; i++) {
                const item = carrito[i];
                subtotal += item.producto.precio * item.cantidad;
            }
            
            const total = subtotal + COSTO_ENVIO;
            const resultados = {
                subtotal: subtotal,
                envio: COSTO_ENVIO,
                total: total,
                productos: carrito.length
            };

            return resultados;
        }
        

        function mostrarResultados(resultados) {
            if (!resultados) {
                console.error("No tenés resultados para mostrar");
                return;
            }
            
            console.log("=== RESUMEN DE TU COMPRA ===");
            for (let i = 0; i < carrito.length; i++) {
                const item = carrito[i];
                const totalItem = item.producto.precio * item.cantidad;
                console.log(`${i + 1}. ${item.cantidad} x ${item.producto.nombre} - $${totalItem.toFixed(2)}`);
            };
            
            console.log("--------------------------------");
            console.log(`Subtotal: $${resultados.subtotal.toFixed(2)}`);
            console.log(`Envío: $${resultados.envio.toFixed(2)}`);
            console.log(`TOTAL: $${resultados.total.toFixed(2)}`);
            console.log("--------------------------------");
            console.log("¡Gracias por confiar en la coope!");
        }
        


        inicio.addEventListener('click', function() {
            console.clear();
            ingresarDatos();
        });
        
        mostrar.addEventListener('click', function() {
            console.clear();
            console.log("=== CONTENIDO DEL CARRITO ===");
            
            if (carrito.length === 0) {
                console.log("El carrito está vacío");
                return;
            }
            
            for (let i = 0; i < carrito.length; i++) {
                const item = carrito[i];
                console.log(`${i + 1}. ${item.cantidad} x ${item.producto.nombre}`);
            };
        });
        
        chequear.addEventListener('click', function() {
            console.clear();
            const resultados = calcularTotales();
            mostrarResultados(resultados);
        });