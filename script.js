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

// TYPEWRITER EFFECT
const texts = [
    "Transforming ideas into innovation.",
    "We build digital products that grow businesses.",
    "Websites. Apps. Branding. Motion.",
    "We don’t just design — we create impact."
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typedText = document.getElementById("typed-text");

function typeEffect() {
    if (!typedText) return;

    currentText = texts[index];

    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex--);
    } else {
        typedText.textContent = currentText.substring(0, charIndex++);
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 1500; // pause at full text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

// HOVER EFFECT
document.querySelectorAll("a, button, .card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

// SCROLL PROGRESS
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;

    document.body.style.setProperty('--scroll', progress + '%');
    document.body.querySelector("::before");
});