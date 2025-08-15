
 export function activarCarouseles() {
        document.querySelectorAll("[data-carousel]").forEach(carousel => {
        const track = carousel.querySelector("[data-track]");
        const btnPrev = carousel.querySelector("[data-prev]");
        const btnNext = carousel.querySelector("[data-next]");

        let index = 0; 
        const slides = track.children;
        const totalSlides = slides.length;

        function updateCarousel() {
            const slideWidth = carousel.clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        btnNext.addEventListener("click", () => {
            index = (index + 1) % totalSlides;
            updateCarousel();
        });

        btnPrev.addEventListener("click", () => {
            index = (index - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        window.addEventListener("resize", updateCarousel);
    });
    }
