/**
 * WTMA — World Textile Marketing Agency
 * Login Page Interactive Logic
 * Handles password visibility toggle, error handling, validation, and i18n
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. I18N DICTIONARY ====================
  const TRANSLATIONS = {
    RU: {
      navAbout: 'О WTMA',
      navDirections: 'Направления',
      navProjects: 'Проекты',
      navKatalog: 'Каталог',
      navMedia: 'Медиа',
      navContacts: 'Контакты',
      btnContact: 'Связаться',
      badge: 'ПОРТАЛ WTMA',
      title: 'Вход в систему',
      subtitle: 'Единый портал аналитики и партнёрской сети WTMA',
      labelLogin: 'Логин или Email',
      placeholderLogin: 'partner@wtma.uz или логин',
      labelPassword: 'Пароль',
      placeholderPassword: '••••••••••••',
      forgotPassword: 'Забыли пароль?',
      showPassword: 'Показать пароль',
      hidePassword: 'Скрыть пароль',
      rememberMe: 'Запомнить меня',
      btnSubmit: 'Войти в систему',
      btnSubmitting: 'Проверка данных...',
      demoLabel: 'Демо-доступ:',
      btnFillDemo: 'Заполнить демо',
      noAccount: 'Нет учётной записи?',
      applyPartner: 'Подать заявку на партнерство',
      secEncrypted: '256-bit SSL шифрование',
      secAlliance: 'Сеть WTMA Alliance',
      secCompliance: 'ISO 27001 Стандарт',
      errEmpty: 'Пожалуйста, заполните логин и пароль.',
      errBadTitle: 'Неверный логин или пароль',
      errBadDesc: 'Введённые данные не совпадают. Нажмите на иконку глаза (👁), чтобы проверить введённый пароль и исправить опечатку.',
      successTitle: 'Успешный вход!',
      successDesc: 'Добро пожаловать в портал WTMA. Перенаправление...'
    },
    UZ: {
      navAbout: 'WTMA haqida',
      navDirections: 'Yo‘nalishlar',
      navProjects: 'Loyihalar',
      navKatalog: 'Katalog',
      navMedia: 'Media',
      navContacts: 'Bog‘lanish',
      btnContact: 'Bog‘lanish',
      badge: 'WTMA PORTALI',
      title: 'Tizimga kirish',
      subtitle: 'WTMA tahliliy va hamkorlar tarmog‘ining yagona portali',
      labelLogin: 'Login yoki Email',
      placeholderLogin: 'partner@wtma.uz yoki login',
      labelPassword: 'Parol',
      placeholderPassword: '••••••••••••',
      forgotPassword: 'Parolni unutdingizmi?',
      showPassword: 'Parolni ko‘rsatish',
      hidePassword: 'Parolni yashirish',
      rememberMe: 'Eslab qolish',
      btnSubmit: 'Tizimga kirish',
      btnSubmitting: 'Tekshirilmoqda...',
      demoLabel: 'Demo-kirish:',
      btnFillDemo: 'Demo bilan to‘ldirish',
      noAccount: 'Akkauntingiz yo‘qmi?',
      applyPartner: 'Hamkorlik uchun ariza topshirish',
      secEncrypted: '256-bit SSL himoyalangan',
      secAlliance: 'WTMA Alliance tarmog‘i',
      secCompliance: 'ISO 27001 Standarti',
      errEmpty: 'Iltimos, login va parolni kiriting.',
      errBadTitle: 'Noto‘g‘ri login yoki parol',
      errBadDesc: 'Kiritilgan maʼlumotlar mos kelmadi. Parolingizni tekshirish va xatoni to‘g‘rilash uchun 👁 ko‘zcha tugmasini bosing.',
      successTitle: 'Muvaffaqiyatli kirdingiz!',
      successDesc: 'WTMA portaliga xush kelibsiz. Yo‘naltirilmoqda...'
    },
    EN: {
      navAbout: 'About WTMA',
      navDirections: 'Directions',
      navProjects: 'Projects',
      navKatalog: 'Catalog',
      navMedia: 'Media',
      navContacts: 'Contacts',
      btnContact: 'Contact Us',
      badge: 'WTMA PORTAL',
      title: 'Portal Sign In',
      subtitle: 'Unified textile analytics and alliance partner gateway',
      labelLogin: 'Login or Email',
      placeholderLogin: 'partner@wtma.uz or username',
      labelPassword: 'Password',
      placeholderPassword: '••••••••••••',
      forgotPassword: 'Forgot password?',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      rememberMe: 'Remember me',
      btnSubmit: 'Sign In to Portal',
      btnSubmitting: 'Authenticating...',
      demoLabel: 'Demo credentials:',
      btnFillDemo: 'Auto-fill Demo',
      noAccount: "Don't have an account?",
      applyPartner: 'Apply for alliance partnership',
      secEncrypted: '256-bit SSL Encrypted',
      secAlliance: 'WTMA Alliance Network',
      secCompliance: 'ISO 27001 Certified',
      errEmpty: 'Please fill in both your login and password.',
      errBadTitle: 'Invalid Login or Password',
      errBadDesc: 'Credentials do not match. Click the eye icon (👁) to inspect what was typed and fix any typos.',
      successTitle: 'Login Successful!',
      successDesc: 'Welcome to WTMA Portal. Redirecting...'
    }
  };

  let currentLang = 'RU';

  // ==================== 2. PASSWORD EYE TOGGLE LOGIC ====================
  const passwordInput = document.getElementById('loginPassword');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const loginForm = document.getElementById('loginForm');
  const loginAlert = document.getElementById('loginAlert');
  const alertTitle = document.getElementById('alertTitle');
  const alertDesc = document.getElementById('alertDesc');
  const loginInput = document.getElementById('loginUser');
  const btnSubmit = document.getElementById('btnSubmit');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isCurrentlyPassword = passwordInput.getAttribute('type') === 'password';
      const dict = TRANSLATIONS[currentLang];

      if (isCurrentlyPassword) {
        // Reveal password
        passwordInput.setAttribute('type', 'text');
        togglePasswordBtn.classList.add('is-active');
        togglePasswordBtn.setAttribute('aria-label', dict.hidePassword);
        togglePasswordBtn.setAttribute('title', dict.hidePassword);
      } else {
        // Hide password
        passwordInput.setAttribute('type', 'password');
        togglePasswordBtn.classList.remove('is-active');
        togglePasswordBtn.setAttribute('aria-label', dict.showPassword);
        togglePasswordBtn.setAttribute('title', dict.showPassword);
      }

      // Remove inviting pulse if it was active
      togglePasswordBtn.classList.remove('pulse-invite');

      // Keep focus on input without losing cursor position
      const len = passwordInput.value.length;
      passwordInput.focus();
      try {
        passwordInput.setSelectionRange(len, len);
      } catch (_) {}
    });

    // When typing in password input, clear error styling
    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('has-error')) {
        passwordInput.classList.remove('has-error');
      }
    });
  }

  if (loginInput) {
    loginInput.addEventListener('input', () => {
      if (loginInput.classList.contains('has-error')) {
        loginInput.classList.remove('has-error');
      }
    });
  }

  // ==================== 3. FORM VALIDATION & WRONG PASSWORD FEEDBACK ====================
  function showAlert(type, title, desc) {
    if (!loginAlert) return;
    loginAlert.className = `login-alert login-alert-${type} show`;
    if (alertTitle) alertTitle.textContent = title;
    if (alertDesc) alertDesc.innerHTML = desc;
  }

  function hideAlert() {
    if (!loginAlert) return;
    loginAlert.className = 'login-alert';
  }

  // Demo valid credentials
  const VALID_USER = 'demo@wtma.uz';
  const VALID_PASS = 'wtma2026';

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert();

      const user = loginInput ? loginInput.value.trim() : '';
      const pass = passwordInput ? passwordInput.value : '';
      const dict = TRANSLATIONS[currentLang];

      // 1. Validation for empty fields
      if (!user || !pass) {
        if (!user && loginInput) loginInput.classList.add('has-error');
        if (!pass && passwordInput) passwordInput.classList.add('has-error');
        showAlert('error', dict.errBadTitle, dict.errEmpty);
        return;
      }

      // 2. Authentication simulation
      btnSubmit.classList.add('loading');
      btnSubmit.disabled = true;

      setTimeout(() => {
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;

        // Check if user credentials match demo
        const isMatch = (user.toLowerCase() === VALID_USER || user.toLowerCase() === 'demo' || user.toLowerCase() === 'admin') && pass === VALID_PASS;

        if (isMatch) {
          // Success state
          if (loginInput) loginInput.classList.remove('has-error');
          if (passwordInput) passwordInput.classList.remove('has-error');
          if (togglePasswordBtn) togglePasswordBtn.classList.remove('pulse-invite');

          showAlert('success', dict.successTitle, dict.successDesc);

          setTimeout(() => {
            window.location.href = 'katalog.html';
          }, 1400);
        } else {
          // Error state: "hato bo'lsa parolini ko'rish uchun"
          if (passwordInput) {
            passwordInput.classList.add('has-error');
          }
          if (loginInput) {
            loginInput.classList.add('has-error');
          }

          // Guide user to the eye icon with pulsing animation!
          if (togglePasswordBtn) {
            togglePasswordBtn.classList.add('pulse-invite');
          }

          showAlert('error', dict.errBadTitle, dict.errBadDesc);

          // Focus on password so user can inspect or edit
          passwordInput?.focus();
        }
      }, 700);
    });
  }

  // ==================== 4. DEMO AUTO-FILL BUTTON ====================
  const btnFillDemo = document.getElementById('btnFillDemo');
  if (btnFillDemo) {
    btnFillDemo.addEventListener('click', () => {
      if (loginInput) {
        loginInput.value = VALID_USER;
        loginInput.classList.remove('has-error');
      }
      if (passwordInput) {
        passwordInput.value = VALID_PASS;
        passwordInput.classList.remove('has-error');
      }
      if (togglePasswordBtn) {
        togglePasswordBtn.classList.remove('pulse-invite');
      }
      hideAlert();
      passwordInput?.focus();
    });
  }

  // ==================== 5. SITE HEADER & MOBILE DRAWER ====================
  const siteHeader = document.getElementById('siteHeader');
  let lastScrollY = window.scrollY;
  let isHidden = false;

  if (siteHeader) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (scrollDelta > 8 && currentScrollY > 100) {
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

  const burgerToggle = document.getElementById('burgerToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (burgerToggle && mobileDrawer) {
    burgerToggle.addEventListener('click', () => {
      burgerToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        burgerToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // ==================== 6. MULTI-LANGUAGE SWITCHER (RU / UZ / EN) ====================
  const langSelector = document.getElementById('langSelector');
  const langToggle = document.getElementById('langToggle');
  const langOptions = document.querySelectorAll('.lang-option');

  function updatePageLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    const dict = TRANSLATIONS[lang];

    // Nav links
    const linkAbout = document.querySelector('[data-i18n="navAbout"]');
    const linkDir = document.querySelector('[data-i18n="navDirections"]');
    const linkProj = document.querySelector('[data-i18n="navProjects"]');
    const linkKat = document.querySelector('[data-i18n="navKatalog"]');
    const linkMed = document.querySelector('[data-i18n="navMedia"]');
    const linkCont = document.querySelector('[data-i18n="navContacts"]');
    const headerBtn = document.querySelector('[data-i18n="btnContact"]');

    if (linkAbout) linkAbout.textContent = dict.navAbout;
    if (linkDir) linkDir.textContent = dict.navDirections;
    if (linkProj) linkProj.textContent = dict.navProjects;
    if (linkKat) linkKat.textContent = dict.navKatalog;
    if (linkMed) linkMed.textContent = dict.navMedia;
    if (linkCont) linkCont.textContent = dict.navContacts;
    if (headerBtn) headerBtn.textContent = dict.btnContact;

    // Card elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT') {
          el.setAttribute('placeholder', dict[key]);
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Eye button tooltip
    if (togglePasswordBtn) {
      const isVisible = passwordInput && passwordInput.getAttribute('type') === 'text';
      const label = isVisible ? dict.hidePassword : dict.showPassword;
      togglePasswordBtn.setAttribute('aria-label', label);
      togglePasswordBtn.setAttribute('title', label);
    }
  }

  if (langSelector && langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelector.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', langSelector.classList.contains('open'));
    });

    langOptions.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        langOptions.forEach((o) => o.classList.remove('active'));
        opt.classList.add('active');

        const raw = opt.textContent.trim().split(' ')[0].toUpperCase();
        const span = langToggle.querySelector('span');
        if (span) span.textContent = raw;

        langSelector.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');

        updatePageLanguage(raw);
      });
    });

    document.addEventListener('click', (e) => {
      if (!langSelector.contains(e.target)) {
        langSelector.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Global ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileDrawer?.classList.remove('open');
      burgerToggle?.classList.remove('open');
      langSelector?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
});
