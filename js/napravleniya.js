/**
 * WTMA — Directions (Направления) Interactive Experience
 * 3D Book-Spread / Card-Turn System
 */

const DIRECTIONS_DATA = {
  1: {
    index: '01',
    id: 'marketing',
    title: 'МАРКЕТИНГ',
    tagline: 'Сильные бренды начинаются с правильной стратегии.',
    image: 'images/napravleniya/01-marketing.png',
    services: [
      'Маркетинговая стратегия',
      'Брендинг',
      'Позиционирование',
      'Продвижение',
      'Контент-маркетинг',
      'SMM',
      'Рекламные кампании',
      'Маркетинговый консалтинг'
    ]
  },
  2: {
    index: '02',
    id: 'analytics',
    title: 'АНАЛИТИКА',
    tagline: 'Данные, которые открывают возможности.',
    image: 'images/napravleniya/02-analytics.png',
    services: [
      'Анализ рынков',
      'Анализ стран',
      'Экспорт и импорт',
      'Производство',
      'Цены и динамика',
      'Конкурентный анализ',
      'Fashion-тренды',
      'Отраслевые исследования',
      'Прогнозирование'
    ]
  },
  3: {
    index: '03',
    id: 'production',
    title: 'ПРОДАКШН',
    tagline: 'Показываем индустрию такой, какая она есть.',
    image: 'images/napravleniya/03-production.png',
    services: [
      'Профессиональная фотосъёмка',
      'Видеопроизводство',
      'Съёмка производства',
      'Съёмка продукции',
      'Интервью',
      'Рекламные ролики',
      'Корпоративный контент',
      'Креативные кампании'
    ]
  },
  4: {
    index: '04',
    id: 'digital',
    title: 'DIGITAL',
    tagline: 'Цифровые решения для реального бизнеса.',
    image: 'images/napravleniya/04-digital.png',
    services: [
      'Разработка сайтов',
      'Landing Page',
      'Социальные сети',
      'Digital-маркетинг',
      'Digital-реклама',
      'SEO',
      'Digital-аналитика',
      'Контент для digital'
    ]
  },
  5: {
    index: '05',
    id: 'business',
    title: 'БИЗНЕС-РАЗВИТИЕ',
    tagline: 'Открываем новые рынки и создаём партнёрства.',
    image: 'images/napravleniya/05-business.png',
    services: [
      'Выход на новые рынки',
      'Международное развитие',
      'B2B-связи',
      'Поиск партнёров',
      'Экспортное развитие',
      'Бизнес-миссии',
      'Международные мероприятия',
      'Деловые визиты'
    ]
  }
};

let currentActiveIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
  initDirectionCards();
  initBookTabs();
  initBackButton();
  initLanguageDropdown();
  initMobileMenu();
  initHeaderScroll();
  checkHashOnLoad();
});

/**
 * 1. Initialize Direction Cards Click Handlers
 */
function initDirectionCards() {
  const cards = document.querySelectorAll('.direction-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const dirIndex = parseInt(card.getAttribute('data-index'), 10);
      if (dirIndex && DIRECTIONS_DATA[dirIndex]) {
        // Visual card turn before opening book spread
        card.classList.add('card-turning');
        setTimeout(() => {
          openDirectionBook(dirIndex);
          card.classList.remove('card-turning');
        }, 180);
      }
    });
  });

  // CTA button in overview to open first direction
  const ctaBtn = document.getElementById('overviewCtaBtn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDirectionBook(1);
    });
  }
}

/**
 * 2. Open 3D Book-Spread View for a Direction
 */
