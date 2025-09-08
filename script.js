document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el envío por defecto del formulario

        const formData = new FormData(form);
        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Importante para Formspree
                }
            });

            if (response.ok) {
                // Si el envío fue exitoso, muestra el mensaje de éxito
                form.reset(); // Limpia el formulario
                successMessage.classList.add('show'); // Añade la clase para mostrar y animar

                // Opcional: Ocultar el mensaje después de unos segundos
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000); // El mensaje se ocultará después de 5 segundos
            } else {
                // Si hubo un error en el envío
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
});