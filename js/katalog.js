/**
 * WTMA — Каталог (TEX AREA) Interactive Scripts
 * Handles edition modal previews, presentation viewer, header behaviors & search.
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
  const siteHeader = document.getElementById('siteHeader');
  const burgerToggle = document.getElementById('burgerToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('is-scrolled');
    } else {
      siteHeader?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (burgerToggle && mobileNavOverlay) {
    burgerToggle.addEventListener('click', () => {
      const isOpen = burgerToggle.getAttribute('aria-expanded') === 'true';
      burgerToggle.setAttribute('aria-expanded', !isOpen);
      burgerToggle.classList.toggle('is-active');
      mobileNavOverlay.classList.toggle('is-active');
      document.body.classList.toggle('no-scroll', !isOpen);
    });
  }

  // Language Selector
  const langSelector = document.getElementById('langSelector');
  if (langSelector) {
    const langBtn = langSelector.querySelector('.lang-btn');
    langBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', !isExpanded);
      langSelector.classList.toggle('is-open');
    });

    document.addEventListener('click', () => {
      langBtn?.setAttribute('aria-expanded', 'false');
      langSelector.classList.remove('is-open');
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
    searchModal?.classList.add('is-open');
    searchModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchModal?.classList.remove('is-open');
    searchModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (searchInput) searchInput.value = '';
    if (searchResultsContainer) searchResultsContainer.innerHTML = '';
  }

  searchBtn?.addEventListener('click', openSearch);
  searchModalClose?.addEventListener('click', closeSearch);
  searchModalBackdrop?.addEventListener('click', closeSearch);

  // Search filter implementation
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
      searchResultsContainer.innerHTML = `<p class="search-empty">По запросу «${query}» ничего не найдено. Попробуйте другой термин.</p>`;
    } else {
      searchResultsContainer.innerHTML = `
        <div class="search-results-list">
          ${matches.map(m => `
            <div class="search-result-item" data-edition="${m.vol.replace('VOL. ', '')}">
              <img src="${m.cover}" alt="${m.title}" class="search-thumb">
              <div>
                <span class="search-vol">${m.vol}</span>
                <h4>${m.title} — ${m.theme}</h4>
                <p>${m.desc.slice(0, 110)}...</p>
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
    editionModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeEditionModal() {
    editionModal?.classList.remove('is-open');
    editionModal?.setAttribute('aria-hidden', 'true');
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

  // ==================== 5. PRESENTATION MODAL ====================
  const presentationModal = document.getElementById('presentationModal');
  const btnOpenPresentation = document.getElementById('btnOpenPresentation');
  const presentationModalCloseBtn = document.getElementById('presentationModalCloseBtn');

  function openPresentationModal() {
    presentationModal?.classList.add('is-open');
    presentationModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closePresentationModal() {
    presentationModal?.classList.remove('is-open');
    presentationModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  btnOpenPresentation?.addEventListener('click', openPresentationModal);
  presentationModalCloseBtn?.addEventListener('click', closePresentationModal);
  presentationModal?.addEventListener('click', (e) => {
    if (e.target === presentationModal) closePresentationModal();
  });

  // Global ESC key listener to close active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (editionModal?.classList.contains('is-open')) closeEditionModal();
      if (presentationModal?.classList.contains('is-open')) closePresentationModal();
      if (searchModal?.classList.contains('is-open')) closeSearch();
    }
  });

  // ==================== 6. SUBTLE 3D TILT ON HERO PYRAMID ====================
  const heroPyramidWrapper = document.getElementById('heroPyramidWrapper');
  const pyramidImg = heroPyramidWrapper?.querySelector('.pyramid-img');

  if (heroPyramidWrapper && pyramidImg && window.innerWidth > 992) {
    heroPyramidWrapper.addEventListener('mousemove', (e) => {
      const rect = heroPyramidWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      pyramidImg.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });

    heroPyramidWrapper.addEventListener('mouseleave', () => {
      pyramidImg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }
});
