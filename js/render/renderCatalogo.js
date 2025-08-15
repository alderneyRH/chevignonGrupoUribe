import { agregarAlCarrito } from "../cart.js";

export function renderizarCatalogo(productos, contenedorId = "catalogo") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  productos.forEach((producto) => {
    // ← Este foreach SOLO crea las tarjetas
    const tarjeta = document.createElement("div");
    tarjeta.classList.add(
      "card-producto",
      "p-4",
      "rounded",
      "shadow",
      "bg-white",
      "flex",
      "flex-col",
      "items-start"
    );

    tarjeta.innerHTML = `
      <div class="contenedor-imagen-productos w-full h-72 overflow-hidden">
        <img class="w-full h-full object-cover" src="${producto.imagen}" alt="${
      producto.nombre
    }">
      </div>
      <h3 class="mt-2 font-semibold">${producto.nombre}</h3>
      <span class="block text-lg font-bold text-black">$${producto.precio.toLocaleString()}</span>
      <div class="mt-2 flex gap-2">
        <button class="btn-ver-mas bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">Ver más</button>
        <button 
          class="btn-add-to-cart bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          data-id="${producto.id}"
        >
          Agregar
        </button>
      </div>
    `;

    // Botón "Ver más" → guarda producto y redirige
    tarjeta.querySelector(".btn-ver-mas").addEventListener("click", () => {
      localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
      window.location.href = "producto-pagina.html";
    });
    tarjeta.querySelector(".btn-add-to-cart").addEventListener("click", () => {
      agregarAlCarrito(producto); // producto viene del render del catálogo
    });

    // Botón "Agregar" → guarda o actualiza en localStorage
    /* tarjeta.querySelector(".btn-add-to-cart").addEventListener("click", () => {
      let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

      const index = productosCarrito.findIndex(p => p.id === producto.id);
      
      if (index !== -1) {
        productosCarrito[index].cantidad += 1;
      } else {
        productosCarrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
        });
      }

      localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
      console.log("Carrito actualizado:", productosCarrito);
    }); */

    contenedor.appendChild(tarjeta);
  });
}
