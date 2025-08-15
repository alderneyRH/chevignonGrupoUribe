/* import { productos } from "./productos";
import { renderizarProductoCarrito } from "./render/renderProductoIndividual.js"; */

export function contenedorCarrito() {
  const carritoPanel = document.getElementById("carritoPanel");
  const botonCarrito = document.getElementById("botonCarrito");
  const menuBtn = document.getElementById("boton-menu");
  const mobileMenu = document.getElementById("menu-celular");

  if (!carritoPanel || !botonCarrito) {
    console.warn("No se encontró el contenedor del carrito o el botón.");
    return;
  }

  // Inserta HTML del carrito solo una vez
  carritoPanel.innerHTML = `
    <section class="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 shadow-lg flex flex-col">
      <!-- Encabezado -->
      <div class="flex justify-between items-center p-4 border-b">
        <div class="flex items-center gap-2 font-medium text-base">
          <span class="text-xl">
            <img src="https://chevignon.vtexassets.com/assets/vtex.file-manager-graphql/images/4ed64a5a-7b89-40af-b31c-d85a1fa51334___7d5edaf384c76655da436c7883e31b32.svg" class="w-12 h-12" />
          </span>
          Mi bolsa
        </div>
        <button class="text-xl" id="cerrarCarrito">✖️</button>
      </div>

      <div id="cart-items" class="p-4 flex flex-col gap-4 flex-grow overflow-y-auto"></div>

      <div class="border-t p-4 text-sm">
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span id="subtotalCarrito">$0</span>
        </div>
        <div class="flex justify-between font-bold text-base mb-1">
          <span>Total</span>
          <span id="totalCarrito">$0</span>
        </div>
        <p class="text-[11px] text-gray-500 mb-4">Tasas y fletes calculados en el carrito</p>
        <a href="/checkout.html">
          <button class="w-full bg-black text-white py-3 font-semibold text-sm hover:bg-gray-800">Ir al checkout</button>
        </a>
      </div>
    </section>
  `;

  // Oculta el carrito inicialmente
  carritoPanel.classList.add("hidden");

  // Evento abrir/cerrar con el botón del carrito
  botonCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    carritoPanel.classList.toggle("hidden");
  });

  // Evento cerrar con botón ✖️
  const cerrarCarritoBtn = carritoPanel.querySelector("#cerrarCarrito");
  cerrarCarritoBtn.addEventListener("click", () => {
    carritoPanel.classList.add("hidden");
  });

  // Evento cerrar al hacer clic fuera
  document.addEventListener("click", (e) => {
    const clicFuera = !carritoPanel.contains(e.target) && !botonCarrito.contains(e.target);
    if (!carritoPanel.classList.contains("hidden") && clicFuera) {
      carritoPanel.classList.add("hidden");
    }
  });

  // Opcional: manejar menú móvil
  if (menuBtn && mobileMenu) {
    mobileMenu.classList.add("hidden", "lg:flex");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

export function almacenamientoCarrito () {
/* const itemCarrrito = document.createElement("div"); */

tarjeta.querySelector(".btn-add-to-cart").addEventListener("click", () => {
      localStorage.setItem("productosCarrito", JSON.stringify(producto)) || [];
    
    }); 
}

