/**
 * WTMA (World Textile Marketing Agency)
 * Main Interactive Logic & Micro-interactions
 */

// Immediate redirect if arrived via stale hash #mission
if (window.location.hash === '#mission') {
  window.location.replace('katalog.html');
}
if (window.location.hash === '#about') {
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, window.location.pathname);
  }
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollSpy();
  initLanguageDropdown();
  initMobileMenu();
  initTimeline();
  initContactModal();
  initScrollReveal();
  initNumberCounters();
  initTeamInteractions();
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

  // Form submission (Telegram Bot Integration)
  if (form) {
    const errorNotice = document.getElementById('formError');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const phoneInput = document.getElementById('userPhone');
      const directionSelect = document.getElementById('userDirection');
      const messageInput = document.getElementById('userMessage');

      const leadData = {
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        direction: directionSelect ? directionSelect.value : '',
        message: messageInput ? messageInput.value.trim() : '',
        source: 'Bosh sahifa (Modal oyna)'
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Отправка...';
      }

      if (successNotice) successNotice.style.display = 'none';
      if (errorNotice) errorNotice.style.display = 'none';

      try {
        const response = await fetch('/api/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || (result && result.ok === false)) {
          throw new Error(result && result.error ? result.error : `HTTP Status ${response.status}: ${response.statusText}`);
        }

        // 1. MUVAFFAQITYAT (Yuborildi)
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
        }, 3500);

      } catch (err) {
        // 2. XATOLIK:
        // Haqiqiy texnik xatolik FAQAT brauzer konsoliga (console.error) yoziladi:
        console.error('[WTMA Modal Lead Error Details]:', err);

        // Saytda esa sodda va xavfsiz "Xatolik yuz berdi" ko'rinadi:
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Повторить попытку';
        }
        if (errorNotice) {
          errorNotice.style.display = 'block';
        }

        setTimeout(() => {
          if (errorNotice) errorNotice.style.display = 'none';
          if (submitBtn) submitBtn.querySelector('span').textContent = 'Отправить запрос';
        }, 4000);
      }
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

/**
 * 9. Team Member Cards — Horizontal Carousel, Drag Scroll & Interactive 3D Mouse Parallax
 */
function initTeamInteractions() {
  const track = document.getElementById('teamCardsTrack');
  const prevBtn = document.getElementById('teamPrevBtn');
  const nextBtn = document.getElementById('teamNextBtn');
  const teamCards = document.querySelectorAll('.team-member-card');
  if (!track || !teamCards.length) return;

  // A. Slider Arrow Navigation & Disabled States
  function updateArrowStates() {
    if (!prevBtn || !nextBtn) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 10) {
      prevBtn.classList.add('is-disabled');
    } else {
      prevBtn.classList.remove('is-disabled');
    }

    if (track.scrollLeft >= maxScroll - 10) {
      nextBtn.classList.add('is-disabled');
    } else {
      nextBtn.classList.remove('is-disabled');
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardWidth = teamCards[0]?.offsetWidth || 250;
      track.scrollBy({ left: -(cardWidth + 22) * 1.5, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardWidth = teamCards[0]?.offsetWidth || 250;
      track.scrollBy({ left: (cardWidth + 22) * 1.5, behavior: 'smooth' });
    });
  }

  track.addEventListener('scroll', updateArrowStates, { passive: true });
  window.addEventListener('resize', updateArrowStates);
  // Initial check after layout
  setTimeout(updateArrowStates, 100);

  // B. Mouse Drag-to-Scroll (Desktop grab and glide)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      track.classList.remove('is-dragging');
      setTimeout(() => { hasDragged = false; }, 50);
    }
  });

  track.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      track.classList.remove('is-dragging');
      setTimeout(() => { hasDragged = false; }, 50);
    }
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX);
    if (Math.abs(walk) > 4) {
      hasDragged = true;
      e.preventDefault();
      track.scrollLeft = scrollLeft - walk;
    }
  });

  // C. Interactive 3D Mouse Parallax & Dynamic Light Sheen
  teamCards.forEach((card) => {
    let bounds = null;
    let isHovering = false;

    const onMouseEnter = () => {
      if (isDown || hasDragged) return;
      bounds = card.getBoundingClientRect();
      isHovering = true;
      card.classList.add('is-hovered');
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    };

    const onMouseMove = (e) => {
      if (!isHovering || isDown || hasDragged) return;
      if (!bounds) bounds = card.getBoundingClientRect();

      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Calculate tilt angles (degrees)
      const rotateX = ((centerY - y) / centerY) * 11;
      const rotateY = ((x - centerX) / centerX) * 11;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.03, 1.03, 1.03)`;

      // Dynamic Glare Spotlight
      const glare = card.querySelector('.member-card-glare');
      if (glare) {
        const glareX = (x / bounds.width) * 100;
        const glareY = (y / bounds.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 70%)`;
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      bounds = null;
      card.classList.remove('is-hovered');
      card.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';

      const glare = card.querySelector('.member-card-glare');
      if (glare) {
        glare.style.background = 'none';
      }
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}


