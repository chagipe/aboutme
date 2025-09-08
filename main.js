document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentSlide = 0;

    function updateCarousel() {
        if (slides.length === 0) return; // Evitar errores si no hay slides

        // Calcular el ancho de un slide, incluyendo el margen si lo hubiera (en este caso, 0)
        // Ya que cada slide ocupa el 100% del contenedor visible
        const slideWidth = carousel.querySelector('.carousel-slide').offsetWidth +
                           parseFloat(getComputedStyle(carousel.querySelector('.carousel-slide')).marginRight) +
                           parseFloat(getComputedStyle(carousel.querySelector('.carousel-slide')).marginLeft);

        carousel.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }

    // Funciones para los botones del carrusel
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        updateCarousel();
    });

    // Ajustar el carrusel al redimensionar la ventana para que los slides siempre encajen
    window.addEventListener('resize', updateCarousel);

    // Inicializar el carrusel al cargar la página
    updateCarousel();

    // --- Funcionalidad del menú de navegación móvil (opcional) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Necesitarías añadir estilos para .nav-links.active en CSS
        });

        // Opcional: Cerrar menú si se hace clic fuera o en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});