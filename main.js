document.addEventListener('DOMContentLoaded', () => {
    // === Carousel Functionality ===
    const carousel = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentSlide = 0;

    function updateCarousel() {
        if (slides.length === 0) return;

        const slideWidth = carousel.querySelector('.carousel-slide').offsetWidth +
                            parseFloat(getComputedStyle(carousel.querySelector('.carousel-slide')).marginRight) +
                            parseFloat(getComputedStyle(carousel.querySelector('.carousel-slide')).marginLeft);

        carousel.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateCarousel();
        });
    }

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // === Mobile Menu Functionality ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // === Contact Form Functionality ===
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Oculta el mensaje de éxito al cargar la página
    if (successMessage) {
        successMessage.classList.remove('show');
    }

    if (form && successMessage) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const url = form.action;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    
                    // Muestra el mensaje de éxito y lo anima
                    successMessage.classList.add('show');
                    
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000); // 5 segundos
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Oops! Hubo un problema al enviar tu formulario.');
                    }
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error de red. Intenta de nuevo.');
            }
        });
    }
});