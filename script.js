// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// ============================================
// CONTACT FORM EMAIL FUNCTIONALITY
// ============================================

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'FX61FA5jxKet3w1Qb';  // Get from EmailJS Dashboard
const EMAILJS_SERVICE_ID = 'service_4wql9yf';   // Your Gmail service ID
const EMAILJS_TEMPLATE_ID = 'template_bxdn9cf'; // Your template ID

// Initialize EmailJS
(function() {
    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    };
    document.head.appendChild(script);
})();

// Contact form submission
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Disable submit button and show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
// Check if EmailJS is NOT configured
if (
    EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' ||
    EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE' ||
    EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE'
) {
    alert('⚠️ EmailJS is not configured yet!\n\nPlease follow the setup instructions in the script.js file to configure EmailJS with your credentials.');
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
    return;
}

    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'caelestis7crafts@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert(`✅ Thank you for your message, ${name}!\n\nWe've received your inquiry and will get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            alert(`❌ Oops! Something went wrong.\n\nPlease try again or contact us directly at caelestis7crafts@gmail.com\n\nError: ${error.text || 'Unknown error'}`);
            
            // Re-enable button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

// ============================================
// END CONTACT FORM EMAIL FUNCTIONALITY
// ============================================

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animateElements = document.querySelectorAll('.category-card, .product-card, .review-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product card interactions
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const viewDetailsBtn = card.querySelector('.btn-secondary');
    
});

// Add loading animation for images (exclude logo)
const images = document.querySelectorAll('img:not(.logo img)');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });

    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Active navigation link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent default behavior for empty links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ── Image Keychain side selector ──
(function () {
    const PRICES = { front: 60, both: 70 };

    function initKeychainSelector() {
        const card = document.getElementById('imageKeychainCard');
        if (!card) return;

        const radios = card.querySelectorAll('input[name="keychainSide"]');
        const priceEl = document.getElementById('imageKeychainPrice');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const price = PRICES[radio.value] ?? 60;
                priceEl.textContent = '₱' + price;
                // keep card dataset in sync so modal reads correct price
                card.dataset.keychainPrice = price;
            });
        });

        // set default dataset value
        card.dataset.keychainPrice = PRICES.front;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKeychainSelector);
    } else {
        initKeychainSelector();
    }
})();

// ── Swiss Knife side selector ──
(function () {
    const PRICES = { front: 100, both: 110 };

    function initKeychainSelector() {
        const card = document.getElementById('swissKnifeCard');
        if (!card) return;

        const radios = card.querySelectorAll('input[name="swissSide"]');
        const priceEl = document.getElementById('swissKnifePrice');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const price = PRICES[radio.value] ?? 100;
                priceEl.textContent = '₱' + price;
                // keep card dataset in sync so modal reads correct price
                card.dataset.swissPrice = price;
            });
        });

        // set default dataset value
        card.dataset.swissPrice = PRICES.front;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKeychainSelector);
    } else {
        initKeychainSelector();
    }
})();

// ── Mirror side selector ──
(function () {
    const PRICES = { noHandle: 60, withHandle: 70 };

    function initMirrorSelector() {
        const card = document.getElementById('mirrorCard');
        if (!card) return;

        const radios = card.querySelectorAll('input[name="mirrorSide"]');
        const priceEl = document.getElementById('mirrorPrice');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const price = PRICES[radio.value] ?? 60;
                priceEl.textContent = '₱' + price;
                // keep card dataset in sync so modal reads correct price
                card.dataset.mirrorPrices = price;
            });
        });

        // set default dataset value
        card.dataset.mirrorPrices = PRICES.noHandle;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMirrorSelector);
    } else {
        initMirrorSelector();
    }
})();

// ── Tex Image Keychain side selector ──
(function () {
    const PRICES = { front: 45, both: 50 };

    function initKeychainSelector() {
        const card = document.getElementById('textKeychainCard');
        if (!card) return;

        const radios = card.querySelectorAll('input[name="textkeychainSide"]');
        const priceEl = document.getElementById('textKeychainPrice');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const price = PRICES[radio.value] ?? 45;
                priceEl.textContent = '₱' + price;
                // keep card dataset in sync so modal reads correct price
                card.dataset.textkeychainPrice = price;
            });
        });

        // set default dataset value
        card.dataset.keychainPrice = PRICES.front;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKeychainSelector);
    } else {
        initKeychainSelector();
    }
})();

