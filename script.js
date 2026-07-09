// ============================
// COSTECH DIGITAL LAB — MODERN SAAS JS
// ============================

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // SUCCESS MESSAGE BANNER
    // ============================
    function showSuccessBanner(message) {
        const existing = document.querySelector('.success-banner');
        if (existing) existing.remove();

        const banner = document.createElement('div');
        banner.className = 'success-banner';
        banner.innerHTML = `
            <div class="success-banner-inner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${message}</span>
                <button class="success-close" onclick="this.closest('.success-banner').remove()">×</button>
            </div>
        `;
        document.body.appendChild(banner);

        setTimeout(() => {
            if (banner.parentElement) banner.remove();
        }, 6000);
    }

    // ============================
    // NAV TOGGLE
    // ============================
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // ============================
    // NAVBAR SCROLL EFFECT
    // ============================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ============================
    // SCROLL ANIMATION (IntersectionObserver)
    // ============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // ============================
    // SMOOTH SCROLL WITH OFFSET
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================
    // TYPEWRITER EFFECT
    // ============================
    const texts = [
        "Transforming ideas into innovation.",
        "We build digital products that grow businesses.",
        "Websites. Apps. Branding. Motion.",
        "We don't just design — we create impact."
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedText = document.getElementById("typed-text");

    function typeEffect() {
        if (!typedText) return;
        const currentText = texts[index];

        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex--);
        } else {
            typedText.textContent = currentText.substring(0, charIndex++);
        }

        let speed = isDeleting ? 35 : 65;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // ============================
    // SCROLL PROGRESS BAR
    // ============================
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const height = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }
    });

    // ============================
    // ANIMATED COUNTERS
    // ============================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.target);
                const duration = 2000;
                const start = performance.now();
                const isPercentage = entry.target.closest('.stat-item').querySelector('.stat-label').textContent.includes('%');

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    entry.target.textContent = current + (isPercentage ? '' : '+');

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target + (isPercentage ? '' : '+');
                    }
                }
                requestAnimationFrame(updateCounter);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ============================
    // LIGHTBOX
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
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("show");
            document.body.style.overflow = '';
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                lightbox.classList.remove("show");
                document.body.style.overflow = '';
            }
        });
    }

    // ============================
    // PARALLAX GLOW EFFECT
    // ============================
    const heroGlow1 = document.querySelector('.hero-glow-1');
    const heroGlow2 = document.querySelector('.hero-glow-2');

    if (heroGlow1 && heroGlow2 && !window.matchMedia('(pointer: coarse)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroGlow1.style.transform = `translate(${x}px, ${y}px)`;
            heroGlow2.style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }

    // ============================
    // CONTACT FORM → FORMSPREE (AJAX)
    // ============================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/xojooejp', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    showSuccessBanner('Message sent successfully! We will get back to you shortly.');
                } else {
                    showSuccessBanner('Something went wrong. Please try again or reach us on WhatsApp.');
                }
            } catch (error) {
                showSuccessBanner('Something went wrong. Please try again or reach us on WhatsApp.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

});