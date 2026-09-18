/**
 * WTMA — Контакты (Contacts) Page Interactive Logic
 * Form validation & submission, Map interactive controls, Header & Mobile Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initLanguageDropdown();
  initContactForm();
  initInteractiveMap();
});

/**
 * 1. Header Scroll Logic (Hide on scroll down, reveal on scroll up)
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isHidden = false;

  const handleHeaderUpdate = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    if (currentScrollY > 120 && scrollDelta > 6) {
      if (!isHidden) {
        header.classList.add('header-hidden');
        isHidden = true;
      }
    } else if (scrollDelta < -6 || currentScrollY <= 60) {
      if (isHidden) {
        header.classList.remove('header-hidden');
        isHidden = false;
      }
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleHeaderUpdate, { passive: true });
}

/**
 * 2. Mobile Menu Drawer
 */
function initMobileMenu() {
  const burger = document.getElementById('burgerToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!burger || !drawer) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      drawer.classList.remove('open');
    });
  });
}

/**
 * 3. Language Selector
 */
function initLanguageDropdown() {
  const langSelector = document.getElementById('langSelector');
  const langToggle = document.getElementById('langToggle');
  const langOptions = document.querySelectorAll('.lang-option');

  if (!langSelector || !langToggle) return;

  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langSelector.classList.toggle('open');
    const isOpen = langSelector.classList.contains('open');
    langToggle.setAttribute('aria-expanded', isOpen);
  });

  langOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      langOptions.forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
      const text = opt.textContent.split(' ')[0];
      langToggle.querySelector('span').textContent = text;
      langSelector.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!langSelector.contains(e.target)) {
      langSelector.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 4. Interactive Project Request Form with Validation
 */
function initContactForm() {
  const form = document.getElementById('projectContactForm');
  const submitBtn = document.getElementById('submitRequestBtn');
  const successBanner = document.getElementById('formSuccessBanner');

  if (!form || !submitBtn) return;

  const validateField = (field) => {
    const parent = field.closest('.form-field');
    if (!parent) return true;

    let isValid = true;
    const val = field.value.trim();

    if (field.hasAttribute('required') && !val) {
      isValid = false;
    } else if (field.type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        isValid = false;
      }
    }

    if (!isValid) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }

    return isValid;
  };

  // Live input validation on blur / input
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-field').classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        formValid = false;
      }
    });

    if (!formValid) {
      const firstError = form.querySelector('.form-field.has-error input, .form-field.has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // Submit animation
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Отправка запроса...</span>';

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Отправлено успешно ✓</span>';
      submitBtn.style.backgroundColor = '#16a34a';

      if (successBanner) {
        successBanner.classList.add('is-visible');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    }, 1200);
  });
}

/**
 * 5. Interactive Map Controls (Zoom In / Zoom Out & Pan)
 */
function initInteractiveMap() {
  const mapImg = document.getElementById('mapLayerImg');
  const zoomInBtn = document.getElementById('mapZoomIn');
  const zoomOutBtn = document.getElementById('mapZoomOut');
  const mapViewport = document.getElementById('mapViewport');

  if (!mapImg || !zoomInBtn || !zoomOutBtn || !mapViewport) return;

  let currentScale = 1.0;
  const minScale = 1.0;
  const maxScale = 1.9;
  const step = 0.25;

  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const updateTransform = () => {
    mapImg.style.transform = `scale(${currentScale}) translate(${posX / currentScale}px, ${posY / currentScale}px)`;
  };

  zoomInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentScale < maxScale) {
      currentScale = Math.min(maxScale, currentScale + step);
      updateTransform();
    }
  });

  zoomOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentScale > minScale) {
      currentScale = Math.max(minScale, currentScale - step);
      if (currentScale === minScale) {
        posX = 0;
        posY = 0;
      }
      updateTransform();
    }
  });

  // Drag to pan map
  mapViewport.addEventListener('mousedown', (e) => {
    if (currentScale > 1.0) {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;

    // Limit pan bounds
    const maxBound = 150 * (currentScale - 1);
    posX = Math.max(-maxBound, Math.min(maxBound, posX));
    posY = Math.max(-maxBound, Math.min(maxBound, posY));

    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}
