// Efecto de opacidad en el hero al hacer scroll (similar a useScroll + useTransform)
(function () {
    const hero = document.getElementById("hero");

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight || 1;
        const progress = Math.min(scrollY / (0.2 * viewportHeight), 1); // 0 → 1
        const opacity = 1 - 0.2 * progress; // 1 → 0.8
        hero.style.opacity = opacity.toString();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
})();

// IntersectionObserver para las animaciones "whileInView"
(function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Solo animar una vez, como viewport={{ once: true }}
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((el, idx) => {
        // Pequeño retraso incremental opcional
        el.style.transitionDelay = `${idx * 0.05}s`;
        observer.observe(el);
    });
})();
