/**
 * CivicSignal AI - Core Application Logic
 * Coordinates UI rendering, search/filtering, bilingual localization (EN/TE),
 * interactive citizen checklists, modal dialogues, and administrator simulation console.
 */

// Application State
const AppState = {
  currentLang: localStorage.getItem('civicsignal_lang') || 'en',
  currentCategory: 'all',
  currentStatus: 'all',
  searchQuery: '',
  sortBy: 'newest',
  currentView: 'feed', // 'feed' | 'admin'
  adminTab: 'add',     // 'add' | 'manage'
  activeModalNoticeId: null,
  checklistState: JSON.parse(localStorage.getItem('civicsignal_checklist_v2') || '{}'),
  mobileMenuOpen: false
};

// Category Icons Mapping
const CATEGORY_ICONS = {
  water: '💧',
  electricity: '⚡',
  health: '🏥',
  traffic: '🚗',
  revenue: '💰',
  sanitation: '🧹'
};

// DOM References Cache
const DOM = {};

/**
 * Initializes DOM element references once DOM is ready.
 */
function cacheDomElements() {
  DOM.mainFeedView = document.getElementById('mainFeedView');
  DOM.adminView = document.getElementById('adminView');
  DOM.navFeedBtn = document.getElementById('navFeedBtn');
  DOM.navAdminBtn = document.getElementById('navAdminBtn');
  DOM.navHowBtn = document.getElementById('navHowBtn');
  DOM.brandHomeLink = document.getElementById('brandHomeLink');
  DOM.footerFeedLink = document.getElementById('footerFeedLink');
  DOM.footerAdminLink = document.getElementById('footerAdminLink');
  DOM.mobileMenuBtn = document.getElementById('mobileMenuBtn');
  DOM.mainNavLinks = document.getElementById('mainNavLinks');

  // Language buttons
  DOM.langEnBtn = document.getElementById('langEnBtn');
  DOM.langTeBtn = document.getElementById('langTeBtn');

  // Search & Filter elements
  DOM.searchInput = document.getElementById('searchInput');
  DOM.searchClearBtn = document.getElementById('searchClearBtn');
  DOM.statusSelect = document.getElementById('statusSelect');
  DOM.sortSelect = document.getElementById('sortSelect');
  DOM.clearFiltersBtn = document.getElementById('clearFiltersBtn');
  DOM.resultsCount = document.getElementById('resultsCount');
  DOM.categoryPillsRow = document.getElementById('categoryPillsRow');
  DOM.noticesGrid = document.getElementById('noticesGrid');

  // Stats elements
  DOM.statTotalNotices = document.getElementById('statTotalNotices');
  DOM.statActiveAlerts = document.getElementById('statActiveAlerts');
  DOM.statUpcomingAlerts = document.getElementById('statUpcomingAlerts');
  DOM.statLocations = document.getElementById('statLocations');
  DOM.statLanguages = document.getElementById('statLanguages');

  // Admin Console Elements
  DOM.tabAddNoticeBtn = document.getElementById('tabAddNoticeBtn');
  DOM.tabManageNoticesBtn = document.getElementById('tabManageNoticesBtn');
  DOM.adminAddNoticeCard = document.getElementById('adminAddNoticeCard');
  DOM.adminManageNoticesCard = document.getElementById('adminManageNoticesCard');
  DOM.adminTableBody = document.getElementById('adminTableBody');
  DOM.manageCount = document.getElementById('manageCount');
  DOM.addNoticeForm = document.getElementById('addNoticeForm');
  DOM.btnResetData = document.getElementById('btnResetData');
  DOM.btnAiAssist = document.getElementById('btnAiAssist');

  // Modal Elements
  DOM.noticeModal = document.getElementById('noticeModal');
  DOM.modalContent = document.getElementById('modalContent');
  DOM.modalCategoryBadge = document.getElementById('modalCategoryBadge');
  DOM.modalCloseBtn = document.getElementById('modalCloseBtn');
  DOM.modalDismissBtn = document.getElementById('modalDismissBtn');
  DOM.modalPrintBtn = document.getElementById('modalPrintBtn');
  DOM.modalCopyBtn = document.getElementById('modalCopyBtn');

  // Toast Container
  DOM.toastContainer = document.getElementById('toastContainer');
}

/**
 * Main Application Entry Point
 */
function init() {
  cacheDomElements();
  NoticeStore.init();

  // Setup Language
  applyLanguage(AppState.currentLang);

  // Bind Events
  bindEventListeners();

  // Initial UI Render
  renderDashboardStats();
  renderNoticesFeed();
  renderAdminTable();
}

/**
 * Attaches all event listeners for user interactions.
 */
