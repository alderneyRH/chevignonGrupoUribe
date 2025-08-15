import { obtenerProductosAleatorios } from "../utils/utils.js";
import{ productos } from "../productos.js";
import { renderizarCatalogo } from "./renderCatalogo.js";
import { agregarAlCarrito } from "../cart.js";

// Función para mostrar el producto en la página individual
export function renderizarProducto() {
  const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

  if (producto) {
    // Mostrar información del producto
    document.getElementById("nombre").textContent = producto.nombre;
    document.getElementById("precio").textContent = "$" + producto.precio.toLocaleString();
    document.getElementById("imagen").src = producto.imagen;

    // Botón para agregar al carrito
    document.getElementById("btnAgregarCarrito").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

  } else {
    // Si no hay producto guardado, mostrar mensaje
    document.body.innerHTML = "<p>No se encontró el producto. Intenta volver a la tienda.</p>";
  }
}



/*  export function renderizarProducto() {
  const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

  if (producto) {
    document.getElementById("nombre").textContent = producto.nombre;
    document.getElementById("precio").textContent = "$" + producto.precio.toLocaleString();
    document.getElementById("imagen").src = producto.imagen;

    // Botón para agregar al carrito
    document.getElementById("btnAgregarCarrito").addEventListener("click", () => {
      agregarAlCarrito(producto);

    });
  } else {
  document.body.innerHTML = "<p>No se encontró el producto. Intenta volver a la tienda.</p>";
  }
}   */

/* export function renderizarProductoCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

  if (productosCarrito) {
    document.getElementById("nombre").textContent = productosCarrito.nombre;
    document.getElementById("precio").textContent = "$" + productosCarrito.precio.toLocaleString();
    document.getElementById("imagen").src = productosCarrito.imagen;

  } else {
  document.body.innerHTML = "<p>No se encontró el producto. Intenta volver a la tienda.</p>";
  } 
  
}*/

export function productosRecomendados () {
  const recomendados = obtenerProductosAleatorios(productos, 3); // 4 aleatorios
  renderizarCatalogo(recomendados, "productosRecomendados"); // ID del contenedor en HTML
}

 export function productosGustar() {
  const recomendados = obtenerProductosAleatorios(productos, 3); // 4 aleatorios
  renderizarCatalogo(recomendados, "productosGustar"); // ID del contenedor en HTML
} 
