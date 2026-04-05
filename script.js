document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING SCREEN LOGIC ---
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Wait 800 milliseconds so the user sees the logo
        setTimeout(() => {
            // Fade out
            loadingScreen.classList.add('opacity-0');
            
            // Wait 1 second for fade to finish, then hide completely
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                loadingScreen.classList.remove('flex');
            }, 1000);
            
        }, 800);
    });

    // --- COMPACT DROPDOWN MENU LOGIC ---
    const menuBtn = document.getElementById('menuToggleBtn');
    const compactMenu = document.getElementById('compactMenu');
    const lines = menuBtn.querySelectorAll('span');
    const menuLinks = compactMenu.querySelectorAll('.menu-link');

    let isMenuOpen = false;

    // Function to close the menu
    const closeMenu = () => {
        if (!isMenuOpen) return; // Prevent running if already closed
        isMenuOpen = false; // Officially mark as closed
        
        // Fade out and slide up
        compactMenu.classList.remove('opacity-100', 'translate-y-0');
        compactMenu.classList.add('opacity-0', '-translate-y-4');
        
        setTimeout(() => {
            compactMenu.classList.add('hidden');
            compactMenu.classList.remove('flex', 'flex-col'); 
        }, 300); 
        
        // Animate 'X' back to 3 lines
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    };

    // Toggle menu open/close when clicking the button
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        if (!isMenuOpen) {
            isMenuOpen = true; // Officially mark as open
            
            // Show the dropdown
            compactMenu.classList.remove('hidden');
            compactMenu.classList.add('flex', 'flex-col'); 
            
            setTimeout(() => {
                compactMenu.classList.remove('opacity-0', '-translate-y-4');
                compactMenu.classList.add('opacity-100', 'translate-y-0');
            }, 10);
            
            // Animate 3 lines into an 'X'
            lines[0].style.transform = 'translateY(7px) rotate(45deg)';
            lines[1].style.opacity = '0'; 
            lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            // If it's already open, run the close function!
            closeMenu();
        }
    });

    // Close menu automatically when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking anywhere OUTSIDE the menu
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !compactMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
    
    // --- UTILITIES ---
    // Auto-update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // FIXED BUG: Add shadow to the new sticky header instead of the deleted mainNav
    const mainHeader = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('shadow-md');
        } else {
            mainHeader.classList.remove('shadow-md');
        }
    });

    // --- SCROLL REVEAL OBSERVER ---
    // This watches elements and adds the 'is-visible' class when they appear on screen
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the image is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop watching once it has animated so it doesn't repeat constantly
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Grab all elements with slide classes and start watching them
    document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(el => {
        scrollObserver.observe(el);
    });
});