function openDirectionBook(dirIndex) {
  const data = DIRECTIONS_DATA[dirIndex];
  if (!data) return;

  currentActiveIndex = dirIndex;

  const overviewStage = document.getElementById('overviewStage');
  const bookStageWrapper = document.getElementById('bookStageWrapper');
  const bookSpreadContainer = document.getElementById('bookSpreadContainer');

  // Populate Left Page
  const leftBgImg = document.getElementById('bookLeftImg');
  const leftNum = document.getElementById('bookLeftNum');
  const leftTitle = document.getElementById('bookLeftTitle');
  const leftTagline = document.getElementById('bookLeftTagline');

  if (leftBgImg) leftBgImg.src = data.image;
  if (leftNum) leftNum.textContent = data.index;
  if (leftTitle) leftTitle.textContent = data.title;
  if (leftTagline) leftTagline.textContent = data.tagline;

  // Populate Right Page (Services list)
  const servicesListContainer = document.getElementById('servicesListContainer');
  if (servicesListContainer) {
    servicesListContainer.innerHTML = '';
    data.services.forEach((serviceName, idx) => {
      const serviceRow = document.createElement('div');
      serviceRow.className = 'service-row-item';
      serviceRow.style.animation = `fadeInUp 0.35s ease forwards ${(idx * 0.04) + 0.15}s`;
      serviceRow.style.opacity = '0';
      serviceRow.innerHTML = `
        <div class="service-item-left">
          <span class="service-num">${String(idx + 1).padStart(2, '0')}</span>
          <span class="service-name">${serviceName}</span>
        </div>
        <span class="service-arrow">→</span>
      `;
      servicesListContainer.appendChild(serviceRow);
    });
  }

  // Update tabs
  updateActiveTab(dirIndex);

  // Trigger 3D Book Flip Animation
  if (overviewStage) {
    overviewStage.classList.add('hidden-view');
  }

  if (bookStageWrapper) {
    bookStageWrapper.classList.add('active-view');
  }

  // Reset and trigger page 3D book flip animations
  if (bookSpreadContainer) {
    bookSpreadContainer.classList.remove('book-closing');
    const pageLeft = bookSpreadContainer.querySelector('.book-page-left');
    const pageRight = bookSpreadContainer.querySelector('.book-page-right');
    if (pageLeft) {
      pageLeft.style.animation = 'none';
      pageLeft.offsetHeight; // reflow
      pageLeft.style.animation = 'bookLeftPageFlip 0.72s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }
    if (pageRight) {
      pageRight.style.animation = 'none';
      pageRight.offsetHeight; // reflow
      pageRight.style.animation = 'bookRightPageFlip 0.76s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }
  }

  // Update URL hash
  window.history.replaceState(null, '', `#${data.id}`);

  // Scroll smoothly to book position
  window.scrollTo({ top: 40, behavior: 'smooth' });
}

/**
 * 3. Close 3D Book Spread & Return to 5 Cards
 */
function closeDirectionBook() {
  const overviewStage = document.getElementById('overviewStage');
  const bookStageWrapper = document.getElementById('bookStageWrapper');
  const bookSpreadContainer = document.getElementById('bookSpreadContainer');

  if (bookSpreadContainer) {
    bookSpreadContainer.classList.add('book-closing');
  }

  // Smoothly unfold cards while the 3D book is folding closed
  if (overviewStage) {
    overviewStage.classList.remove('hidden-view');
    overviewStage.style.animation = 'none';
    overviewStage.offsetHeight; // reflow
    overviewStage.style.animation = 'overviewReturn 0.44s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  }

  setTimeout(() => {
    if (bookStageWrapper) {
      bookStageWrapper.classList.remove('active-view');
    }
    if (bookSpreadContainer) {
      bookSpreadContainer.classList.remove('book-closing');
    }

    // Clear hash
    window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 420);
}

/**
 * 4. Back Button Handlers
 */
function initBackButton() {
  const backBtn = document.getElementById('bookBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDirectionBook();
    });
  }

  // Keyboard shortcut: ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const bookStageWrapper = document.getElementById('bookStageWrapper');
      if (bookStageWrapper && bookStageWrapper.classList.contains('active-view')) {
        closeDirectionBook();
      }
    } else if (e.key === 'ArrowRight') {
      const bookStageWrapper = document.getElementById('bookStageWrapper');
      if (bookStageWrapper && bookStageWrapper.classList.contains('active-view')) {
        const nextIdx = currentActiveIndex >= 5 ? 1 : currentActiveIndex + 1;
        openDirectionBook(nextIdx);
      }
    } else if (e.key === 'ArrowLeft') {
      const bookStageWrapper = document.getElementById('bookStageWrapper');
      if (bookStageWrapper && bookStageWrapper.classList.contains('active-view')) {
        const prevIdx = currentActiveIndex <= 1 ? 5 : currentActiveIndex - 1;
        openDirectionBook(prevIdx);
      }
    }
  });
}

/**
 * 5. Top Tabs in Book to switch between directions
 */
function initBookTabs() {
  const tabBtns = document.querySelectorAll('.dir-tab-btn');
  tabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      const dirIndex = parseInt(tab.getAttribute('data-index'), 10);
      if (dirIndex && DIRECTIONS_DATA[dirIndex]) {
        openDirectionBook(dirIndex);
      }
    });
  });
}

function updateActiveTab(activeIdx) {
  const tabBtns = document.querySelectorAll('.dir-tab-btn');
  tabBtns.forEach((tab) => {
    const idx = parseInt(tab.getAttribute('data-index'), 10);
    if (idx === activeIdx) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

/**
 * 6. Check URL Hash on Load
 */
function checkHashOnLoad() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (!hash) return;

  for (const [idxStr, data] of Object.entries(DIRECTIONS_DATA)) {
    if (data.id === hash) {
      openDirectionBook(parseInt(idxStr, 10));
      break;
    }
  }
}

/**
 * 7. Header Scroll logic (Hide on scroll down, reveal on scroll up)
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
 * 8. Language Dropdown
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
 * 9. Mobile Menu
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