function bindEventListeners() {
  // Navigation Switch
  DOM.navFeedBtn.addEventListener('click', () => switchView('feed'));
  DOM.navAdminBtn.addEventListener('click', () => switchView('admin'));
  DOM.brandHomeLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  if (DOM.footerFeedLink) {
    DOM.footerFeedLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('feed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (DOM.footerAdminLink) {
    DOM.footerAdminLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  if (DOM.mobileMenuBtn && DOM.mainNavLinks) {
    DOM.mobileMenuBtn.addEventListener('click', () => {
      AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
      DOM.mainNavLinks.style.display = AppState.mobileMenuOpen ? 'flex' : '';
      DOM.mobileMenuBtn.setAttribute('aria-expanded', AppState.mobileMenuOpen);
    });
  }

  // Language Switch
  DOM.langEnBtn.addEventListener('click', () => setLanguage('en'));
  DOM.langTeBtn.addEventListener('click', () => setLanguage('te'));

  // Search Input with Debounce
  let searchTimeout = null;
  DOM.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    DOM.searchClearBtn.style.display = val ? 'inline-block' : 'none';
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      AppState.searchQuery = val.trim();
      renderNoticesFeed();
    }, 180);
  });

  DOM.searchClearBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.searchClearBtn.style.display = 'none';
    AppState.searchQuery = '';
    renderNoticesFeed();
  });

  // Category Filter Pills
  DOM.categoryPillsRow.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    const cat = pill.dataset.category;
    AppState.currentCategory = cat;

    // Update active pill
    DOM.categoryPillsRow.querySelectorAll('.cat-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
      btn.setAttribute('aria-selected', btn.dataset.category === cat);
    });

    renderNoticesFeed();
  });

  // Status & Sort Dropdowns
  DOM.statusSelect.addEventListener('change', (e) => {
    AppState.currentStatus = e.target.value;
    renderNoticesFeed();
  });

  DOM.sortSelect.addEventListener('change', (e) => {
    AppState.sortBy = e.target.value;
    renderNoticesFeed();
  });

  // Clear Filters
  DOM.clearFiltersBtn.addEventListener('click', resetFilters);

  // Admin Tabs
  DOM.tabAddNoticeBtn.addEventListener('click', () => switchAdminTab('add'));
  DOM.tabManageNoticesBtn.addEventListener('click', () => switchAdminTab('manage'));

  // Reset Demo Data
  DOM.btnResetData.addEventListener('click', handleResetDemoData);

  // AI Assist Demo Helper (Honest Draft Generator)
  DOM.btnAiAssist.addEventListener('click', handleAiHelperClick);

  // Admin Add Notice Form Submission
  DOM.addNoticeForm.addEventListener('submit', handleAddNoticeSubmit);

  // Modal Close Handlers
  DOM.modalCloseBtn.addEventListener('click', closeModal);
  DOM.modalDismissBtn.addEventListener('click', closeModal);
  DOM.noticeModal.addEventListener('click', (e) => {
    if (e.target === DOM.noticeModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.noticeModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal Action Buttons
  DOM.modalPrintBtn.addEventListener('click', () => window.print());
  DOM.modalCopyBtn.addEventListener('click', handleCopyModalSummary);
}

/**
 * Switches between Citizen Public Feed and Admin Console views.
 * @param {'feed'|'admin'} viewName
 */
function switchView(viewName) {
  AppState.currentView = viewName;
  if (viewName === 'feed') {
    DOM.mainFeedView.style.display = 'block';
    DOM.adminView.style.display = 'none';
    DOM.navFeedBtn.classList.add('active');
    DOM.navAdminBtn.classList.remove('active');
  } else {
    DOM.mainFeedView.style.display = 'none';
    DOM.adminView.style.display = 'block';
    DOM.navFeedBtn.classList.remove('active');
    DOM.navAdminBtn.classList.add('active');
    renderAdminTable();
  }
}

/**
 * Switches between Add Notice and Manage Notices tabs inside the Admin Console.
 * @param {'add'|'manage'} tab
 */
function switchAdminTab(tab) {
  AppState.adminTab = tab;
  if (tab === 'add') {
    DOM.adminAddNoticeCard.style.display = 'block';
    DOM.adminManageNoticesCard.style.display = 'none';
    DOM.tabAddNoticeBtn.classList.add('active');
    DOM.tabManageNoticesBtn.classList.remove('active');
  } else {
    DOM.adminAddNoticeCard.style.display = 'none';
    DOM.adminManageNoticesCard.style.display = 'block';
    DOM.tabAddNoticeBtn.classList.remove('active');
    DOM.tabManageNoticesBtn.classList.add('active');
    renderAdminTable();
  }
}

/**
 * Sets current language and updates UI elements.
 * @param {'en'|'te'} lang
 */
function setLanguage(lang) {
  if (AppState.currentLang === lang) return;
  AppState.currentLang = lang;
  localStorage.setItem('civicsignal_lang', lang);

  applyLanguage(lang);
  renderDashboardStats();
  renderNoticesFeed();
  renderAdminTable();

  if (AppState.activeModalNoticeId) {
    openModal(AppState.activeModalNoticeId);
  }

  showToast(lang === 'te' ? 'భాష తెలుగులోకి మార్చబడింది' : 'Language switched to English');
}

/**
 * Applies translation strings to DOM nodes having [data-i18n] or [data-i18n-placeholder].
 * @param {'en'|'te'} lang
 */
function applyLanguage(lang) {
  const strings = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // Toggle active styling on language buttons
  DOM.langEnBtn.classList.toggle('active', lang === 'en');
  DOM.langEnBtn.setAttribute('aria-pressed', lang === 'en');
  DOM.langTeBtn.classList.toggle('active', lang === 'te');
  DOM.langTeBtn.setAttribute('aria-pressed', lang === 'te');

  // Update text contents
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (strings[key]) {
      el.setAttribute('placeholder', strings[key]);
    }
  });
}

