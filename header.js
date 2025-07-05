document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById("mainNav");
    let lastScrollTop = window.scrollY;
    let isAnimating = false;
    let navVisible = true;
  
    // Initial animation on page load
    anime({
      targets: nav,
      translateY: ['-100%', '0%'],
      duration: 800,
      easing: 'easeOutExpo',
      complete: () => {
        navVisible = true;
      }
    });
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const scrollDown = currentScroll > lastScrollTop;
  
      // Don't trigger animations if already in progress or scroll change is small
      if (isAnimating || Math.abs(currentScroll - lastScrollTop) < 10) {
        lastScrollTop = currentScroll;
        return;
      }
  
      // Scroll down → hide nav
      if (scrollDown && navVisible && currentScroll > 50) {
        isAnimating = true;
        anime({
          targets: nav,
          translateY: ['0%', '-100%'],
          duration: 500,
          easing: 'easeInOutQuad',
          complete: () => {
            navVisible = false;
            isAnimating = false;
          }
        });
      }
  
      // Scroll up → show nav
      if (!scrollDown && !navVisible) {
        isAnimating = true;
        anime({
          targets: nav,
          translateY: ['-100%', '0%'],
          duration: 500,
          easing: 'easeInOutQuad',
          complete: () => {
            navVisible = true;
            isAnimating = false;
          }
        });
      }
  
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerIcon = mobileMenuButton.querySelector('.hamburger-icon');
    const closeIcon = mobileMenuButton.querySelector('.close-icon');
    let isOpen = false;
  
    function openMenu() {
      isAnimating = true;
      // Show menu with animation
      anime({
        targets: mobileMenu,
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 400,
        begin: () => {
          mobileMenu.style.pointerEvents = 'auto';
        },
        complete: () => {
          isAnimating = false;
          isOpen = true;
        }
      });
      // Toggle icons
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  
    function closeMenu() {
      isAnimating = true;
      anime({
        targets: mobileMenu,
        translateY: ['0%', '-100%'],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 400,
        complete: () => {
          mobileMenu.style.pointerEvents = 'none';
          isAnimating = false;
          isOpen = false;
        }
      });
      // Toggle icons
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  
    mobileMenuButton.addEventListener('click', () => {
      if (isAnimating) return;
      if (!isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!isOpen) return;
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = mobileMenuButton.contains(event.target);
      if (!isClickInsideMenu && !isClickOnButton) {
        closeMenu();
      }
    });
  });
  