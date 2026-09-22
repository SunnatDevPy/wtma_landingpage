/**
 * WTMA — Медиа (Media) Page Interactive Logic
 * Portfolio Showcase Lightbox, Modals, Header & Mobile Controls
 */

// Portfolio data for the 5 Media Directions
const MEDIA_SHOWCASE_DATA = {
  photoshoot: {
    num: '01',
    title: 'ФОТОСЪЁМКА',
    desc: 'Профессиональная съёмка текстильных производств, оборудования, готовой продукции, тканей и лукбуков.',
    items: [
      {
        title: 'Текстильный комбинат "Bukhara Cotton"',
        category: 'Производственная съёмка',
        location: 'Бухара, Узбекистан',
        image: 'images/media/01-photoshoot.webp'
      },
      {
        title: 'Коллекция натурального хлопка и пряжи',
        category: 'Предметная и макросъёмка',
        location: 'Ташкент',
        image: 'images/media/hero-bg.webp'
      },
      {
        title: 'High-Fashion кампейн сезона Осень/Зима',
        category: 'Fashion & Lookbook',
        location: 'Студия WTMA',
        image: 'images/media/04-creative.webp'
      },
      {
        title: 'Инновационные прядильные станки',
        category: 'Индустриальный репортаж',
        location: 'Ферганская долина',
        image: 'images/media/02-videoshoot.webp'
      }
    ]
  },
  videoshoot: {
    num: '02',
    title: 'ВИДЕОСЪЁМКА',
    desc: 'Полный цикл видеопроизводства: презентационные фильмы, рекламные ролики, имиджевые видео и B2B презентации.',
    items: [
      {
        title: 'Имиджевый фильм: "Сила узбекского текстиля"',
        category: 'Имиджевое видео 4K Cinema',
        location: 'Ташкент / Самарканд',
        image: 'images/media/02-videoshoot.webp'
      },
      {
        title: 'Технологии прядения будущего',
        category: 'Корпоративный ролик',
        location: 'Андижанский текстильный парк',
        image: 'images/media/hero-bg.webp'
      },
      {
        title: 'Динамичный ролик для международной выставки',
        category: 'Promo Video / Reel',
        location: 'Heimtextil Frankfurt / WTMA',
        image: 'images/media/05-projects.webp'
      },
      {
        title: 'Истории мастеров: от волокна к шедевру',
        category: 'Документальный мини-фильм',
        location: 'Маргилан',
        image: 'images/media/01-photoshoot.webp'
      }
    ]
  },
  interview: {
    num: '03',
    title: 'ИНТЕРВЬЮ',
    desc: 'Серия глубоких экспертных бесед с лидерами отрасли, директорами фабрик, дизайнерами и государственными деятелями.',
    items: [
      {
        title: 'Диалог с лидером: Будущее экспорта текстиля',
        category: 'Студийный спецвыпуск',
        location: 'Медиа-студия WTMA',
        image: 'images/media/03-interview.webp'
      },
      {
        title: 'Технологический суверенитет текстильного кластера',
        category: 'Экспертная аналитика',
        location: 'Ташкент',
        image: 'images/media/05-projects.webp'
      },
      {
        title: 'Экологическая сертификация: взгляд инвестора',
        category: 'B2B Интервью',
        location: 'WTMA Summit',
        image: 'images/media/02-videoshoot.webp'
      },
      {
        title: 'Молодые дизайнеры и культурный код Востока',
        category: 'Fashion Talk',
        location: 'WTMA Media Hub',
        image: 'images/media/04-creative.webp'
      }
    ]
  },
  creative: {
    num: '04',
    title: 'КРЕАТИВНЫЙ КОНТЕНТ',
    desc: 'Разработка визуальной ДНК брендов, концептуальные кампейны, арт-дирекшн, 3D-моушн и контент для соцсетей.',
    items: [
      {
        title: 'Кампейн "Шёлковая невесомость"',
        category: 'Арт-кампейн и лукбук',
        location: 'Париж / Ташкент',
        image: 'images/media/04-creative.webp'
      },
      {
        title: 'Космический горизонт волокна',
        category: 'Концепт-арт и брендинг',
        location: 'WTMA Design Lab',
        image: 'images/media/prefooter-bg.webp'
      },
      {
        title: 'Digital-серия для европейского ритейла',
        category: 'Social Media & Ads',
        location: 'Digital Studio',
        image: 'images/media/01-photoshoot.webp'
      },
      {
        title: 'Капсульная коллекция денима',
        category: 'Urban Fashion Shoot',
        location: 'Ташкент',
        image: 'images/media/03-interview.webp'
      }
    ]
  },
  projects: {
    num: '05',
    title: 'МЕДИАПРОЕКТЫ',
    desc: 'Масштабные медиа-инициативы, освещение международных форумов, запуск отраслевых медиаплатформ и спецрепортажи.',
    items: [
      {
        title: 'Проект "Textile Crossroads: Uzbekistan to the World"',
        category: 'Международный медиапроект',
        location: 'Ташкент - Стамбул - Франкфурт',
        image: 'images/media/05-projects.webp'
      },
      {
        title: 'Освещение Ташкентской текстильной недели',
        category: 'Медиа-партнёрство & Прямой эфир',
        location: 'Узэкспоцентр',
        image: 'images/media/02-videoshoot.webp'
      },
      {
        title: 'Спецвыпуск WTMA Journal: Тренды 2026-2027',
        category: 'Издательский и цифровой проект',
        location: 'WTMA Editorial',
        image: 'images/media/03-interview.webp'
      },
      {
        title: 'Спецпроект: Фабрика 4.0 — Индустриальная автоматизация',
        category: 'Мультимедийный лонгрид',
        location: 'Навоийский кластер',
        image: 'images/media/hero-bg.webp'
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initLanguageDropdown();
  initMediaShowcaseModal();
  initContactModal();
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
 * 3. Language Dropdown
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
 * 4. Portfolio Showcase Lightbox Modal
 */
function initMediaShowcaseModal() {
  const modal = document.getElementById('mediaShowcaseModal');
  const modalClose = document.getElementById('mediaModalClose');
  const numElem = document.getElementById('modalShowcaseNum');
  const titleElem = document.getElementById('modalShowcaseTitle');
  const descElem = document.getElementById('modalShowcaseDesc');
  const galleryElem = document.getElementById('modalShowcaseGallery');

  if (!modal || !modalClose || !galleryElem) return;

  const openShowcase = (serviceKey) => {
    const data = MEDIA_SHOWCASE_DATA[serviceKey] || MEDIA_SHOWCASE_DATA.photoshoot;

    numElem.textContent = data.num;
    titleElem.textContent = data.title;
    descElem.textContent = data.desc;

    // Populate gallery items
    galleryElem.innerHTML = data.items
      .map(
        (item) => `
        <div class="gallery-card">
          <img src="${item.image}" alt="${item.title}" class="gallery-card-thumb" loading="lazy">
          <div class="gallery-card-info">
            <h4 class="gallery-card-title">${item.title}</h4>
            <div class="gallery-card-meta">
              <span>🏷️ ${item.category}</span>
              <span>📍 ${item.location}</span>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeShowcase = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Bind to cards
  const cards = document.querySelectorAll('.media-card');
  cards.forEach((card) => {
    const btn = card.querySelector('.btn-media-action');
    const serviceKey = btn ? btn.getAttribute('data-service-id') : 'photoshoot';

    card.addEventListener('click', (e) => {
      // If user clicks inside card or button, open showcase
      openShowcase(serviceKey);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openShowcase(serviceKey);
      }
    });
  });

  modalClose.addEventListener('click', closeShowcase);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeShowcase();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeShowcase();
    }
  });
}

/**
 * 5. Contact Modal
 */
function initContactModal() {
  const contactModal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('.open-contact-modal');
  const subjectSelect = document.getElementById('userSubject');
  const contactForm = document.getElementById('contactForm');

  if (!contactModal) return;

  const openContact = (subjectText) => {
    if (subjectSelect && subjectText) {
      for (let i = 0; i < subjectSelect.options.length; i++) {
        if (subjectSelect.options[i].text.toLowerCase().includes(subjectText.toLowerCase())) {
          subjectSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Close showcase modal if open
    const showcaseModal = document.getElementById('mediaShowcaseModal');
    if (showcaseModal && showcaseModal.classList.contains('is-open')) {
      showcaseModal.classList.remove('is-open');
    }

    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeContact = () => {
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subject = btn.getAttribute('data-subject') || 'Медиа и продакшн';
      openContact(subject);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeContact);
  }

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeContact();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('is-open')) {
      closeContact();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-form-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Отправка заявки...</span>';

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Заявка успешно принята! ✓</span>';
        submitBtn.style.backgroundColor = '#16a34a';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          closeContact();
        }, 1800);
      }, 1000);
    });
  }
}