/**
 * Updates stats counters in hero dashboard from actual data.
 */
function renderDashboardStats() {
  const stats = NoticeStore.getStats();
  DOM.statTotalNotices.textContent = stats.total;
  DOM.statActiveAlerts.textContent = stats.active;
  if (DOM.statUpcomingAlerts) {
    DOM.statUpcomingAlerts.textContent = stats.upcoming || '0';
  }
  DOM.statLocations.textContent = stats.locationsCount;
  DOM.statLanguages.textContent = '2'; // English & Telugu
}

/**
 * Resets search and all filters back to default.
 */
function resetFilters() {
  AppState.searchQuery = '';
  AppState.currentCategory = 'all';
  AppState.currentStatus = 'all';
  AppState.sortBy = 'newest';

  DOM.searchInput.value = '';
  DOM.searchClearBtn.style.display = 'none';
  DOM.statusSelect.value = 'all';
  DOM.sortSelect.value = 'newest';

  DOM.categoryPillsRow.querySelectorAll('.cat-pill').forEach(btn => {
    const isAll = btn.dataset.category === 'all';
    btn.classList.toggle('active', isAll);
    btn.setAttribute('aria-selected', isAll);
  });

  renderNoticesFeed();
}

/**
 * Filters notices by a specific locality when user clicks a locality chip.
 * @param {string} localityName
 */