// ── Product Search ──
(function () {
    function initProductSearch() {
        const searchInput = document.getElementById('productSearchInput');
        if (!searchInput) return;

        const productCards = document.querySelectorAll('.products-grid .product-card');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();

            productCards.forEach(card => {
                const titleEl = card.querySelector('h3');
                const name = titleEl ? titleEl.textContent.toLowerCase() : '';
                card.style.display = name.includes(query) ? '' : 'none';
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductSearch);
    } else {
        initProductSearch();
    }
})();

console.log('Caelestis Crafts website loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay     = document.getElementById('productModalOverlay');
  const modalClose       = document.getElementById('modalClose');
  const modalCloseBtn    = document.getElementById('modalCloseBtn');
  const modalTitle       = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice       = document.getElementById('modalPrice');
  const modalBadge       = document.getElementById('modalBadge');
  const modalExtrasContent = document.getElementById('modalExtrasContent');

  // ── Carousel elements ──
  const carousel     = document.getElementById('modalCarousel');
  const track        = document.getElementById('carouselTrack');
  const dotsWrap     = document.getElementById('carouselDots');
  const prevBtn      = document.getElementById('carouselPrev');
  const nextBtn      = document.getElementById('carouselNext');

  // ── Zoom lightbox elements ──
  const zoomLightbox = document.getElementById('zoomLightbox');
  const zoomImg      = document.getElementById('zoomImage');
  const zoomClose    = document.getElementById('zoomClose');
  const zoomPrev     = document.getElementById('zoomPrev');
  const zoomNext     = document.getElementById('zoomNext');
  const zoomInBtn    = document.getElementById('zoomIn');
  const zoomOutBtn   = document.getElementById('zoomOut');
  const zoomResetBtn = document.getElementById('zoomReset');
  const zoomLevelLbl = document.getElementById('zoomLevelLabel');
  const zoomCounter  = document.getElementById('zoomCounter');

  // ── Carousel state ──
  let carouselImages = [];
  let currentIndex   = 0;

  // ── Zoom state ──
  let zoomScale    = 1;
  let zoomIndex    = 0;
  let isDragging   = false;
  let dragStartX   = 0;
  let dragStartY   = 0;
  let translateX   = 0;
  let translateY   = 0;
  let lastTransX   = 0;
  let lastTransY   = 0;

  /* ─────────────── CAROUSEL ─────────────── */

  function buildCarousel(images) {
    carouselImages = images;
    currentIndex   = 0;

    // Build slides
    track.innerHTML = '';
    images.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Product image ' + (i + 1);
      img.addEventListener('click', () => openZoom(i));
      slide.appendChild(img);
      track.appendChild(slide);
    });

    // Build dots
    dotsWrap.innerHTML = '';
    if (images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    // Single-image class
    carousel.classList.toggle('single', images.length === 1);

    goTo(0, false);
    initSwipe();
  }

  function goTo(index, animate = true) {
    currentIndex = Math.max(0, Math.min(index, carouselImages.length - 1));
    if (!animate) track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (!animate) { void track.offsetWidth; track.style.transition = ''; }

    // Update dots
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === carouselImages.length - 1;
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Keyboard arrows (when modal is open)
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('open')) return;
    if (zoomLightbox.classList.contains('open')) return; // handled by zoom
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Touch / swipe support
  function initSwipe() {
    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) goTo(currentIndex + 1);
        else        goTo(currentIndex - 1);
      }
    }, { passive: true });
  }

  /* ─────────────── ZOOM LIGHTBOX ─────────────── */

  function openZoom(index) {
    zoomIndex = index;
    zoomScale = 1;
    translateX = 0; translateY = 0;
    lastTransX = 0; lastTransY = 0;
    zoomImg.src = carouselImages[zoomIndex];
    applyZoomTransform();
    updateZoomNav();
    updateZoomCounter();
    zoomLightbox.classList.add('open');
    zoomLightbox.setAttribute('aria-hidden', 'false');
  }

  function closeZoom() {
    zoomLightbox.classList.remove('open');
    zoomLightbox.setAttribute('aria-hidden', 'true');
  }

  function applyZoomTransform() {
    zoomImg.style.transform = `scale(${zoomScale}) translate(${translateX / zoomScale}px, ${translateY / zoomScale}px)`;
    zoomLevelLbl.textContent = Math.round(zoomScale * 100) + '%';
  }

  function resetZoomPan() {
    translateX = 0; translateY = 0;
    lastTransX = 0; lastTransY = 0;
  }

  function updateZoomNav() {
    zoomPrev.disabled = zoomIndex === 0;
    zoomNext.disabled = zoomIndex === carouselImages.length - 1;
    zoomPrev.style.display = carouselImages.length <= 1 ? 'none' : '';
    zoomNext.style.display = carouselImages.length <= 1 ? 'none' : '';
  }

  function updateZoomCounter() {
    zoomCounter.textContent = carouselImages.length > 1
      ? (zoomIndex + 1) + ' / ' + carouselImages.length
      : '';
  }

  zoomClose.addEventListener('click', closeZoom);
  zoomLightbox.addEventListener('click', (e) => { if (e.target === zoomLightbox) closeZoom(); });

  zoomPrev.addEventListener('click', () => {
    if (zoomIndex > 0) { zoomIndex--; zoomImg.src = carouselImages[zoomIndex]; resetZoomPan(); zoomScale = 1; applyZoomTransform(); updateZoomNav(); updateZoomCounter(); }
  });
  zoomNext.addEventListener('click', () => {
    if (zoomIndex < carouselImages.length - 1) { zoomIndex++; zoomImg.src = carouselImages[zoomIndex]; resetZoomPan(); zoomScale = 1; applyZoomTransform(); updateZoomNav(); updateZoomCounter(); }
  });

  zoomInBtn.addEventListener('click',  () => { zoomScale = Math.min(zoomScale + 0.5, 5); applyZoomTransform(); });
  zoomOutBtn.addEventListener('click', () => { zoomScale = Math.max(zoomScale - 0.5, 0.5); applyZoomTransform(); });
  zoomResetBtn.addEventListener('click', () => { zoomScale = 1; resetZoomPan(); applyZoomTransform(); });

  // Mouse wheel zoom
  zoomLightbox.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    zoomScale = Math.min(Math.max(zoomScale + delta, 0.5), 5);
    applyZoomTransform();
  }, { passive: false });

  // Drag to pan (when zoomed in)
  const zoomContainer = document.getElementById('zoomContainer');
  zoomContainer.addEventListener('mousedown', (e) => {
    if (zoomScale <= 1) return;
    isDragging = true;
    dragStartX = e.clientX - lastTransX;
    dragStartY = e.clientY - lastTransY;
    zoomContainer.classList.add('grabbing');
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - dragStartX;
    translateY = e.clientY - dragStartY;
    applyZoomTransform();
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) { isDragging = false; lastTransX = translateX; lastTransY = translateY; zoomContainer.classList.remove('grabbing'); }
  });

  // Touch pinch-to-zoom + drag pan
  let lastPinchDist = null;
  zoomContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      lastPinchDist = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
    } else if (e.touches.length === 1 && zoomScale > 1) {
      isDragging = true;
      dragStartX = e.touches[0].clientX - lastTransX;
      dragStartY = e.touches[0].clientY - lastTransY;
    }
  }, { passive: true });
  zoomContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && lastPinchDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
      const ratio = dist / lastPinchDist;
      zoomScale = Math.min(Math.max(zoomScale * ratio, 0.5), 5);
      lastPinchDist = dist;
      applyZoomTransform();
    } else if (e.touches.length === 1 && isDragging) {
      translateX = e.touches[0].clientX - dragStartX;
      translateY = e.touches[0].clientY - dragStartY;
      applyZoomTransform();
    }
  }, { passive: false });
  zoomContainer.addEventListener('touchend', () => {
    lastPinchDist = null;
    if (isDragging) { isDragging = false; lastTransX = translateX; lastTransY = translateY; }
  });

  // Keyboard navigation in zoom
  document.addEventListener('keydown', (e) => {
    if (!zoomLightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeZoom();
    if (e.key === 'ArrowLeft')   zoomPrev.click();
    if (e.key === 'ArrowRight')  zoomNext.click();
    if (e.key === '+')           zoomInBtn.click();
    if (e.key === '-')           zoomOutBtn.click();
  });

  /* ─────────────── MODAL OPEN/CLOSE ─────────────── */

  function openModal() {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    closeZoom();
    if (modalExtrasContent) modalExtrasContent.scrollTop = 0;
  }

  if (modalClose)   modalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open') && !zoomLightbox.classList.contains('open')) closeModal();
  });

  /* ─────────────── VIEW DETAILS CLICK ─────────────── */

  document.querySelectorAll('.product-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const card = ev.currentTarget.closest('.product-card');
      if (!card) return;

      const titleEl = card.querySelector('h3');
      const descEl  = card.querySelector('.product-description');
      const priceEl = card.querySelector('.price');
      const imgEl   = card.querySelector('.product-image img');
      const badgeEl = card.querySelector('.product-badge');

      modalTitle.textContent       = titleEl ? titleEl.textContent.trim() : 'Product';
      modalDescription.textContent = descEl  ? descEl.textContent.trim()  : '';

      const livePrice = card.dataset.keychainPrice
        ? '₱' + card.dataset.keychainPrice
        : (priceEl ? priceEl.textContent.trim() : '');
      modalPrice.textContent = livePrice;

      if (badgeEl && badgeEl.textContent.trim()) {
        modalBadge.style.display = 'inline-block';
        modalBadge.textContent   = badgeEl.textContent.trim();
      } else {
        modalBadge.style.display = 'none';
      }

      // Build image list: data-images attr (comma-separated) takes priority, else fall back to the card image
      let images = [];
      if (card.dataset.images) {
        images = card.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (!images.length && imgEl) images = [imgEl.src];

      buildCarousel(images);

      // Extra info
      const extraEl   = card.querySelector('.product-extra');
      const inclusions = card.dataset.inclusions;
      const dimensions = card.dataset.dimensions;
      let extrasHtml   = '';

      if (extraEl) {
        extrasHtml = extraEl.innerHTML;
      } else {
        if (inclusions) extrasHtml += '<strong>Inclusions:</strong><div>' + inclusions + '</div>';
        if (dimensions) extrasHtml += '<strong style="display:block;margin-top:6px">Dimensions:</strong><div>' + dimensions + '</div>';
      }
      if (modalExtrasContent) modalExtrasContent.innerHTML = extrasHtml || '';

      // ── Keychain side selector ──
      const isKeychain = card.id === 'imageKeychainCard' || card.id === 'textKeychainCard' | card.id === 'swissKnifeCard';
      const isMirror   = card.id === 'mirrorCard';
      const existingSelector = document.getElementById('modalSideSelector');
      if (existingSelector) existingSelector.remove();

      if (isKeychain) {
        const priceFront   = parseInt(card.dataset.priceFront, 10) || 85;
        const priceBoth    = parseInt(card.dataset.priceBoth,  10) || 100;
        const currentRadio = card.querySelector('input[name="keychainSide"]:checked');
        const currentSide  = currentRadio ? currentRadio.value : 'front';
        const currentPrice = currentSide === 'both' ? priceBoth : priceFront;

        modalPrice.textContent = '₱' + currentPrice;

        const selectorDiv = document.createElement('div');
        selectorDiv.id        = 'modalSideSelector';
        selectorDiv.className = 'modal-side-selector';
        selectorDiv.innerHTML = `
          <button type="button" class="modal-side-btn${currentSide === 'front' ? ' active' : ''}" data-side="front">Front Only</button>
          <button type="button" class="modal-side-btn${currentSide === 'both'  ? ' active' : ''}" data-side="both">Both Sides</button>
        `;

        selectorDiv.querySelectorAll('.modal-side-btn').forEach(b => {
          b.addEventListener('click', () => {
            const side  = b.dataset.side;
            const price = side === 'both' ? priceBoth : priceFront;
            modalPrice.textContent = '₱' + price;

            const matchingRadio = card.querySelector(`input[name="keychainSide"][value="${side}"]`);
            if (matchingRadio) matchingRadio.checked = true;

            const cardPriceEl = document.getElementById('imageKeychainPrice');
            if (cardPriceEl) cardPriceEl.textContent = '₱' + price;
            card.dataset.keychainPrice = price;

            selectorDiv.querySelectorAll('.modal-side-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
          });
        });

        const infoDiv   = document.querySelector('.modal-body .info');
        const extrasDiv = document.getElementById('modalExtras');
        if (infoDiv && extrasDiv) infoDiv.insertBefore(selectorDiv, extrasDiv);
      }

      if (isMirror) {
        const priceNoHandle   = parseInt(card.dataset.priceNohandle, 10)   || 50;
        const priceWithHandle = parseInt(card.dataset.priceWithhandle, 10) || 60;
        const currentRadio = card.querySelector('input[name="mirrorSide"]:checked');
        const currentSide  = currentRadio ? currentRadio.value : 'noHandle';
        const currentPrice = currentSide === 'withHandle' ? priceWithHandle : priceNoHandle;

        modalPrice.textContent = '₱' + currentPrice;

        const selectorDiv = document.createElement('div');
        selectorDiv.id        = 'modalSideSelector';
        selectorDiv.className = 'modal-side-selector';
        selectorDiv.innerHTML = `
          <button type="button" class="modal-side-btn${currentSide === 'noHandle'   ? ' active' : ''}" data-side="noHandle">No Handle</button>
          <button type="button" class="modal-side-btn${currentSide === 'withHandle' ? ' active' : ''}" data-side="withHandle">With Handle</button>
        `;

        selectorDiv.querySelectorAll('.modal-side-btn').forEach(b => {
          b.addEventListener('click', () => {
            const side  = b.dataset.side;
            const price = side === 'withHandle' ? priceWithHandle : priceNoHandle;
            modalPrice.textContent = '₱' + price;

            const matchingRadio = card.querySelector(`input[name="mirrorSide"][value="${side}"]`);
            if (matchingRadio) matchingRadio.checked = true;

            const cardPriceEl = document.getElementById('mirrorPrice');
            if (cardPriceEl) cardPriceEl.textContent = '₱' + price;
            card.dataset.mirrorPrices = price;

            selectorDiv.querySelectorAll('.modal-side-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
          });
        });

        const infoDiv2   = document.querySelector('.modal-body .info');
        const extrasDiv2 = document.getElementById('modalExtras');
        if (infoDiv2 && extrasDiv2) infoDiv2.insertBefore(selectorDiv, extrasDiv2);
      }

      openModal();
    });

    
  });
});