import { addToCart } from "/js/cart.js";

export function renderizarCatalogo(productos, contenedorId = "catalogo") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add(
      "card-producto", "p-4", "rounded", "shadow", "bg-white", "flex", "flex-col", "items-start"
    );

    tarjeta.innerHTML = `
      <div class="w-64 h-72 overflow-hidden rounded-lg">
        <img class="w-full h-full object-cover" src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <h3 class="mt-2 font-semibold">${producto.nombre}</h3>
      <span class="block text-lg font-bold text-black">$${producto.precio.toLocaleString()}</span>
      <div class="mt-2 flex gap-2">
        <button class="btn-ver-mas bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">Ver más</button>
        <button 
          class="btn-add-to-cart bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          data-id="${producto.id}"
          data-nombre="${producto.nombre}"
          data-precio="${producto.precio}"
          data-imagen="${producto.imagen}"
        >
          Agregar
        </button>
      </div>
    `;

    // Botón Ver más → guarda producto y redirige
    tarjeta.querySelector(".btn-ver-mas").addEventListener("click", () => {
      localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
      window.location.href = "producto-pagina.html";
    });

    // Botón Agregar → usa lógica central del carrito
    tarjeta.querySelector(".btn-add-to-cart").addEventListener("click", () => {
      addToCart({ ...producto, cantidad: 1 });
      showToast("Producto agregado a la bolsa 🛍️");
    });

    contenedor.appendChild(tarjeta);
  });
}

// ==== Toast reutilizable ====
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      background: black; color: white;
      padding: 12px 20px; border-radius: 8px;
      opacity: 0; pointer-events: none;
      transform: translateY(20px);
      transition: all 0.3s ease-in-out;
      z-index: 9999;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 2000);
}




