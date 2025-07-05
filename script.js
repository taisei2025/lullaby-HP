document.addEventListener('DOMContentLoaded', () => {

    // Scroll animation observer (Tailwind class toggler)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                document.querySelector('.mobile-menu')?.classList.add('hidden');
            }
        });
    });

    // Hero section animations
    const title = document.getElementById('hero-title');
    const paragraph = document.getElementById('hero-paragraph');
    const cta = document.getElementById('hero-cta');

    // Animate hero title letter-by-letter
    if (title) {
        const text = title.textContent;
        title.innerHTML = text
            .split('')
            .map(char => `<span class="inline-block opacity-0">${char}</span>`)
            .join('');

        anime({
            targets: '#hero-title span',
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            delay: anime.stagger(40),
            duration: 800,
            complete: function() {
                // Start breathing animation after hero title animation completes
                // Breathing dot animation only
                anime({
                    targets: '.pulsating-dot',
                    scale: [0.8, 1.2, 0.8],
                    easing: 'easeInOutSine',
                    duration: 3000,
                    loop: true
                });
            }
        });
    }

    // Animate abstract shapes
    anime({
        targets: '.abstract-shape',
        opacity: [0, 1],
        scale: [0.8, 1],
        easing: 'easeOutQuad',
        delay: anime.stagger(200),
        duration: 1500
    });

    // Animate hero paragraph and CTA
    anime({
        targets: ['#hero-paragraph', '#hero-cta'],
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        delay: (el, i) => 1500 + i * 300,
        duration: 800
    });

    // Fallback pulsating dot animation (runs regardless of hero title)
    setTimeout(() => {
        // Breathing dot animation only
        anime({
            targets: '.pulsating-dot',
            scale: [0.8, 1.2, 0.8],
            easing: 'easeInOutSine',
            duration: 3000,
            loop: true
        });
    }, 2000); // Start after 2 seconds to ensure DOM is ready

    // Services teaser section animation
    const servicesObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Enhanced header animation with letter-by-letter effect
            const header = entry.target.querySelector('#services-header h2');
            if (header) {
                const text = header.textContent;
                header.innerHTML = text
                    .split('')
                    .map(char => `<span class="inline-block opacity-0">${char}</span>`)
                    .join('');

                anime({
                    targets: '#services-header h2 span',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    delay: anime.stagger(80),
                    duration: 800
                });
            }

            // Enhanced subtitle animation
            anime({
                targets: '#services-header p',
                translateY: [30, 0],
                opacity: [0, 1],
                delay: 600,
                duration: 700,
                easing: 'easeOutExpo'
            });

            // Enhanced divider animation with scale effect
            anime({
                targets: '#services-divider',
                scaleX: [0, 1],
                opacity: [0, 1],
                delay: 800,
                duration: 600,
                easing: 'easeOutExpo'
            });

            // Enhanced card animations with staggered entrance and floating effect
            anime({
                targets: '#services-cards > div',
                translateY: [80, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(200, { start: 1000 }),
                duration: 800,
                easing: 'easeOutBack'
            });

            // Add floating animation to cards after they appear
            setTimeout(() => {
                anime({
                    targets: '#services-cards > div',
                    translateY: [0, -10, 0],
                    easing: 'easeInOutSine',
                    duration: 3000,
                    delay: anime.stagger(300),
                    loop: true,
                    direction: 'alternate'
                });
            }, 2000);

            // Enhanced CTA button animation
            anime({
                targets: '#services a',
                translateY: [30, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: 1800,
                duration: 800,
                easing: 'easeOutBack'
            });

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    const servicesSection = document.querySelector('#services');
    if (servicesSection) servicesObserver.observe(servicesSection);

    // Add interactive hover animations for service cards
    document.addEventListener('DOMContentLoaded', () => {
        const serviceCards = document.querySelectorAll('#services-cards > div');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Pause floating animation and add hover effect
                anime({
                    targets: card,
                    scale: [1, 1.05],
                    translateY: [0, -5],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
                // Animate the icon
                const icon = card.querySelector('i');
                if (icon) {
                    anime({
                        targets: icon,
                        rotate: [0, 360],
                        scale: [1, 1.2],
                        duration: 500,
                        easing: 'easeOutBack'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                // Resume normal state
                anime({
                    targets: card,
                    scale: [1.05, 1],
                    translateY: [-5, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
                // Reset icon
                const icon = card.querySelector('i');
                if (icon) {
                    anime({
                        targets: icon,
                        rotate: [360, 0],
                        scale: [1.2, 1],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    });
});
