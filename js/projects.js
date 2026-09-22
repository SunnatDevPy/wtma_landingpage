/**
 * WTMA — Проекты (Projects) Page Interactive Logic
 * Category Filtering, Sorting, Case Study Modal, Header & Mobile Drawer
 */

const PROJECTS_DATA = {
  'tex-area': {
    num: '01',
    category: 'АНАЛИТИКА',
    title: 'TEX AREA',
    subtitle: 'Аналитическая платформа WTMA',
    image: 'images/projects/01-tex-area.webp',
    client: 'Отраслевой портал WTMA Analytics',
    direction: 'Отраслевая аналитика и мониторинг рынков',
    reach: '12+ стран, 500+ компаний, 10 000+ SKU',
    result: 'Единое аналитическое пространство для текстильной отрасли',
    story: 'Создание флагманской цифровой платформы с интерактивными графиками динамики цен на хлопок, пряжу и ткани, таможенной статистикой и торговыми потоками между ключевыми мировыми хабами.'
  },
  'molto-caldo': {
    num: '02',
    category: 'АНАЛИТИКА / МАРКЕТИНГ',
    title: 'WTMA × MOLTO CALDO',
    subtitle: 'Исследование рынка',
    image: 'images/projects/02-molto-caldo.webp',
    client: 'Бренд Molto Caldo (Timeless Apparel)',
    direction: 'Комплексный анализ рынка и запуск fashion-бренда',
    reach: 'Рынки СНГ, Европы и Ближнего Востока',
    result: 'Успешное позиционирование в премиальном сегменте трикотажа',
    story: 'Разработка стратегии выхода на международный рынок для премиального бренда одежды из натуральных волокон, анализ целевой аудитории, ценообразование и медийное сопровождение.'
  },
  'photoshoot': {
    num: '03',
    category: 'ПРОДАКШН',
    title: 'ПРОФЕССИОНАЛЬНАЯ СЪЁМКА',
    subtitle: 'Текстильное производство',
    image: 'images/projects/03-photoshoot.webp',
    client: 'Крупнейшие прядильно-ткацкие комбинаты',
    direction: 'Индустриальная и рекламная фото- и видеосъёмка',
    reach: '15+ фабрик, более 50 часов отснятого 4K-материала',
    result: 'Премиальный банк контента для международных экспозиций',
    story: 'Организация масштабного продакшна на текстильных фабриках: съёмка высокотехнологичного оборудования, макросъёмка волокон и полотен для презентаций зарубежным партнерам и байерам.'
  },
  'branding': {
    num: '04',
    category: 'МАРКЕТИНГ',
    title: 'БРЕНДИНГ И ПОЗИЦИОНИРОВАНИЕ',
    subtitle: 'Текстильные и fashion-бренды',
    image: 'images/projects/04-branding.webp',
    client: 'Текстильные кластеры и ритейл-бренды',
    direction: 'Разработка платформы бренда, нейминга и бренд-бука',
    reach: 'Комплексный гайдлайн, фирменная упаковка и полиграфия',
    result: 'Рост узнаваемости брендов и доверия на международных рынках',
    story: 'Создание целостной айдентики: от философии бренда и культурного кода до современной минималистичной полиграфии, упаковки и цифровых бренд-стандартов.'
  },
  'digital': {
    num: '05',
    category: 'DIGITAL',
    title: 'ВЕБ-ПЛАТФОРМЫ И DIGITAL-РЕШЕНИЯ',
    subtitle: 'Сайты, платформы, SMM',
    image: 'images/projects/05-digital.webp',
    client: 'B2B текстильные экспортеры и ассоциации',
    direction: 'Разработка веб-порталов, лидогенерация и продвижение',
    reach: 'Мультиязычные платформы с международным трафиком',
    result: 'Автоматизация B2B-заявок и заключение прямых контрактов',
    story: 'Проектирование и запуск современных веб-ресурсов с интерактивными каталогами тканей, B2B-калькуляторами заказов и интеграцией с международными CRM-системами.'
  },
  'international': {
    num: '06',
    category: 'БИЗНЕС-РАЗВИТИЕ',
    title: 'МЕЖДУНАРОДНЫЕ ПРОЕКТЫ',
    subtitle: 'Новые рынки и партнёрства',
    image: 'images/projects/06-international.webp',
    client: 'Национальные экспортные консорциумы',
    direction: 'Бизнес-миссии, выставки и B2B-нетворкинг',
    reach: 'Германия, Турция, Италия, ОАЭ, Китай, Казахстан',
    result: 'Контракты на сумму свыше $15 млн за прошедший сезон',
    story: 'Полное сопровождение делегаций на мировые выставки (Heimtextil, Premiere Vision), организация целевых B2B-встреч с европейскими текстильными ритейлерами и дистрибьюторами.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initLanguageDropdown();
  initCategoryFilter();
  initSortDropdown();
  initCaseStudyModal();
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
 * 4. Category Filtering System
 */
function initCategoryFilter() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.project-card');
  const grid = document.getElementById('projectsGrid');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter');

      // Animate grid filter transition
      if (grid) grid.style.opacity = '0.4';

      setTimeout(() => {
        cards.forEach((card) => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (filterVal === 'all' || cardCategories.includes(filterVal)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });

        if (grid) grid.style.opacity = '1';
      }, 150);
    });
  });
}

