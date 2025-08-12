document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // If scrolled more than 50px
            navbar.style.background = 'rgba(52, 58, 64, 1)'; // Solid background
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(52, 58, 64, 0.95)'; // Semi-transparent
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- 3. Scroll Reveal Animations ---
    // Using Intersection Observer for better performance

    // Observer for fade-in elements (like in the home section)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slightly offset from bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target); // Stop observing once it's shown
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Observer for other scroll-reveal elements
    const sliders = document.querySelectorAll('.scroll-reveal');
    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });
    
    // Staggered animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.querySelector('#about');
    
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the skills section is visible
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    // Add a delay for each item to create a staggered effect
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100); // 100ms delay between each item
                });
                skillsObserver.unobserve(skillsSection); // Stop observing
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);

});
