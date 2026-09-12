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
 * 1. Header Scroll effect (Add shadow & background blur on scroll)
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. ScrollSpy - Highlight active navigation link with the terracotta dot
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
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