/**
 * 5. Sorting Dropdown System
 */
function initSortDropdown() {
  const sortWrapper = document.getElementById('sortWrapper');
  const sortToggle = document.getElementById('sortToggleBtn');
  const sortOptions = document.querySelectorAll('.sort-option');
  const sortLabel = document.getElementById('currentSortLabel');
  const grid = document.getElementById('projectsGrid');

  if (!sortWrapper || !sortToggle || !grid) return;

  sortToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sortWrapper.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!sortWrapper.contains(e.target)) {
      sortWrapper.classList.remove('open');
    }
  });

  sortOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      sortOptions.forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');

      const sortType = opt.getAttribute('data-sort');
      if (sortLabel) sortLabel.textContent = opt.textContent;
      sortWrapper.classList.remove('open');

      const cardsArray = Array.from(grid.querySelectorAll('.project-card'));

      if (sortType === 'num-asc') {
        cardsArray.sort((a, b) => {
          return parseInt(a.getAttribute('data-index'), 10) - parseInt(b.getAttribute('data-index'), 10);
        });
      } else if (sortType === 'category') {
        cardsArray.sort((a, b) => {
          return (a.getAttribute('data-category') || '').localeCompare(b.getAttribute('data-category') || '');
        });
      } else {
        cardsArray.sort((a, b) => {
          return parseInt(a.getAttribute('data-index'), 10) - parseInt(b.getAttribute('data-index'), 10);
        });
      }

      cardsArray.forEach((card) => grid.appendChild(card));
    });
  });
}

/**
 * 6. Case Study Detail Lightbox Modal
 */
function initCaseStudyModal() {
  const modal = document.getElementById('projectDetailModal');
  const closeBtn = document.getElementById('projectModalCloseBtn');
  const cards = document.querySelectorAll('.project-card');

  // Modal elements
  const numEl = document.getElementById('modalProjectNum');
  const catEl = document.getElementById('modalProjectCategory');
  const titleEl = document.getElementById('modalProjectTitle');
  const subEl = document.getElementById('modalProjectSubtitle');
  const imgEl = document.getElementById('modalHeroImg');
  const clientEl = document.getElementById('modalClient');
  const dirEl = document.getElementById('modalDirection');
  const reachEl = document.getElementById('modalReach');
  const resultEl = document.getElementById('modalResult');
  const storyEl = document.getElementById('modalProjectStory');

  if (!modal || !closeBtn) return;

  const openModal = (projectId) => {
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA['tex-area'];

    if (numEl) numEl.textContent = data.num;
    if (catEl) catEl.textContent = data.category;
    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (clientEl) clientEl.textContent = data.client;
    if (dirEl) dirEl.textContent = data.direction;
    if (reachEl) reachEl.textContent = data.reach;
    if (resultEl) resultEl.textContent = data.result;
    if (storyEl) storyEl.textContent = data.story;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  cards.forEach((card) => {
    const projectId = card.getAttribute('data-project-id');
    card.addEventListener('click', () => openModal(projectId));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(projectId);
      }
    });

    const ctaBtn = card.querySelector('.btn-card-cta');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(projectId);
      });
    }
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
