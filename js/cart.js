export function agregarAlCarrito(producto) {
  // Recuperar o inicializar arreglo del carrito
  let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

  // Buscar si ya existe el producto
  const index = productosCarrito.findIndex(p => p.id === producto.id);

  if (index !== -1) {
    // Ya existe → aumentar cantidad
    productosCarrito[index].cantidad += 1;
  } else {
    // No existe → agregarlo
    productosCarrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  // Guardar en localStorage
  localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));

  console.log("Carrito actualizado:", productosCarrito);
}












// carritoDeslizante.js
export function inicializarCarritoDeslizante() {
  const botonCarrito = document.getElementById("botonCarrito");
  const carritoPanel = document.getElementById("carritoPanel");
  const menuBtn = document.getElementById("boton-menu");
  const mobileMenu = document.getElementById("menu-celular");

  mobileMenu.classList.add("hidden");
  mobileMenu.classList.add("lg:flex");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
  if (!botonCarrito || !carritoPanel) {
    console.warn("No se encontró el botón o el panel del carrito.");
    return;
  }

  carritoPanel.classList.add("hidden");
  botonCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    carritoPanel.classList.toggle("hidden");
   

if (carritoPanel.innerHTML.trim() === "") {
      fetch("cart.html")
        .then((response) => response.text())
        .then((html) => {
          carritoPanel.innerHTML = html;

          // Cerrar carrito
          const cerrarCarrito = document.getElementById("cerrarCarrito");
          if (cerrarCarrito) {
            cerrarCarrito.addEventListener("click", () => {
              carritoPanel.classList.toggle("hidden");
            });
          }
        });
    }
  });

  // Cerrar al hacer clic fuera
  document.addEventListener("click", (e) => {
    const clicFuera =
      !carritoPanel.contains(e.target) && !botonCarrito.contains(e.target);
    if (!carritoPanel.classList.contains("hidden") && clicFuera) {
      carritoPanel.classList.add("hidden");
    }
  });
}

// === js/cart.js ===
const CART_KEY = "productosCarrito";

// Obtener carrito
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }

  // Agregar producto
export function addToCart(product) {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === product.id);

  if (index >= 0) {
    cart[index].cantidad += product.cantidad;
  } else {
    cart.push(product);
  }
  
/*   saveCart(cart);

  // 🔹 Si el carrito lateral ya está abierto, renderizamos de inmediato
  const cartContainer = document.querySelector("#cart-items");
  if (cartContainer) {
    renderCart("#cart-items");
  } */
}
  /* 
  
// Guardar carrito
export function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCounter();
  document.dispatchEvent(new CustomEvent("cartUpdated")); // 🔹 Notificar cambios globalmente
}

// Actualizar contador del carrito
export function updateCartCounter() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const counter = document.querySelector("#cart-count");
  if (counter) counter.textContent = count;
}



// Eliminar producto
export function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);

  const cartContainer = document.querySelector("#cart-items");
  if (cartContainer) {
    renderCart("#cart-items");
  }
}

// Renderizar carrito lateral
export function renderCart(containerSelector) {
  const cart = getCart();
  const container = document.querySelector(containerSelector);
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center py-4">Tu carrito está vacío</p>`;
    updateCartCounter();
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart
    .map((item) => {
      subtotal += item.precio * item.cantidad;
      return `
            <div class="flex gap-4 items-center border-b py-2" data-id="${
              item.id
            }">
                <img src="${item.imagen}" alt="${
        item.nombre
      }" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h3 class="text-sm font-semibold">${item.nombre}</h3>
                    <p class="text-xs text-gray-500">Precio: $${parseFloat(
                      item.precio
                    ).toLocaleString()}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <button class="px-2 border menos" data-id="${
                          item.id
                        }">−</button>
                        <span>${item.cantidad}</span>
                        <button class="px-2 border mas" data-id="${
                          item.id
                        }">+</button>
                    </div>
                </div>
                <button class="text-red-500 text-sm remove-item" data-id="${
                  item.id
                }">🗑️</button>
            </div>
        `;
    })
    .join("");

  // Eventos cantidad y eliminar
  container.querySelectorAll(".menos").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const cart = getCart();
      const item = cart.find((p) => p.id === id);
      if (item && item.cantidad > 1) {
        item.cantidad--;
      } else {
        removeFromCart(id);
        return;
      }
      saveCart(cart);
      renderCart(containerSelector);
    });
  });

  container.querySelectorAll(".mas").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const cart = getCart();
      const item = cart.find((p) => p.id === id);
      if (item) item.cantidad++;
      saveCart(cart);
      renderCart(containerSelector);
    });
  });

  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
    });
  });

  // Subtotal y total
  const subtotalElem = document.querySelector("#subtotalCarrito");
  const totalElem = document.querySelector("#totalCarrito");
  if (subtotalElem) subtotalElem.textContent = `$${subtotal.toLocaleString()}`;
  if (totalElem) totalElem.textContent = `$${subtotal.toLocaleString()}`;
}

*/
// ==== Toast reutilizable ====
export function showToast(message) {
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