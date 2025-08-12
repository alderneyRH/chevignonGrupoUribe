import { addToCart } from "/js/cart.js";

export function renderizarProducto() {
  const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

  if (producto) {
    document.getElementById("nombre").textContent = producto.nombre;
    document.getElementById("precio").textContent = "$" + producto.precio.toLocaleString();
    document.getElementById("imagen").src = producto.imagen;

    // Botón "Agregar al carrito"
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar a la bolsa";
    botonAgregar.className = "bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-800";

    botonAgregar.addEventListener("click", () => {
      addToCart({ ...producto, cantidad: 1 });
      showToast("Producto agregado a la bolsa 🛍️");
    });

    const contenedor = document.getElementById("detalle-producto") || document.body;
    contenedor.appendChild(botonAgregar);

  } else {
    document.body.innerHTML = "<p>No se encontró el producto. Intenta volver a la tienda.</p>";
  }
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
