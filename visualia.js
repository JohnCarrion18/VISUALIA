/* Prevenir que el navegador recuerde la posición del scroll al recargar la página */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Forzar scroll al inicio
window.scrollTo(0, 0);

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Cambiar la apariencia del header al hacer scroll
    const header = document.querySelector(".cabecera");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.padding = "15px 0";
            header.style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.9)";
            header.style.padding = "20px 0";
            header.style.boxShadow = "none";
        }
    });

    // Configuración del Intersection Observer para las animaciones al hacer scroll
    const observerOptions = {
        root: null,         // usar el viewport como contenedor
        rootMargin: '0px', 
        threshold: 0.25      // disparar la animación cuando el 25% del elemento sea visible
    };

    // Función que se ejecuta cuando el elemento intersecta con el viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está en la pantalla
            if (entry.isIntersecting) {
                // Añadir la clase que dispara la transición CSS
                entry.target.classList.add('visible');
            } else {
                // Removemos la clase para que la animación se repita cuando scrolleas arriba y abajo
                entry.target.classList.remove('visible'); 
            }
        });
    };

    // Crear el observador
    const animObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Seleccionar todos los elementos a animar y observarlos
    const animElements = document.querySelectorAll('.anim-scroll');
    animElements.forEach(el => animObserver.observe(el));

    // Desplazamiento suave para todos los enlaces internos (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
