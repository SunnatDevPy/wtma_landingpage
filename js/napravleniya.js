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
    image: 'images/napravleniya/01-marketing.webp',
    services: [
      {
        num: '01',
        name: 'Маркетинговая стратегия',
        desc: 'Определяем цели маркетинга, приоритетные направления и план развития компании. Связываем маркетинговые решения с конкретными бизнес-задачами.'
      },
      {
        num: '02',
        name: 'Брендинг',
        desc: 'Разрабатываем основу бренда: концепцию, визуальную идентичность и систему коммуникации. Создаём единый образ компании для всех точек контакта.'
      },
      {
        num: '03',
        name: 'Позиционирование',
        desc: 'Определяем, чем компания отличается от конкурентов и какую ценность предлагает рынку. Формируем чёткое восприятие бренда для выбранного сегмента.'
      },
      {
        num: '04',
        name: 'Контент-маркетинг',
        desc: 'Создаём систему экспертного и коммерческого контента для коммуникации с рынком. Определяем темы, форматы и содержание в соответствии с задачами компании.'
      },
      {
        num: '05',
        name: 'SMM',
        desc: 'Выстраиваем присутствие компании в социальных сетях: площадки, публикации, визуальная подача и коммуникация с аудиторией. Адаптируем содержание под специфику каждой платформы.'
      },
      {
        num: '06',
        name: 'Рекламные кампании',
        desc: 'Планируем и реализуем платные кампании для привлечения целевой аудитории и достижения конкретных показателей. Определяем сегменты, сообщения, каналы и параметры кампаний.'
      },
      {
        num: '07',
        name: 'Маркетинговый консалтинг',
        desc: 'Проводим независимую оценку маркетинговой системы компании. Выявляем проблемы и возможности и предлагаем конкретные решения для её совершенствования.'
      }
    ]
  },
  2: {
    index: '02',
    id: 'analytics',
    title: 'АНАЛИТИКА',
    tagline: 'Данные, которые открывают возможности.',
    image: 'images/napravleniya/02-analytics.webp',
    services: [
      {
        num: '01',
        name: 'Анализ рынка',
        desc: 'Исследуем объём, структуру, динамику и ключевые тенденции выбранного рынка. Определяем его состояние, потенциал и основные факторы развития.'
      },
      {
        num: '02',
        name: 'Анализ потребителей',
        desc: 'Изучаем целевую аудиторию: потребности, поведение, критерии выбора и факторы, влияющие на покупку. Помогаем понять, для кого и под какие потребности развивается продукт.'
      },
      {
        num: '03',
        name: 'Конкурентный анализ',
        desc: 'Исследуем основных игроков рынка, их предложения, цены, преимущества и стратегии. Определяем конкурентную среду и возможности для дифференциации.'
      },
      {
        num: '04',
        name: 'Анализ внешних рынков',
        desc: 'Исследуем зарубежные страны для оценки возможностей выхода и развития бизнеса. Анализируем спрос, структуру рынка, барьеры, условия торговли и потенциальные направления.'
      },
      {
        num: '05',
        name: 'Анализ экспорта и импорта',
        desc: 'Изучаем международные торговые потоки по товарам, странам и периодам. Определяем ключевых поставщиков и покупателей, объёмы торговли и изменения спроса.'
      },
      {
        num: '06',
        name: 'Ценовая аналитика',
        desc: 'Отслеживаем цены и их динамику по товарам, рынкам и периодам. Выявляем факторы изменения стоимости и ориентиры для принятия коммерческих решений.'
      },
      {
        num: '07',
        name: 'Прогнозирование',
        desc: 'На основе исторических данных и рыночных факторов оцениваем возможные сценарии дальнейшего развития. Формируем прогнозы по спросу, ценам, объёмам и ключевым показателям.'
      }
    ]
  },
  3: {
    index: '03',
    id: 'production',
    title: 'ПРОДАКШН',
    tagline: 'Показываем индустрию такой, какая она есть.',
    image: 'images/napravleniya/03-production.webp',
    services: [
      {
        num: '01',
        name: 'Фотопродакшн',
        desc: 'Создание профессионального фотоконтента для брендов, продукции, каталогов, кампаний и коммерческих коммуникаций.'
      },
      {
        num: '02',
        name: 'Видеопродакшн',
        desc: 'Производство видеоконтента от разработки сценария и организации съёмки до монтажа и готового материала.'
      },
      {
        num: '03',
        name: 'Съёмка производства',
        desc: 'Визуальная съёмка фабрик, предприятий, оборудования и производственных процессов. Показываем реальные мощности и технологический уровень компании.'
      },
      {
        num: '04',
        name: 'Рекламный контент',
        desc: 'Создание фото- и видеоматериалов, предназначенных непосредственно для продвижения продукта или бренда. Контент разрабатывается под конкретные рекламные задачи и каналы.'
      },
      {
        num: '05',
        name: 'Корпоративный контент',
        desc: 'Создание визуальных материалов о компании, руководстве, команде, экспертах и деятельности бизнеса. Используется для презентаций, сайта, социальных сетей и B2B-коммуникаций.'
      },
      {
        num: '06',
        name: 'Постпродакшн',
        desc: 'Финальная обработка созданных материалов: монтаж, цветокоррекция, ретушь, графика, звук и адаптация под необходимые форматы.'
      }
    ]
  },
  4: {
    index: '04',
    id: 'digital',
    title: 'DIGITAL',
    tagline: 'Цифровые решения для реального бизнеса.',
    image: 'images/napravleniya/04-digital.webp',
    services: [
      {
        num: '01',
        name: 'Веб-разработка',
        desc: 'Создаём сайты и цифровые платформы для бизнеса — от структуры и интерфейса до технической реализации. Разрабатываем корпоративные сайты, каталоги и Landing Page.'
      },
      {
        num: '02',
        name: 'UX/UI-дизайн',
        desc: 'Проектируем структуру и интерфейс цифровых продуктов с учётом задач бизнеса и поведения пользователей. Создаём понятный и визуально цельный пользовательский опыт.'
      },
      {
        num: '03',
        name: 'SEO',
        desc: 'Повышаем видимость сайта в поисковых системах и привлекаем органический трафик. Оптимизируем структуру, технические параметры и содержание сайта.'
      },
      {
        num: '04',
        name: 'GEO',
        desc: 'Повышаем представленность компании в ответах поисковых систем и генеративных ИИ-сервисов. Оптимизируем цифровые материалы, структуру и данные компании для корректного распознавания, отображения и рекомендаций в AI-поиске.'
      },
      {
        num: '05',
        name: 'Техническая поддержка',
        desc: 'Поддерживаем работоспособность цифровых продуктов после запуска. Выполняем обновления, исправления, оптимизацию и техническое сопровождение.'
      }
    ]
  },
  5: {
    index: '05',
    id: 'business',
    title: 'БИЗНЕС-РАЗВИТИЕ',
    tagline: 'Открываем новые рынки и создаём партнёрства.',
    image: 'images/napravleniya/05-business.webp',
    services: [
      {
        num: '01',
        name: 'Выход на новые рынки',
        desc: 'Разрабатываем и сопровождаем выход компании на новые географические рынки. Определяем направления, точки входа и последовательность действий для запуска.'
      },
      {
        num: '02',
        name: 'B2B-партнёрства',
        desc: 'Находим потенциальных клиентов, поставщиков и стратегических партнёров. Выстраиваем деловые контакты и создаём основу для долгосрочного сотрудничества.'
      },
      {
        num: '03',
        name: 'Экспортное развитие',
        desc: 'Помогаем компаниям расширять экспортные направления и находить новые возможности для международных поставок. Определяем перспективные рынки и направления развития.'
      },
      {
        num: '04',
        name: 'Международные деловые программы',
        desc: 'Организуем и сопровождаем бизнес-миссии, деловые визиты и участие в международных мероприятиях. Создаём возможности для прямых переговоров и установления новых деловых контактов.'
      }
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
    data.services.forEach((service, idx) => {
      const serviceRow = document.createElement('div');
      serviceRow.className = 'service-row-item';
      serviceRow.style.animation = `fadeInUp 0.35s ease forwards ${(idx * 0.04) + 0.15}s`;
      serviceRow.style.opacity = '0';
      serviceRow.innerHTML = `
        <div class="service-item-left">
          <span class="service-num">${service.num || String(idx + 1).padStart(2, '0')}</span>
          <div class="service-item-content">
            <h3 class="service-name">${service.name}</h3>
            <p class="service-desc">${service.desc}</p>
          </div>
        </div>
        <span class="service-arrow" aria-hidden="true">→</span>
      `;

      // Allow clicking row to redirect to contacts with service pre-selected
      serviceRow.addEventListener('click', () => {
        window.location.href = `contacts.html?service=${encodeURIComponent(service.name)}`;
      });

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
