/**
 * WTMA (World Textile Marketing Agency)
 * Main Interactive Logic & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollSpy();
  initLanguageDropdown();
  initMobileMenu();
  initTimeline();
  initContactModal();
  initScrollReveal();
  initNumberCounters();
});

/**
 * 1. Header Scroll effect (Smart Hide/Show & Adaptive Theme)
 * - Hides when scrolling down, reveals when scrolling up
 * - Adapts colors (Hero mode, Scrolled Light mode, Scrolled Dark mode)
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isHidden = false;

  const handleHeaderUpdate = () => {
    const currentScrollY = window.scrollY;

    // A. Theme adaptation
    if (currentScrollY <= 80) {
      header.classList.remove('header-scrolled-light', 'header-scrolled-dark');
      header.classList.add('header-hero');
    } else {
      header.classList.remove('header-hero');

      // Detect whether the section beneath the header is dark or light theme
      const sections = document.querySelectorAll('main section[id]');
      let currentSection = null;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        // Check if header (top: 0-80px) is currently inside this section
        if (rect.top <= 65 && rect.bottom > 65) {
          currentSection = sec;
        }
      });

      if (currentSection && currentSection.classList.contains('dark-theme')) {
        header.classList.add('header-scrolled-dark');
        header.classList.remove('header-scrolled-light');
      } else {
        header.classList.add('header-scrolled-light');
        header.classList.remove('header-scrolled-dark');
      }
    }

    // B. Hide on scroll down, show on scroll up
    const scrollDelta = currentScrollY - lastScrollY;

    if (currentScrollY > 120 && scrollDelta > 6) {
      // Scrolling DOWN -> hide header
      if (!isHidden) {
        header.classList.add('header-hidden');
        isHidden = true;
        const langSelector = document.getElementById('langSelector');
        if (langSelector) langSelector.classList.remove('open');
      }
    } else if (scrollDelta < -6 || currentScrollY <= 70) {
      // Scrolling UP or at top -> show header
      if (isHidden) {
        header.classList.remove('header-hidden');
        isHidden = false;
      }
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleHeaderUpdate, { passive: true });
  handleHeaderUpdate();
}

/**
 * 2. ScrollSpy - Highlight active navigation link with animated red dot & expanding lines
 */
function initScrollSpy() {
  const heroLinks = document.querySelectorAll('a[href="#hero"], .brand-logo');
  heroLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const drawer = document.getElementById('mobileDrawer');
      const burger = document.getElementById('burgerToggle');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (burger) burger.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, window.location.pathname);
      }
    });
  });

  const aboutLink = document.querySelector('.main-nav .nav-link[href="#hero"]');
  if (aboutLink) {
    aboutLink.classList.add('active');
  }
}

/**
 * 3. Language Selector dropdown toggle
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
 * 4. Mobile Menu Drawer
 */
function initMobileMenu() {
  const burgerToggle = document.getElementById('burgerToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!burgerToggle || !mobileDrawer) return;

  burgerToggle.addEventListener('click', () => {
    const isOpen = burgerToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
    burgerToggle.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burgerToggle.classList.remove('open');
      mobileDrawer.classList.remove('open');
      burgerToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 5. Interactive Timeline (Block 02 - История)
 */
function initTimeline() {
  const timelineNodes = document.querySelectorAll('.timeline-node');
  if (!timelineNodes.length) return;

  timelineNodes.forEach((node) => {
    node.addEventListener('click', () => {
      timelineNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');
    });
  });
}

/**
 * 6. Contact Modal Handler
 */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-contact-modal');
  const form = document.getElementById('contactForm');
  const successNotice = document.getElementById('formSuccess');
  const directionSelect = document.getElementById('userDirection');

  if (!modal) return;

  const openModal = (subject) => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (subject && directionSelect) {
      // If subject corresponds to an option, match it
      for (let i = 0; i < directionSelect.options.length; i++) {
        if (directionSelect.options[i].text.includes(subject) || directionSelect.options[i].value.includes(subject)) {
          directionSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = btn.getAttribute('data-subject') || '';
      openModal(subject);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Отправка...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.style.display = 'none';
        }
        if (successNotice) {
          successNotice.style.display = 'block';
        }
        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.style.display = 'inline-flex';
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Отправить запрос';
          }
          if (successNotice) {
            successNotice.style.display = 'none';
          }
          closeModal();
        }, 3000);
      }, 700);
    });
  }
}

/**
 * 7. Scroll Reveal via IntersectionObserver
 */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if (!revealItems.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}

/**
 * 8. Animated Number Counters on Page Load / Refresh
 */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('.metric-number[data-target]');
  if (!counterElements.length) return;

  const duration = 2000; // Animation duration in ms

  // Ease Out Cubic function for luxury, smooth deceleration
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const startCounting = () => {
    counterElements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;

      el.classList.add('counting');
      el.classList.remove('counted');

      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = Math.floor(easedProgress * target);

        el.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = `${target}${suffix}`;
          el.classList.remove('counting');
          el.classList.add('counted');
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // Run immediately on page load / refresh
  startCounting();

  // Also trigger if page becomes visible or via IntersectionObserver
  const heroMetrics = document.querySelector('.hero-metrics-grid');
  if (heroMetrics) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(heroMetrics);
  }
}

