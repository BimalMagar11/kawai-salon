document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loadingScreen');
            loader.classList.add('opacity-0');
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 800);
    });

    // 2. Sticky Header
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky-active');
        } else {
            header.classList.remove('sticky-active');
        }
    });

    // 3. Menu Toggle
    const menuBtn = document.getElementById('menuToggleBtn');
    const menu = document.getElementById('compactMenu');
    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
        menu.classList.toggle('translate-x-full');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-fade, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();
});