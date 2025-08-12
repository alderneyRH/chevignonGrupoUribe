import { productos } from "./productos.js";
import { renderizarCatalogo } from "./render/renderCatalogo.js";
import { productosGustar, productosRecomendados } from "./render/renderRecomendados.js";
import { renderizarProducto } from "./render/renderProductoIndividual.js";
import { updateCartCounter, renderCart, getCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  
  // 📌 Mostrar productos en la página de catálogo
  if (window.location.pathname.includes("productos.html")) {
    renderizarCatalogo(productos, "catalogo");
  }

  if (window.location.pathname.includes("cart.html")) {
    getCart();
  }

  // 📌 Mostrar producto individual
  if (window.location.pathname.includes("producto-pagina.html")) {
    productosRecomendados();
    productosGustar();
    renderizarProducto();
  }

  // 📌 Si estamos en la página del carrito lateral o carrito.html
  if (document.querySelector("#cart-items")) {
    renderCart("#cart-items");
  }
  

  // 📌 Menú móvil
  const menuBtn = document.getElementById("boton-menu");
  const mobileMenu = document.getElementById("menu-celular");
  if (menuBtn && mobileMenu) {
    mobileMenu.classList.add("hidden", "lg:flex");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 📌 Actualizar contador al iniciar
  updateCartCounter();

  // 📌 Escuchar cuando el carrito cambie
  document.addEventListener("cartUpdated", () => {
    updateCartCounter();
    if (document.querySelector("#cart-items")) {
      renderCart("#cart-items");
    }
  });
});

// transicion suavea en fondo de cabecera principal
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero-section");

  const fondos = [
    "/assets/images/vaquero.jpg",
    "/assets/images/vaquera.jpg",
    "/assets/images/cuero.jpg",
  ];

  let indice = 0;

  setInterval(() => {
    indice = (indice + 1) % fondos.length;

    // Fade suave sin desaparecer contenido
    hero.style.opacity = 0.8;

    setTimeout(() => {
      hero.style.backgroundImage = `url('${fondos[indice]}')`;
      hero.style.opacity = 1;
    }, 200); // pequeño delay para que el fade sea fluido
  }, 6000); // cambia cada 5 segundos
});