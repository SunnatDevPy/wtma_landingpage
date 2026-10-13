/**
 * WTMA — Наш опыт (Our Experience) Page Scripts
 * Header Scroll Behavior, Mobile Drawer & Language Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Header scroll behavior (Hide on scroll down, reveal on scroll up)
  const header = document.getElementById('siteHeader');
  if (header) {
    let lastScrollY = window.scrollY;
    let isHidden = false;

    window.addEventListener('scroll', () => {
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
    }, { passive: true });
  }

  // 2. Mobile Drawer Navigation
  const burger = document.getElementById('burgerToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });

    drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Search Button (Redirects to Katalog search)
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      window.location.href = 'katalog.html';
    });
  }

  // 4. Language Selector & Dynamic Footer Slogan
  const langSelector = document.getElementById('langSelector');
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const footerSlogan = document.getElementById('footerSlogan');

  const slogans = {
    RU: 'Текстиль. Мода. Более сильное завтра.',
    EN: 'TEXTILE. FASHION. A STRONGER TOMORROW.',
    UZ: "To'qimachilik. Moda. Kuchliroq ertangi kun."
  };

  const updateSlogan = (langCode) => {
    const code = (langCode || 'RU').trim().toUpperCase();
    if (footerSlogan && slogans[code]) {
      footerSlogan.textContent = slogans[code];
    }
  };

  // Restore saved language
  try {
    const saved = localStorage.getItem('wtma_lang');
    if (saved && slogans[saved.toUpperCase()]) {
      const code = saved.toUpperCase();
      if (langToggle) {
        const span = langToggle.querySelector('span');
        if (span) span.textContent = code;
      }
      langOptions.forEach((o) => {
        if (o.textContent.split(' ')[0].trim().toUpperCase() === code) {
          o.classList.add('active');
        } else {
          o.classList.remove('active');
        }
      });
      updateSlogan(code);
    }
  } catch (e) {
    // LocalStorage fallback
  }

  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';
      langToggle.setAttribute('aria-expanded', !isExpanded);
      langDropdown.classList.toggle('show');
    });

    langOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const text = option.textContent.trim();
        const code = text.split(' ')[0].toUpperCase();

        if (langToggle) {
          const span = langToggle.querySelector('span');
          if (span) span.textContent = code;
          langToggle.setAttribute('aria-expanded', 'false');
        }
        langDropdown.classList.remove('show');

        langOptions.forEach((o) => o.classList.remove('active'));
        option.classList.add('active');

        try {
          localStorage.setItem('wtma_lang', code);
        } catch (err) {}

        updateSlogan(code);
      });
    });

    document.addEventListener('click', (e) => {
      if (langSelector && !langSelector.contains(e.target)) {
        langDropdown.classList.remove('show');
        if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