function filterByLocality(localityName) {
  AppState.searchQuery = localityName;
  DOM.searchInput.value = localityName;
  DOM.searchClearBtn.style.display = 'inline-block';
  renderNoticesFeed();
  window.scrollTo({ top: DOM.searchInput.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  showToast(`Filtering notices affecting: ${localityName}`);
}

/**
 * Renders the filtered and sorted public notices grid with Notice-to-Action intelligence.
 */
function renderNoticesFeed() {
  const lang = AppState.currentLang;
  const strings = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const notices = NoticeStore.queryNotices({
    category: AppState.currentCategory,
    status: AppState.currentStatus,
    searchQuery: AppState.searchQuery,
    sortBy: AppState.sortBy,
    includeUnpublished: false
  });

  // Show / Hide Clear Filters Button
  const isFiltered = AppState.searchQuery !== '' || AppState.currentCategory !== 'all' || AppState.currentStatus !== 'all';
  DOM.clearFiltersBtn.style.display = isFiltered ? 'inline-block' : 'none';

  // Results Count Badge
  DOM.resultsCount.textContent = `${notices.length} ${notices.length === 1 ? 'Notice' : 'Notices'}`;

  // If no notices match
  if (notices.length === 0) {
    DOM.noticesGrid.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">${strings.noNoticesTitle}</h3>
        <p class="empty-desc">${strings.noNoticesDesc}</p>
        <button class="empty-reset-btn" id="emptyResetBtn">${strings.clearFilters}</button>
      </div>
    `;
    const btn = document.getElementById('emptyResetBtn');
    if (btn) btn.addEventListener('click', resetFilters);
    return;
  }

  // Render Notice Cards with Notice-to-Action Intelligence
  DOM.noticesGrid.innerHTML = notices.map(notice => {
    const title = notice.title[lang] || notice.title.en || 'Public Notice';
    const dept = notice.department[lang] || notice.department.en || '';
    const summary = notice.summary[lang] || notice.summary.en || '';
    const date = notice.date[lang] || notice.date.en || '';
    const timing = notice.timing ? (notice.timing[lang] || notice.timing.en) : null;
    const locations = notice.locations[lang] || notice.locations.en || [];
    const actions = notice.actions[lang] || notice.actions.en || [];
    const catIcon = CATEGORY_ICONS[notice.category] || '📢';
    const catNameKey = `filter${capitalize(notice.category)}`;
    const catName = strings[catNameKey] || notice.category;

    const priorityClass = `priority-${notice.priority || 'normal'}`;
    const priorityLabel = strings[`status${capitalize(notice.priority || 'normal')}`] || notice.priority;
    const statusClass = `status-${notice.status || 'active'}`;
    const statusLabel = strings[`status${capitalize(notice.status || 'active')}`] || notice.status;

    // Render interactive action items preview (first 2 items)
    const actionsPreviewHtml = actions.slice(0, 2).map((act, index) => {
      const itemKey = `${notice.id}_act_${index}`;
      const isChecked = !!AppState.checklistState[itemKey];
      return `
        <li class="action-item ${isChecked ? 'completed' : ''}">
          <input 
            type="checkbox" 
            class="action-checkbox" 
            data-item-key="${itemKey}" 
            ${isChecked ? 'checked' : ''}
            aria-label="Mark action completed"
          >
          <span>${escapeHtml(act)}</span>
        </li>
      `;
    }).join('');

    // Locations chips (clickable to filter)
    const locationsChipsHtml = locations.slice(0, 3).map(loc => 
      `<span class="loc-chip" data-filter-loc="${escapeHtml(loc)}" title="Click to filter by ${escapeHtml(loc)}">${escapeHtml(loc)}</span>`
    ).join('') + (locations.length > 3 ? `<span class="loc-chip" style="cursor:default;">+${locations.length - 3}</span>` : '');

    return `
      <article class="notice-card ${notice.priority || 'normal'}-border" data-notice-id="${notice.id}">
        <div>
          <!-- Top Category & Badges Row -->
          <div class="card-top-meta">
            <span class="category-tag tag-${notice.category}">
              ${catIcon} ${catName}
            </span>
            <div class="card-badges-right">
              <span class="priority-pill ${priorityClass}">${priorityLabel}</span>
              <span class="status-indicator ${statusClass}">● ${statusLabel}</span>
            </div>
          </div>

          <!-- Sample Notice Disclaimer Badge -->
          ${notice.isSample !== false ? `
            <div class="card-sample-notice-banner" role="note">
              ${escapeHtml(strings.sampleNoticeBadge || '⚠️ SAMPLE — NOT AN OFFICIAL GOVERNMENT NOTICE')}
            </div>
          ` : ''}

          <!-- Title & Department -->
          <h2 class="card-title">${escapeHtml(title)}</h2>
          <div class="card-dept">🏛️ ${escapeHtml(dept)}</div>

          <!-- Plain-Language Summary Callout Box -->
          <div class="card-summary-box">
            <span class="summary-label">💡 ${strings.labelSummaryHeader}</span>
            <p class="summary-text">${escapeHtml(summary)}</p>
          </div>

          <!-- Notice-to-Action 3-Core Questions Intelligence Box -->
          <div class="notice-intel-box">
            <!-- 1. Affected Localities -->
            <div class="intel-row">
              <span class="intel-question-label">📍 ${strings.qLocality || 'Does this affect my locality?'}</span>
              <div class="locations-chips-wrap">
                ${locationsChipsHtml}
              </div>
            </div>

            <!-- 2. When does it happen? -->
            <div class="intel-row">
              <span class="intel-question-label">⏱️ ${strings.qWhen || 'When does it happen?'}</span>
              <span class="intel-answer-text">
                <strong>${escapeHtml(date)}</strong>
                ${timing ? ` <br><small style="color:#64748b;">${escapeHtml(timing)}</small>` : ''}
              </span>
            </div>
          </div>

          <!-- 3. What should I do? (Citizen Actions Checklist Preview) -->
          ${actions.length > 0 ? `
            <div class="card-actions-preview">
              <div class="actions-header">
                <span>📋 ${strings.qWhatToDo || 'What should I do?'}</span>
                <small style="text-transform:none; font-weight:normal; color:#64748b;">${actions.length} action items</small>
              </div>
              <ul class="action-checklist">
                ${actionsPreviewHtml}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- Card Footer Buttons -->
        <div class="card-footer">
          <button class="btn-view-details" data-open-modal="${notice.id}">
            🔍 ${strings.btnViewDetails}
          </button>
          <button class="btn-copy-summary" data-copy-summary="${notice.id}" title="${strings.btnCopySummary}">
            📋
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event listeners
  DOM.noticesGrid.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-open-modal');
      openModal(id);
    });
  });

  DOM.noticesGrid.querySelectorAll('[data-copy-summary]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-copy-summary');
      const notice = NoticeStore.getById(id);
      if (notice) {
        const textToCopy = `${notice.title[lang] || notice.title.en}\n\nSummary:\n${notice.summary[lang] || notice.summary.en}\n\nDate: ${notice.date[lang] || notice.date.en}\nLocations: ${(notice.locations[lang] || notice.locations.en || []).join(', ')}`;
        copyToClipboard(textToCopy, lang === 'te' ? 'సారాంశం కాపీ చేయబడింది!' : 'Summary copied to clipboard!');
      }
    });
  });

  // Action Checkbox Handlers
  DOM.noticesGrid.querySelectorAll('.action-checkbox').forEach(box => {
    box.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-item-key');
      const isChecked = e.target.checked;
      AppState.checklistState[key] = isChecked;
      localStorage.setItem('civicsignal_checklist_v2', JSON.stringify(AppState.checklistState));
      const li = e.target.closest('.action-item');
      if (li) li.classList.toggle('completed', isChecked);
    });
  });

  // Locality Chip Quick Filter Click Handlers
  DOM.noticesGrid.querySelectorAll('[data-filter-loc]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const loc = e.currentTarget.getAttribute('data-filter-loc');
      if (loc) filterByLocality(loc);
    });
  });
}

/**
 * Opens detailed breakdown modal for a specific notice.
 * @param {string} noticeId
 */
function openModal(noticeId) {
  const notice = NoticeStore.getById(noticeId);
  if (!notice) return;

  AppState.activeModalNoticeId = noticeId;
  const lang = AppState.currentLang;
  const strings = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const title = notice.title[lang] || notice.title.en;
  const dept = notice.department[lang] || notice.department.en;
  const summary = notice.summary[lang] || notice.summary.en;
  const date = notice.date[lang] || notice.date.en;
  const timing = notice.timing ? (notice.timing[lang] || notice.timing.en) : null;
  const locations = notice.locations[lang] || notice.locations.en || [];
  const actions = notice.actions[lang] || notice.actions.en || [];
  const original = notice.originalText ? (notice.originalText[lang] || notice.originalText.en) : '';

  const catIcon = CATEGORY_ICONS[notice.category] || '📢';
  const catName = strings[`filter${capitalize(notice.category)}`] || notice.category;
  const priorityLabel = strings[`status${capitalize(notice.priority || 'normal')}`] || notice.priority;
  const statusLabel = strings[`status${capitalize(notice.status || 'active')}`] || notice.status;

  // Category & Status Header
  DOM.modalCategoryBadge.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
      <span class="category-tag tag-${notice.category}">${catIcon} ${catName}</span>
      <span class="priority-pill priority-${notice.priority || 'normal'}">${priorityLabel}</span>
      <span class="status-indicator status-${notice.status || 'active'}">● ${statusLabel}</span>
      <span style="font-size:0.75rem; color:#64748b; font-family:monospace;">${escapeHtml(notice.referenceNumber || notice.id)}</span>
    </div>
  `;

  // Checklist calculations
  let completedCount = 0;
  const checklistItemsHtml = actions.map((act, index) => {
    const itemKey = `${notice.id}_act_${index}`;
    const isChecked = !!AppState.checklistState[itemKey];
    if (isChecked) completedCount++;
    return `
      <li class="action-item ${isChecked ? 'completed' : ''}" style="margin-bottom:0.6rem;">
        <input 
          type="checkbox" 
          class="action-checkbox modal-action-box" 
          data-item-key="${itemKey}" 
          ${isChecked ? 'checked' : ''}
          style="width:18px; height:18px;"
        >
        <span style="font-size:0.92rem;">${escapeHtml(act)}</span>
      </li>
    `;
  }).join('');

  const progressPercent = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

  DOM.modalContent.innerHTML = `
    ${notice.isSample !== false ? `
      <div class="modal-sample-warning" role="alert">
        ${escapeHtml(strings.sampleModalWarning || '⚠️ DEMONSTRATION NOTICE: Fictional content for academic hackathon demonstration only. Not an official municipal circular.')}
      </div>
    ` : ''}
    <div>
      <h2 class="modal-title" id="modalNoticeTitle">${escapeHtml(title)}</h2>
      <div class="modal-meta-bar" style="margin-top:0.75rem;">
        <span>🏛️ <strong>${strings.labelDept}:</strong> ${escapeHtml(dept)}</span>
        <span>🗓️ <strong>${strings.labelIssued}:</strong> ${notice.issuedDate || 'Recent'}</span>
        <span>🔖 <strong>${strings.labelRef}:</strong> ${escapeHtml(notice.referenceNumber || notice.id)}</span>
      </div>
    </div>

    <!-- Highlighted Simple Summary Callout -->
    <div class="modal-summary-box">
      <div class="modal-summary-title">
        <span>💡 ${strings.labelSummaryHeader}</span>
      </div>
      <p class="modal-summary-content">${escapeHtml(summary)}</p>
    </div>

    <!-- Date, Time, and Locations 2-Column Grid -->
    <div class="modal-grid-info">
      <div class="info-block">
        <div class="info-block-label">⏱️ ${strings.qWhen || strings.labelImportantDate}</div>
        <div class="info-block-val">${escapeHtml(date)}</div>
        ${timing ? `<div style="font-size:0.85rem; color:#64748b; margin-top:0.25rem;">⏰ ${escapeHtml(timing)}</div>` : ''}
      </div>

      <div class="info-block">
        <div class="info-block-label">📍 ${strings.qLocality || strings.labelAffectedLocations}</div>
        <div class="locations-chips-wrap" style="margin-top:0.35rem;">
          ${locations.map(loc => `<span class="loc-chip" style="font-size:0.8rem; padding:0.2rem 0.6rem;">${escapeHtml(loc)}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Citizen Action Checklist with Progress -->
    ${actions.length > 0 ? `
      <div class="modal-actions-block">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem;">
          <strong style="font-size:0.95rem; color:#0f172a;">📋 ${strings.qWhatToDo || strings.labelRequiredActions}</strong>
          <span id="modalProgressLabel" style="font-size:0.82rem; font-weight:700; color:#059669;">
            ${completedCount} of ${actions.length} completed (${progressPercent}%)
          </span>
        </div>
        <div class="actions-progress-bar">
          <div class="progress-fill" id="modalProgressBar" style="width: ${progressPercent}%;"></div>
        </div>
        <div style="font-size:0.78rem; color:#64748b; margin-bottom:0.75rem;">
          ${strings.checklistHint || 'Check off items as you complete them to track readiness.'}
        </div>
        <ul class="action-checklist" id="modalActionChecklist">
          ${checklistItemsHtml}
        </ul>
      </div>
    ` : ''}

    <!-- Notice Verification Container -->
    <div class="verification-status-banner">
      <span style="font-size:1.1rem;">🛡️</span>
      <div>
        <strong>${strings.labelVerificationStatus || 'Verification Status'}:</strong>
        <span> ${strings.verificationDemoText || 'Simulated Demonstration Notice • Requires confirmation with local municipal ward office'}</span>
      </div>
    </div>

    <!-- Official Circular Original Text Accordion -->
    ${original ? `
      <div class="original-text-accordion">
        <button type="button" class="accordion-toggle" id="btnToggleAccordion">
          <span>📜 ${strings.labelOriginalExcerpt}</span>
          <span id="accordionArrow">▼</span>
        </button>
        <div class="accordion-content" id="accordionContent">
          ${escapeHtml(original)}
        </div>
      </div>
    ` : ''}
  `;

  // Accordion Toggle
  const accordionBtn = document.getElementById('btnToggleAccordion');
  const accordionContent = document.getElementById('accordionContent');
  const accordionArrow = document.getElementById('accordionArrow');
  if (accordionBtn && accordionContent) {
    accordionBtn.addEventListener('click', () => {
      const isOpen = accordionContent.classList.toggle('open');
      accordionArrow.textContent = isOpen ? '▲' : '▼';
    });
  }

  // Modal Checklist Event Handlers
  DOM.modalContent.querySelectorAll('.modal-action-box').forEach(box => {
    box.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-item-key');
      const isChecked = e.target.checked;
      AppState.checklistState[key] = isChecked;
      localStorage.setItem('civicsignal_checklist_v2', JSON.stringify(AppState.checklistState));
      const li = e.target.closest('.action-item');
      if (li) li.classList.toggle('completed', isChecked);

      // Recalculate progress
      const allModalBoxes = DOM.modalContent.querySelectorAll('.modal-action-box');
      const total = allModalBoxes.length;
      let count = 0;
      allModalBoxes.forEach(b => { if (b.checked) count++; });
      const pct = Math.round((count / total) * 100);

      const bar = document.getElementById('modalProgressBar');
      const lbl = document.getElementById('modalProgressLabel');
      if (bar) bar.style.width = `${pct}%`;
      if (lbl) lbl.textContent = `${count} of ${total} completed (${pct}%)`;

      // Also update background feed cards
      renderNoticesFeed();
    });
  });

  DOM.noticeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes modal dialogue.
 */
function closeModal() {
  DOM.noticeModal.classList.remove('active');
  AppState.activeModalNoticeId = null;
  document.body.style.overflow = '';
}

/**
 * Copies modal summary to clipboard.
 */
function handleCopyModalSummary() {
  if (!AppState.activeModalNoticeId) return;
  const notice = NoticeStore.getById(AppState.activeModalNoticeId);
  if (!notice) return;
  const lang = AppState.currentLang;
  const text = `${notice.title[lang] || notice.title.en}\n\nSummary:\n${notice.summary[lang] || notice.summary.en}\n\nDate: ${notice.date[lang] || notice.date.en}\nLocations: ${(notice.locations[lang] || notice.locations.en || []).join(', ')}`;
  copyToClipboard(text, lang === 'te' ? 'సారాంశం కాపీ చేయబడింది!' : 'Notice summary copied to clipboard!');
}

/**
 * Renders administrator management table.
 */
function renderAdminTable() {
  const notices = NoticeStore.getAll();
  const lang = AppState.currentLang;
  const strings = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  DOM.manageCount.textContent = notices.length;

  if (notices.length === 0) {
    DOM.adminTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">
          No notices found in storage. Click "Reset to Sample Demo Data" to restore defaults.
        </td>
      </tr>
    `;
    return;
  }

  DOM.adminTableBody.innerHTML = notices.map(notice => {
    const title = notice.title.en || notice.title.te || 'Untitled Notice';
    const isPublished = notice.published !== false;
    const catIcon = CATEGORY_ICONS[notice.category] || '📢';

    return `
      <tr data-notice-id="${notice.id}">
        <td style="font-family:monospace; font-weight:600; font-size:0.78rem;">
          ${escapeHtml(notice.referenceNumber || notice.id)}
        </td>
        <td style="font-weight:600; max-width:260px;">
          ${escapeHtml(title)}
        </td>
        <td>
          <span class="category-tag tag-${notice.category}" style="font-size:0.72rem;">
            ${catIcon} ${notice.category}
          </span>
        </td>
        <td>
          <select class="table-status-select" data-update-status="${notice.id}">
            <option value="active" ${notice.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="upcoming" ${notice.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
            <option value="completed" ${notice.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
        </td>
        <td>
          <button 
            class="table-toggle-btn ${isPublished ? 'published' : 'unpublished'}" 
            data-toggle-published="${notice.id}"
          >
            ${isPublished ? '● Published' : '○ Draft'}
          </button>
        </td>
        <td>
          <button class="table-delete-btn" data-delete-id="${notice.id}">
            🗑️ ${strings.btnDelete || 'Delete'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Table Handlers
  DOM.adminTableBody.querySelectorAll('[data-update-status]').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-update-status');
      const newStatus = e.target.value;
      NoticeStore.updateStatus(id, newStatus);
      renderDashboardStats();
      renderNoticesFeed();
      showToast(`Notice status updated to "${newStatus}"`);
    });
  });

  DOM.adminTableBody.querySelectorAll('[data-toggle-published]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-toggle-published');
      const isNowPublished = NoticeStore.togglePublished(id);
      renderDashboardStats();
      renderNoticesFeed();
      renderAdminTable();
      showToast(isNowPublished ? 'Notice published to public feed' : 'Notice set to draft (hidden)');
    });
  });

  DOM.adminTableBody.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-delete-id');
      const strings = UI_TRANSLATIONS[AppState.currentLang] || UI_TRANSLATIONS.en;
      if (confirm(strings.confirmDelete || 'Are you sure you want to delete this notice?')) {
        NoticeStore.deleteNotice(id);
        renderDashboardStats();
        renderNoticesFeed();
        renderAdminTable();
        showToast('Notice removed successfully');
      }
    });
  });
}

/**
 * Handles "Publish New Notice" form submission with validation.
 * @param {Event} e
 */
function handleAddNoticeSubmit(e) {
  e.preventDefault();

  const titleEn = document.getElementById('noticeTitleEn').value.trim();
  const titleTe = document.getElementById('noticeTitleTe').value.trim();
  const category = document.getElementById('noticeCategory').value;
  const deptEn = document.getElementById('noticeDeptEn').value.trim();
  const deptTe = document.getElementById('noticeDeptTe').value.trim();
  const dateEn = document.getElementById('noticeDateEn').value.trim();
  const timingEn = document.getElementById('noticeTimingEn').value.trim();
  const locationsEnStr = document.getElementById('noticeLocationsEn').value.trim();
  const actionsEnStr = document.getElementById('noticeActionsEn').value.trim();
  const priority = document.getElementById('noticePriority').value;
  const status = document.getElementById('noticeStatus').value;
  const originalEn = document.getElementById('noticeOriginalEn').value.trim();
  const summaryEn = document.getElementById('noticeSummaryEn').value.trim();

  // Validate Required Fields
  let isValid = true;

  const validateField = (val, errId) => {
    const err = document.getElementById(errId);
    if (!val) {
      if (err) err.style.display = 'block';
      isValid = false;
    } else {
      if (err) err.style.display = 'none';
    }
  };

  validateField(titleEn, 'errTitleEn');
  validateField(deptEn, 'errDeptEn');
  validateField(dateEn, 'errDateEn');
  validateField(locationsEnStr, 'errLocationsEn');
  validateField(actionsEnStr, 'errActionsEn');
  validateField(originalEn, 'errOriginalEn');
  validateField(summaryEn, 'errSummaryEn');

  if (!isValid) {
    showToast('Please fill out all required fields marked with *', 3500);
    return;
  }

  // Parse Locations & Actions
  const locationsEn = locationsEnStr.split(',').map(s => s.trim()).filter(Boolean);
  const actionsEn = actionsEnStr.split('\n').flatMap(s => s.split(',')).map(s => s.trim()).filter(Boolean);

  // Generate Reference No
  const refNum = `DEMO-REF: CS/${category.toUpperCase()}/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

  const newNotice = {
    id: `cs-${Date.now()}`,
    referenceNumber: refNum,
    category: category,
    department: {
      en: deptEn,
      te: deptTe || deptEn
    },
    title: {
      en: titleEn,
      te: titleTe || titleEn
    },
    summary: {
      en: summaryEn,
      te: summaryEn // fallback
    },
    date: {
      en: dateEn,
      te: dateEn
    },
    timing: timingEn ? { en: timingEn, te: timingEn } : null,
    locations: {
      en: locationsEn,
      te: locationsEn
    },
    actions: {
      en: actionsEn,
      te: actionsEn
    },
    priority: priority,
    status: status,
    published: true,
    isSample: false,
    issuedDate: new Date().toISOString().split('T')[0],
    originalText: {
      en: originalEn,
      te: originalEn
    }
  };

  NoticeStore.addNotice(newNotice);
  DOM.addNoticeForm.reset();

  renderDashboardStats();
  renderNoticesFeed();
  renderAdminTable();

  showToast('Notice published successfully to public feed!');
  switchAdminTab('manage');
}

/**
 * Demo AI Summary Helper: Simulated intelligent draft generator.
 * Uses client-side rule templates based on actual provided inputs.
 * Clearly marked as a draft requiring human editorial review.
 */
function handleAiHelperClick() {
  const original = document.getElementById('noticeOriginalEn').value.trim();
  const title = document.getElementById('noticeTitleEn').value.trim();
  const category = document.getElementById('noticeCategory').value;
  const locations = document.getElementById('noticeLocationsEn').value.trim();

  if (!original && !title) {
    showToast('Please enter a Notice Title or paste Circular Text first.', 3500);
    return;
  }

  // Intelligently parse the actual provided text
  let summaryDraft = '';
  let actionsDraft = '';

  const topic = title ? title.replace(/^(notice|circular|order):\s*/i, '') : 'municipal service activity';
  const locationMention = locations ? ` in ${locations}` : '';

  if (category === 'water') {
    summaryDraft = `[Draft Summary - Please Review]: Official notice regarding ${topic}. Water supply operations will be temporarily adjusted${locationMention} to allow for essential pipeline maintenance. Normal supply pressure will resume following work completion.`;
    actionsDraft = `Store adequate drinking and cooking water in advance.\nAvoid operating high-consumption water appliances during the outage hours.\nContact the local municipal water helpline if emergency tanker supply is required.`;
  } else if (category === 'electricity') {
    summaryDraft = `[Draft Summary - Please Review]: Scheduled electrical maintenance regarding ${topic}. Power feeder lines will be temporarily de-energized${locationMention} for preventative equipment servicing.`;
    actionsDraft = `Charge emergency lights, power banks, and essential communication devices before work begins.\nUnplug sensitive electrical equipment to avoid power surge damage.\nPlan elevator transit in multi-story buildings before outage hours.`;
  } else if (category === 'traffic') {
    summaryDraft = `[Draft Summary - Please Review]: Transit regulation alert regarding ${topic}. Vehicular traffic will be diverted along designated alternate link corridors${locationMention} to facilitate civil infrastructure work.`;
    actionsDraft = `Follow detour signboards and directions from on-ground traffic personnel.\nAllocate an extra 15-20 minutes for travel during operational hours.\nUtilize inner bypass connector roads to avoid congestion points.`;
  } else if (category === 'health') {
    summaryDraft = `[Draft Summary - Please Review]: Public health notification regarding ${topic}. Community health centers and mobile booths will provide scheduled preventive care services${locationMention}.`;
    actionsDraft = `Visit the nearest local primary health center or designated civic booth during operational hours.\nBring government identification or immunization record cards if applicable.\nFollow all health guidelines issued by attending medical staff.`;
  } else {
    summaryDraft = `[Draft Summary - Please Review]: Municipal circular regarding ${topic}. Scheduled civic operations are planned${locationMention} to maintain public service standards and infrastructure quality.`;
    actionsDraft = `Note the scheduled dates and hours for your neighborhood.\nContact your local ward office if personalized guidance is needed.\nFollow official department guidelines.`;
  }

  const summaryInput = document.getElementById('noticeSummaryEn');
  const actionsInput = document.getElementById('noticeActionsEn');

  summaryInput.value = summaryDraft;
  if (!actionsInput.value.trim()) {
    actionsInput.value = actionsDraft;
  }

  showToast('✨ Draft summary generated using rule templates. Please review and verify all details before publishing.', 4000);
}

/**
 * Resets notice data back to original 6 demo notices with confirmation.
 */
function handleResetDemoData() {
  const strings = UI_TRANSLATIONS[AppState.currentLang] || UI_TRANSLATIONS.en;
  if (confirm(strings.confirmReset || 'Are you sure you want to restore the original sample notices?')) {
    NoticeStore.resetDefaults();
    AppState.checklistState = {};
    localStorage.removeItem('civicsignal_checklist_v2');

    renderDashboardStats();
    renderNoticesFeed();
    renderAdminTable();

    showToast('Sample demo notices restored successfully!');
  }
}

/**
 * Shows transient toast notification.
 * @param {string} message
 * @param {number} [duration=3000]
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🔔</span> <span>${escapeHtml(message)}</span>`;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/**
 * Copies plain text to user clipboard.
 * @param {string} text
 * @param {string} successMessage
 */
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || 'Copied to clipboard');
    }).catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
}

/**
 * Fallback clipboard copy using textarea.
 */
function fallbackCopy(text, successMessage) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMessage || 'Copied to clipboard');
  } catch (err) {
    showToast('Failed to copy text');
  }
  document.body.removeChild(ta);
}

/**
 * Helper: Escapes HTML to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Helper: Capitalizes first letter.
 * @param {string} s
 * @returns {string}
 */
function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Kick off when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
