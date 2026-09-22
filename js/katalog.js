/**
 * WTMA — Каталог (TEX AREA) Interactive Scripts
 * Handles edition modal previews, header behaviors & quick search.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. EDITIONS DATA REPOSITORY ====================
  const EDITIONS_DATA = {
    '01': {
      vol: 'VOL. 01',
      title: 'TEX AREA 01',
      theme: 'New Markets, Logistics, Technology Reports',
      cover: 'images/katalog/tex_area_01.webp',
      fallbackCover: 'images/katalog/tex_area_01.png',
      desc: 'Комплексный стратегический обзор новых экспортных направлений, цепочек поставок, таможенных преференций и новейших технологических внедрений в текстильном кластере Центральной Азии и Европы.',
      topics: [
        'Новые глобальные рынки сбыта: ЕС, Великобритания, Ближний Восток',
        'Оптимизация мультимодальной логистики текстильной продукции',
        'Технологические инновации автоматизации прядильного и ткацкого производства',
        'Аналитический отчёт по экспортным субсидиям и сертификации GSP+'
      ]
    },
    '02': {
      vol: 'VOL. 02',
      title: 'TEX AREA 02',
      theme: 'Cotton Textile, Color Trends & Sustainable Fashion',
      cover: 'images/katalog/tex_area_02.webp',
      fallbackCover: 'images/katalog/tex_area_02.png',
      desc: 'Глубокий отраслевой анализ цепочки переработки натурального хлопка, тренды окрашивания, экологическая сертификация и интеграция традиционного текстиля в мировой high-fashion.',
      topics: [
        'Глобальный баланс спроса и предложения на длинноволокнистый хлопок',
        'Цветовые тренды и палитры сезона от ведущих мировых тренд-бюро',
        'Экологические стандарты: OEKO-TEX, GOTS, Better Cotton Initiative',
        'Национальные текстильные паттерны в современных мировых коллекциях'
      ]
    },
    '03': {
      vol: 'VOL. 03',
      title: 'TEX AREA 03',
      theme: 'Apparel 50, Future of Yarn & Saida Amir Exclusive',
      cover: 'images/katalog/tex_area_03.webp',
      fallbackCover: 'images/katalog/tex_area_03.png',
      desc: 'Рейтинг топ-50 производителей готовой одежды, прогноз развития прядильного сегмента, налогообложение VAT в ЕС и эксклюзивное интервью с дизайнером Saida Amir.',
      topics: [
        'Рейтинг «Apparel 50»: ключевые игроки и бенчмарки эффективности',
        'Future of Yarn: смесовые инновационные пряжи и функциональные волокна',
        'Тонкости налогообложения и НДС (VAT) при экспорте швейных изделий в ЕС',
        'Большое интервью: Saida Amir о культурном коде в мировой моде'
      ]
    },
    '04': {
      vol: 'VOL. 04',
      title: 'TEX AREA 04',
      theme: 'Dyed Yarn, Denim & Leather Production Trends',
      cover: 'images/katalog/tex_area_04.webp',
      fallbackCover: 'images/katalog/tex_area_04.png',
      desc: 'Специальный выпуск, посвящённый развитию сегментов окрашенной пряжи, денима, кожевенного производства и готовых капсульных линеек.',
      topics: [
        'Технологии устойчивого крашения пряжи без водопотерь',
        'Мировой рынок денима: тренды посадок, стирок и плотностей',
        'Интеграция кожевенного и обувного сектора в общую текстильную экосистему',
        'Создание экспортно-ориентированных капсульных коллекций'
      ]
    },
    '05': {
      vol: 'VOL. 05',
      title: 'TEX AREA 05',
      theme: 'Architectural Textiles & High-Tech Structural Materials',
      cover: 'images/katalog/tex_area_05.webp',
      fallbackCover: 'images/katalog/tex_area_05.png',
      desc: 'Исследование применения технических и архитектурных тканей, натяжных мембранных конструкций и композитных волокон в современной инфраструктуре.',
      topics: [
        'Мембранные ткани и композиты для архитектурных проектов',
        'Высокопрочные волокна и геосинтетические текстильные материалы',
        'Акустический текстиль и огнеупорные интерьерные решения',
        'Перспективы инвестиций в производство технических тканей'
      ]
    },
    '06': {
      vol: 'VOL. 06',
      title: 'TEX AREA 06',
      theme: 'Innovative Weaving, Textured Fabrics & Raw Materials',
      cover: 'images/katalog/tex_area_06.webp',
      fallbackCover: 'images/katalog/tex_area_06.png',
      desc: 'Энциклопедия инновационных переплетений, фактурных жаккардов, трикотажных полотен и новых полимерных волокон высокой плотности.',
      topics: [
        'Трёхмерное ткачество и фактурные рельефные полотна нового поколения',
        'Переработка вторичного сырья: рециклированный полиэстер и регенерированный хлопок',
        'Лабораторный контроль качества: стойкость к пиллингу, разрыву и выцветанию',
        'Автоматизация ткацких станков с компьютерным зрением'
      ]
    },
    '07': {
      vol: 'VOL. 07',
      title: 'TEX AREA 07',
      theme: 'Outerwear Trends & Premium Global Silhouettes',
      cover: 'images/katalog/tex_area_07.webp',
      fallbackCover: 'images/katalog/tex_area_07.png',
      desc: 'Анализ сектора верхней одежды: мембранные ткани, пуховые наполнители, гидрофобные пропитки и глобальный спрос в осенне-зимних сезонах.',
      topics: [
        'Тренды кроя и силуэтов в премиальном сегменте верхней одежды',
        'DWR-покрытия без содержания фтора (PFC-free) и мембранные слои',
        'Оптимизация раскроя и технологических линий пошива пуховиков и курток',
        'Аналитика продаж верхней одежды на европейских маркетплейсах'
      ]
    },
    '08': {
      vol: 'VOL. 08',
      title: 'TEX AREA 08',
      theme: 'Deep Indigo, Micro-Weave Mastery & Modern Finishes',
      cover: 'images/katalog/tex_area_08.webp',
      fallbackCover: 'images/katalog/tex_area_08.png',
      desc: 'Премиальные отделки тканей: глубокий индиго, мерсеризация, энзимная стирка и нанопокрытия для придания текстилю уникальных тактильных свойств.',
      topics: [
        'Культура и химия пигмента Индиго: от крашения до старения полотна',
        'Микроструктурный анализ плотных саржевых и диагональных переплетений',
        'Биополировка и энзимные обработки без вреда для экологии',
        'Кастомизация тканей под премиальные бренды одежды'
      ]
    }
  };

  // ==================== 2. HEADER & NAVIGATION ====================
  // Sticky scroll-aware header
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    let lastScrollY = window.scrollY;
    let isHidden = false;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY > 120 && scrollDelta > 6) {
        if (!isHidden) {
          siteHeader.classList.add('header-hidden');
          isHidden = true;
        }
      } else if (scrollDelta < -6 || currentScrollY <= 60) {
        if (isHidden) {
          siteHeader.classList.remove('header-hidden');
          isHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // Burger and Mobile Drawer
  const burgerToggle = document.getElementById('burgerToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (burgerToggle && mobileDrawer) {
    burgerToggle.addEventListener('click', () => {
      burgerToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    const drawerLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        burgerToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Language Selector
  const langSelector = document.getElementById('langSelector');
  const langToggle = document.getElementById('langToggle');
  const langOptions = document.querySelectorAll('.lang-option');

  if (langSelector && langToggle) {
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
        const span = langToggle.querySelector('span');
        if (span) span.textContent = text;
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

  // ==================== 3. SEARCH MODAL ====================
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchModalClose = document.getElementById('searchModalClose');
  const searchModalBackdrop = document.getElementById('searchModalBackdrop');
  const searchInput = document.getElementById('searchInput');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (searchInput) searchInput.value = '';
    if (searchResultsContainer) searchResultsContainer.innerHTML = '';
  }

  searchBtn?.addEventListener('click', openSearch);
  searchModalClose?.addEventListener('click', closeSearch);
  searchModalBackdrop?.addEventListener('click', closeSearch);

  function executeSearch(query) {
    if (!searchResultsContainer) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResultsContainer.innerHTML = '';
      return;
    }

    const matches = [];
    Object.keys(EDITIONS_DATA).forEach(key => {
      const ed = EDITIONS_DATA[key];
      const matchInTheme = ed.theme.toLowerCase().includes(q);
      const matchInDesc = ed.desc.toLowerCase().includes(q);
      const matchInTopics = ed.topics.some(t => t.toLowerCase().includes(q));
      if (matchInTheme || matchInDesc || matchInTopics || ed.title.toLowerCase().includes(q)) {
        matches.push(ed);
      }
    });

    if (matches.length === 0) {
      searchResultsContainer.innerHTML = `<p style="padding:16px;color:#94a3b8;font-size:13px;">По запросу «${query}» ничего не найдено.</p>`;
    } else {
      searchResultsContainer.innerHTML = `
        <div class="search-results-list">
          ${matches.map(m => `
            <div class="search-result-item" data-edition="${m.vol.replace('VOL. ', '')}">
              <img src="${m.cover}" alt="${m.title}" class="search-thumb">
              <div>
                <span style="font-size:10px;font-weight:700;letter-spacing:0.12em;color:#e5a93c;">${m.vol}</span>
                <h4 style="margin:2px 0 4px;font-size:13px;color:#ffffff;">${m.title} — ${m.theme}</h4>
                <p style="margin:0;font-size:11px;color:#94a3b8;">${m.desc.slice(0, 95)}...</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      searchResultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const edNum = item.getAttribute('data-edition');
          closeSearch();
          openEditionModal(edNum);
        });
      });
    }
  }

  searchInput?.addEventListener('input', (e) => {
    executeSearch(e.target.value);
  });

  document.querySelectorAll('.quick-tag').forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      const tag = tagBtn.getAttribute('data-tag');
      if (searchInput) {
        searchInput.value = tag;
        executeSearch(tag);
      }
    });
  });

  // ==================== 4. EDITION DETAIL MODAL ====================
  const editionModal = document.getElementById('editionModal');
  const editionModalCloseBtn = document.getElementById('editionModalCloseBtn');
  const modalBackBtn = document.getElementById('modalBackBtn');
  const modalCoverImg = document.getElementById('modalCoverImg');
  const modalVolBadge = document.getElementById('modalVolBadge');
  const modalEditionTitle = document.getElementById('modalEditionTitle');
  const modalEditionTheme = document.getElementById('modalEditionTheme');
  const modalEditionDesc = document.getElementById('modalEditionDesc');
  const modalTopicsList = document.getElementById('modalTopicsList');

  function openEditionModal(editionNum) {
    const data = EDITIONS_DATA[editionNum];
    if (!data) return;

    if (modalCoverImg) {
      modalCoverImg.src = data.cover;
      modalCoverImg.alt = `${data.title} Cover`;
      modalCoverImg.onerror = () => {
        modalCoverImg.src = data.fallbackCover;
      };
    }
    if (modalVolBadge) modalVolBadge.textContent = data.vol;
    if (modalEditionTitle) modalEditionTitle.textContent = data.title;
    if (modalEditionTheme) modalEditionTheme.textContent = data.theme;
    if (modalEditionDesc) modalEditionDesc.textContent = data.desc;

    if (modalTopicsList) {
      modalTopicsList.innerHTML = data.topics.map(t => `<li>${t}</li>`).join('');
    }

    editionModal?.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  function closeEditionModal() {
    editionModal?.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  // Bind click on all 8 cards
  document.querySelectorAll('.katalog-card').forEach(card => {
    const editionNum = card.getAttribute('data-edition');
    card.addEventListener('click', () => openEditionModal(editionNum));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEditionModal(editionNum);
      }
    });
  });

  editionModalCloseBtn?.addEventListener('click', closeEditionModal);
  modalBackBtn?.addEventListener('click', closeEditionModal);
  editionModal?.addEventListener('click', (e) => {
    if (e.target === editionModal) closeEditionModal();
  });

  // Global ESC listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEditionModal();
      closeSearch();
      mobileDrawer?.classList.remove('open');
      burgerToggle?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });

  // Smooth scroll for Presentation button
  const btnHeroPresentation = document.getElementById('btnHeroPresentation');
  btnHeroPresentation?.addEventListener('click', (e) => {
    e.preventDefault();
    const grid = document.getElementById('katalogGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
