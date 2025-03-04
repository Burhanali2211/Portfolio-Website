document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements for Hero Section
    const heroSection = document.querySelector('#home');
    const heroParticles = document.querySelector('.hero-particles');
    const heroProfile = document.querySelector('.hero-profile');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const primaryButton = document.querySelector('.primary-button');
    const secondaryButton = document.querySelector('.secondary-button');
    const orbitParticles = document.querySelectorAll('.orbit-particle');
    const floaters = document.querySelectorAll('.floater');

    // DOM Elements for Navbar
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const cursor = document.querySelector('.custom-cursor');
    const body = document.body;

    // DOM Elements for Services Section
    const servicesSection = document.querySelector('#services');
    const servicePods = document.querySelectorAll('.service-pod');

    // DOM Elements for Skills Section
    const skillsSection = document.querySelector('#skills');
    const skillOrbs = document.querySelectorAll('.skill-orb');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const xpValue = document.querySelector('.xp-value');
    const skillCursor = document.querySelector('.skill-cursor');
    const skillCursorText = skillCursor.querySelector('.cursor-text');
    const starfield = document.querySelector('.skills-starfield');

    // Responsive Check
    const isMobile = () => window.innerWidth <= 768;

    // Hero Section: Dynamic Particle Generator
    function createHeroParticles() {
        const particleCount = isMobile() ? 10 : 20; // Fewer particles on mobile
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.classList.add('dynamic-particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(89, 38, 239, ${Math.random() * 0.5 + 0.2})`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            heroParticles.appendChild(particle);
        }
    }

    // Hero Section: Mouse Interaction - Tilt Effect on Profile Image
    heroSection.addEventListener('mousemove', (e) => {
        if (isMobile()) return; // Disable tilt on mobile
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;

        heroProfile.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        if (isMobile()) return;
        heroProfile.style.transform = 'rotateY(20deg) rotateX(10deg)';
    });

    // Hero Section: Scroll-Based Animation Trigger
    function handleHeroScroll() {
        const scrollPos = window.scrollY;
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;

        if (scrollPos < sectionHeight) {
            const scaleFactor = 1 - scrollPos / (sectionHeight * 2);
            heroTitle.style.transform = `rotateX(10deg) scale(${Math.max(scaleFactor, isMobile() ? 0.9 : 0.8)})`;
            heroSubtitle.style.opacity = Math.max(1 - scrollPos / sectionHeight, 0);
            primaryButton.style.transform = `translateY(${scrollPos / (isMobile() ? 15 : 10)}px)`;
            secondaryButton.style.transform = `translateY(${scrollPos / (isMobile() ? 15 : 10)}px)`;
        }
    }

    // Hero Section: Interactive Orbit Particle Burst on Click
    heroProfile.addEventListener('click', () => {
        if (isMobile()) return; // Disable on mobile
        orbitParticles.forEach((particle, index) => {
            particle.style.animation = 'none';
            setTimeout(() => {
                particle.style.animation = `orbitBurst ${2 + index * 0.2}s ease-out forwards`;
            }, 10);
        });
        setTimeout(() => {
            orbitParticles.forEach(particle => {
                particle.style.animation = `orbit ${(12 - index * 3)}s infinite linear ${index % 2 === 0 ? '' : 'reverse'}`;
            });
        }, 2500);
    });

    // Hero Section: Button Ripple Effect
    function createRipple(e, button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    primaryButton.addEventListener('click', (e) => createRipple(e, primaryButton));
    secondaryButton.addEventListener('click', (e) => createRipple(e, secondaryButton));

    // Hero Section: Floating Elements Random Motion Enhancement
    floaters.forEach(floater => {
        floater.addEventListener('mouseover', () => {
            if (isMobile()) return; // Disable on mobile
            floater.style.animation = `floatPulse 1s ease-in-out infinite`;
        });
        floater.addEventListener('mouseleave', () => {
            if (isMobile()) return;
            floater.style.animation = `floatRandom ${Math.random() * 5 + 5}s infinite ease-in-out`;
        });
    });

    // Hero Section: Typewriter Effect for Subtitle
    const subtitleText = Array.from(heroSubtitle.querySelectorAll('.subtitle-text'));
    subtitleText.forEach((span, index) => {
        const text = span.textContent;
        span.textContent = '';
        let charIndex = 0;
        const type = () => {
            if (charIndex < text.length) {
                span.textContent += text[charIndex];
                charIndex++;
                setTimeout(type, isMobile() ? 80 : 100); // Faster on mobile
            }
        };
        setTimeout(type, index * (isMobile() ? 800 : 1000));
    });

    // Navbar: GSAP Initial Animation
    gsap.from('.nav-logo', { opacity: 0, y: -20, duration: 1, ease: 'power3.out' });
    gsap.from('.nav-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.from('.nav-actions', { opacity: 0, x: 20, duration: 1, ease: 'power3.out', delay: 0.4 });

    // Navbar: Scroll-Aware Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navbar: Indicator Animation
    function updateIndicator(link) {
        if (isMobile()) return; // Disable indicator on mobile
        const rect = link.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();
        gsap.to(navIndicator, {
            width: rect.width,
            left: rect.left - navRect.left + 12,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => updateIndicator(link));
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateIndicator(link);
        });
    });

    const activeLink = document.querySelector('.nav-link.active') || navLinks[0];
    activeLink.classList.add('active');
    updateIndicator(activeLink);

    // Navbar: Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        gsap.to('.nav-item', {
            opacity: navMenu.classList.contains('active') ? 1 : 0,
            y: navMenu.classList.contains('active') ? 0 : 20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out'
        });
    });

    // Navbar: Custom Cursor
    document.addEventListener('mousemove', (e) => {
        if (isMobile()) return; // Disable cursor on mobile
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    // Navbar: Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-sun', 'fa-moon');
        icon.classList.add(theme === 'dark' ? 'fa-moon' : 'fa-sun');
    }

    // Services Section: Dynamic Background Particles
    function createServiceBackgroundParticles() {
        const circuitPattern = document.querySelector('.services-circuit-pattern');
        if (!circuitPattern) return;
        const particleCount = isMobile() ? 5 : 15; // Fewer particles on mobile
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.classList.add('circuit-particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(89, 38, 239, ${Math.random() * 0.3 + 0.2})`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            circuitPattern.appendChild(particle);
        }
    }

    // Services Section: Pod Interactions
    servicePods.forEach(pod => {
        const core = pod.querySelector('.pod-core');
        const overlay = pod.querySelector('.pod-overlay');
        const particles = pod.querySelectorAll('.orbital-particle');

        pod.addEventListener('mousemove', (e) => {
            if (isMobile()) return; // Disable tilt on mobile
            const rect = pod.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 20;
            const tiltY = (centerX - x) / 20;

            pod.style.transform = `scale(1.1) translateZ(60px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            particles.forEach((particle, index) => {
                if (!particle.dataset.bursting) {
                    particle.dataset.bursting = 'true';
                    particle.style.animation = `particleBurst ${1 + index * 0.2}s ease-out forwards`;
                    setTimeout(() => {
                        particle.style.animation = `orbitPod ${7 - index * 2}s infinite linear ${index % 2 === 0 ? '' : 'reverse'}`;
                        particle.dataset.bursting = 'false';
                    }, 1500);
                }
            });
        });

        pod.addEventListener('mouseenter', () => {
            core.style.opacity = '0.3';
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateZ(50px)';
            const flow = pod.querySelector('.pod-energy-flow');
            if (flow) flow.style.animation = `energyFlow 2s infinite linear`;
        });

        pod.addEventListener('mouseleave', () => {
            pod.style.transform = 'translateZ(0) scale(1)';
            core.style.opacity = '1';
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateZ(20px)';
            const flow = pod.querySelector('.pod-energy-flow');
            if (flow) flow.style.animation = `energyFlow 3s infinite linear`;
        });

        core.style.opacity = '1';
        overlay.style.opacity = '0';
    });

    // Services Section: Scroll Reveal with Connectors
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                servicePods.forEach((pod, index) => {
                    pod.style.animation = `podReveal 1.2s ease forwards ${index * (isMobile() ? 0.2 : 0.3)}s`;
                    pod.querySelector('.pod-core').style.opacity = '1';
                    pod.querySelector('.pod-overlay').style.opacity = '0';
                    const connectors = pod.querySelectorAll('.connector-line');
                    connectors.forEach((line, idx) => {
                        line.style.animation = `connectorReveal 1s ease forwards ${index * (isMobile() ? 0.2 : 0.3) + idx * 0.2}s`;
                    });
                });
                serviceObserver.unobserve(servicesSection);
            }
        });
    }, { threshold: isMobile() ? 0.1 : 0.2 });
    serviceObserver.observe(servicesSection);

})

