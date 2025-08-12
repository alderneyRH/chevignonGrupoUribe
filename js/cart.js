 // Carrito deslizante
document.addEventListener("DOMContentLoaded", () => {
 
  const botonCarrito = document.getElementById("botonCarrito");
  const carritoPanel = document.getElementById("carritoPanel");

  botonCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    carritoPanel.classList.toggle("visible");
    carritoPanel.classList.toggle("oculto");

    if (carritoPanel.innerHTML.trim() === "") {
      fetch("cart.html")
        .then((response) => response.text())
        .then((html) => {
          carritoPanel.innerHTML = html;

          // Cerrar carrito
          const cerrarCarrito = document.getElementById("cerrarCarrito");
          if (cerrarCarrito) {
            cerrarCarrito.addEventListener("click", () => {
              carritoPanel.classList.remove("visible");
              carritoPanel.classList.add("oculto");
            });
          }
        })
        .catch((err) => {
          carritoPanel.innerHTML = "<p>Error al cargar el carrito.</p>";
          console.error("Error cargando el carrito:", err);
        });
    }
  });

  // Cerrar el carrito al hacer clic fuera
  document.addEventListener("click", (e) => {
    const clicFuera =
      !carritoPanel.contains(e.target) && !botonCarrito.contains(e.target);
    if (carritoPanel.classList.contains("visible") && clicFuera) {
      carritoPanel.classList.remove("visible");
      carritoPanel.classList.add("oculto");
    }
  });

});

// === js/cart.js ===
const CART_KEY = "carritoChevignon";

// Obtener carrito
export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Guardar carrito
export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

// Agregar producto
export function addToCart(product) {
    const cart = getCart();
    const index = cart.findIndex(p => p.id === product.id);

    if (index >= 0) {
        cart[index].cantidad += product.cantidad;
    } else {
        cart.push(product);
    }
    saveCart(cart);

    // 🔹 Si el carrito lateral ya está abierto, renderizamos de inmediato
    const cartContainer = document.querySelector("#cart-items");
    if (cartContainer) {
        renderCart("#cart-items");
    }
}

// Eliminar producto
export function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
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

    container.innerHTML = cart.map(item => {
        subtotal += item.precio * item.cantidad;
        return `
            <div class="flex gap-4 items-center border-b py-2" data-id="${item.id}">
                <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h3 class="text-sm font-semibold">${item.nombre}</h3>
                    <p class="text-xs text-gray-500">Precio: $${parseFloat(item.precio).toLocaleString()}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <button class="px-2 border menos" data-id="${item.id}">−</button>
                        <span>${item.cantidad}</span>
                        <button class="px-2 border mas" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="text-red-500 text-sm remove-item" data-id="${item.id}">🗑️</button>
            </div>
        `;
    }).join("");

    // Eventos cantidad y eliminar
    container.querySelectorAll(".menos").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const cart = getCart();
            const item = cart.find(p => p.id === id);
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

    container.querySelectorAll(".mas").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const cart = getCart();
            const item = cart.find(p => p.id === id);
            if (item) item.cantidad++;
            saveCart(cart);
            renderCart(containerSelector);
        });
    });

    container.querySelectorAll(".remove-item").forEach(btn => {
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

// Inicializar contador al cargar
document.addEventListener("DOMContentLoaded", updateCartCounter);

// Escuchar evento global para actualizar carrito lateral
document.addEventListener("cartUpdated", () => {
    const cartContainer = document.querySelector("#cart-items");
    if (cartContainer) {
        renderCart("#cart-items");
    }
});

 


