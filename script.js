// ============================
// WAIT FOR DOM TO LOAD
// ============================
document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // NAV TOGGLE
    // ============================
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // CLOSE MENU ON LINK CLICK
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // ============================
    // SCROLL ANIMATION
    // ============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // ============================
    // LIGHTBOX (FIXED PROPERLY)
    // ============================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close-lightbox");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (lightbox && lightboxImg && closeBtn && portfolioItems.length > 0) {

        portfolioItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add("show");
                }
            });
        });

        // CLOSE BUTTON
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("show");
        });

        // CLOSE ON BACKGROUND CLICK
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
            }
        });
    }

});

// SMOOTH SCROLL OFFSET (FEELS PREMIUM)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});