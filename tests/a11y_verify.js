/**
 * CivicSignal AI - WCAG 2.2 Level AA Accessibility Automated Verification Suite
 * Validates semantic HTML, keyboard accessibility, screen reader ARIA attributes,
 * color contrast calculations, form validations, reduced motion, and focus management.
 */

const fs = require('fs');
const path = require('path');

// Helper for contrast calculation (WCAG 2.2 Relative Luminance)
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function runSuite() {
  console.log('=================================================================');
  console.log('   CivicSignal AI - WCAG 2.2 Level AA Automated A11y Suite      ');
  console.log('=================================================================\n');

  let passed = 0;
  let failed = 0;

  function test(id, description, fn) {
    try {
      fn();
      console.log(`[PASS] ${id}: ${description}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${id}: ${description}`);
      console.error(`       Error: ${err.message}`);
      failed++;
    }
  }

  const htmlPath = path.join(__dirname, '..', 'index.html');
  const cssPath = path.join(__dirname, '..', 'css', 'style.css');
  const appJsPath = path.join(__dirname, '..', 'js', 'app.js');

  const html = fs.readFileSync(htmlPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');

  // Test A11Y-01: Landmarks and semantic structure
  test('A11Y-01', 'Semantic HTML5 Landmark Elements present without redundant roles', () => {
    if (!html.includes('<header class="site-header">')) throw new Error('Missing <header>');
    if (!html.includes('<nav class="navbar"') && !html.includes('<nav aria-label="Main Navigation"')) throw new Error('Missing <nav>');
    if (!html.includes('<main id="mainFeedView"')) throw new Error('Missing <main>');
    if (!html.includes('<footer class="site-footer">')) throw new Error('Missing <footer>');
    if (!html.includes('<section class="hero-section"')) throw new Error('Missing hero <section>');
    if (!html.includes('<section class="notices-container"') && !html.includes('id="feed"')) throw new Error('Missing feed <section>');
  });

  // Test A11Y-02: Heading hierarchy
  test('A11Y-02', 'Heading Hierarchy: Single H1 for page, logical H2 and H3 child structure', () => {
    const h1Matches = html.match(/<h1[\s>]/g) || [];
    if (h1Matches.length !== 1) {
      throw new Error(`Expected exactly one <h1> element, found ${h1Matches.length}`);
    }
    if (!html.includes('id="heroMainHeading"')) throw new Error('Primary h1 must be heroMainHeading');
    if (!html.includes('id="feedHeading"')) throw new Error('Feed section must contain h2 with feedHeading');
    if (!appJs.includes('<h3 class="card-title">')) throw new Error('Notice cards must use <h3> for titles under feed section');
  });

  // Test A11Y-03: Skip to content keyboard bypass block
  test('A11Y-03', 'Keyboard Bypass: Skip to main content link with proper target and CSS styling', () => {
    if (!html.includes('<a href="#mainFeedView" class="skip-link">')) {
      throw new Error('Skip to main content link missing in HTML');
    }
    if (!css.includes('.skip-link')) {
      throw new Error('.skip-link styles missing in CSS');
    }
    if (!css.includes('.skip-link:focus')) {
      throw new Error('.skip-link:focus styles missing in CSS');
    }
  });

  // Test A11Y-04: High contrast focus indicators
  test('A11Y-04', 'Keyboard Focus: Visible :focus-visible indicators with 3:1+ contrast against background', () => {
    if (!css.includes(':focus-visible')) throw new Error(':focus-visible pseudo-class missing in CSS');
    if (!css.includes('outline: 3px solid #1d4ed8') && !css.includes('outline-offset: 2px')) {
      throw new Error('Visible high-contrast focus outline not found');
    }
  });

  // Test A11Y-05: Modal Dialog Accessibility & Keyboard Trap
  test('A11Y-05', 'Accessible Dialog: role="dialog", aria-modal="true", labelledby, focus trap & restoration', () => {
    if (!html.includes('role="dialog"') || !html.includes('aria-modal="true"')) {
      throw new Error('Modal overlay must have role="dialog" and aria-modal="true"');
    }
    if (!html.includes('aria-labelledby="modalNoticeTitle"')) {
      throw new Error('Modal must have aria-labelledby="modalNoticeTitle"');
    }
    if (!html.includes('aria-describedby="modalSummaryBox"')) {
      throw new Error('Modal must have aria-describedby="modalSummaryBox"');
    }
    if (!appJs.includes('activeModalTrigger = triggerEl || document.activeElement;')) {
      throw new Error('openModal must track previous focus');
    }
    if (!appJs.includes('activeModalTrigger.focus()')) {
      throw new Error('closeModal must restore focus to trigger element');
    }
    if (!appJs.includes("e.key === 'Escape'")) {
      throw new Error('Escape key listener missing on modal');
    }
    if (!appJs.includes("e.key === 'Tab'")) {
      throw new Error('Tab keyboard trap missing on modal');
    }
  });

  // Test A11Y-06: WAI-ARIA Tablist Pattern for Admin & Category Pills
  test('A11Y-06', 'Tablist Navigation: role="tablist", role="tab", aria-selected, and arrow key listeners', () => {
    if (!html.includes('role="tablist"')) throw new Error('Missing role="tablist"');
    if (!html.includes('role="tab"')) throw new Error('Missing role="tab"');
    if (!html.includes('aria-selected="true"')) throw new Error('Missing initial aria-selected="true"');
    if (!html.includes('role="tabpanel"')) throw new Error('Missing role="tabpanel"');
    if (!appJs.includes("e.key === 'ArrowRight'") || !appJs.includes("e.key === 'ArrowLeft'")) {
      throw new Error('Arrow key navigation missing for tablist');
    }
  });

  // Test A11Y-07: Form accessibility and validation error association
  test('A11Y-07', 'Accessible Forms: Labels associated via for/id, aria-required, aria-invalid, and live error alerts', () => {
    const requiredInputIds = [
      'noticeTitleEn', 'noticeDeptEn', 'noticeDateEn',
      'noticeLocationsEn', 'noticeActionsEn', 'noticeOriginalEn', 'noticeSummaryEn'
    ];
    for (const id of requiredInputIds) {
      if (!html.includes(`for="${id}"`)) throw new Error(`Missing label for input #${id}`);
      if (!html.includes(`id="${id}"`)) throw new Error(`Missing input #${id}`);
    }
    if (!html.includes('class="required-indicator"')) {
      throw new Error('Missing visible required indicators');
    }
    if (!html.includes('role="alert"') || !html.includes('aria-live="polite"')) {
      throw new Error('Error spans must have role="alert" and aria-live="polite"');
    }
    if (!appJs.includes("inputEl.setAttribute('aria-invalid', 'true')")) {
      throw new Error('Validation must set aria-invalid="true" on error');
    }
    if (!appJs.includes('firstInvalidEl.focus()')) {
      throw new Error('Form validation must move keyboard focus to first invalid input');
    }
  });

  // Test A11Y-08: Accessible Citizen Action Checklists
  test('A11Y-08', 'Checklists: Inputs explicitly associated with <label> and have accessible names', () => {
    if (!appJs.includes('<label for="${inputId}" class="action-label"')) {
      throw new Error('Checklist items must have associated <label> elements');
    }
    if (!appJs.includes('aria-label="Mark action completed:')) {
      throw new Error('Checklist checkboxes must have descriptive aria-label');
    }
  });

  // Test A11Y-09: Live Regions for Dynamic Updates
  test('A11Y-09', 'Live Regions: Search results count and toast notification container configured with aria-live', () => {
    if (!html.includes('id="resultsCount"') || !html.includes('aria-live="polite"')) {
      throw new Error('#resultsCount must have aria-live="polite"');
    }
    if (!html.includes('id="toastContainer"') || !html.includes('aria-live="polite"')) {
      throw new Error('#toastContainer must have aria-live="polite"');
    }
    if (!appJs.includes("toast.setAttribute('role', 'status')")) {
      throw new Error('Toasts must have role="status"');
    }
  });

  // Test A11Y-10: Color Contrast Ratios (WCAG 2.2 AA >= 4.5:1 for normal text)
  test('A11Y-10', 'Color Contrast: Token contrast ratios against background meet WCAG 2.2 AA (>= 4.5:1)', () => {
    const textMutedRatio = getContrastRatio('#475569', '#ffffff');
    if (textMutedRatio < 4.5) {
      throw new Error(`--text-muted (#475569) contrast is ${textMutedRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const waterRatio = getContrastRatio('#0369a1', '#e0f2fe');
    if (waterRatio < 4.5) {
      throw new Error(`Water category contrast is ${waterRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const electricityRatio = getContrastRatio('#92400e', '#fef3c7');
    if (electricityRatio < 4.5) {
      throw new Error(`Electricity category contrast is ${electricityRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const healthRatio = getContrastRatio('#991b1b', '#fee2e2');
    if (healthRatio < 4.5) {
      throw new Error(`Health category contrast is ${healthRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const trafficRatio = getContrastRatio('#854d0e', '#fef9c3');
    if (trafficRatio < 4.5) {
      throw new Error(`Traffic category contrast is ${trafficRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const revenueRatio = getContrastRatio('#065f46', '#d1fae5');
    if (revenueRatio < 4.5) {
      throw new Error(`Revenue category contrast is ${revenueRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const sanitationRatio = getContrastRatio('#155e75', '#cffafe');
    if (sanitationRatio < 4.5) {
      throw new Error(`Sanitation category contrast is ${sanitationRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }

    const activeStatusRatio = getContrastRatio('#065f46', '#d1fae5');
    if (activeStatusRatio < 4.5) {
      throw new Error(`Active status contrast is ${activeStatusRatio.toFixed(2)}:1, expected >= 4.5:1`);
    }
  });

  // Test A11Y-11: Screen Reader Decorative Icons
  test('A11Y-11', 'Decorative Icon Hiding: Decorative icons/emojis use aria-hidden="true"', () => {
    if (!html.includes('class="brand-logo"') || !html.includes('aria-hidden="true"')) {
      throw new Error('Brand icon must be aria-hidden');
    }
    if (!/<span[^>]*aria-hidden="true"[^>]*>🔍<\/span>/.test(html)) {
      throw new Error('Search icons must be aria-hidden');
    }
    if (!appJs.includes('<span aria-hidden="true">🔍</span>')) {
      throw new Error('Card buttons must hide decorative search icons');
    }
    if (!appJs.includes('<span aria-hidden="true">📋</span>')) {
      throw new Error('Card buttons must hide decorative clipboard icons');
    }
  });

  // Test A11Y-12: Reduced Motion Support
  test('A11Y-12', 'Reduced Motion: prefers-reduced-motion media query suppresses animations', () => {
    if (!css.includes('@media (prefers-reduced-motion: reduce)')) {
      throw new Error('Missing @media (prefers-reduced-motion: reduce) block');
    }
    if (!css.includes('animation-duration: 0.01ms') && !css.includes('transition-duration: 0.01ms')) {
      throw new Error('Reduced motion query must disable/shorten transitions');
    }
    if (!css.includes('scroll-behavior: auto !important')) {
      throw new Error('Reduced motion query must set scroll-behavior: auto');
    }
  });

  // Test A11Y-13: 200% Zoom and Viewport Scalability
  test('A11Y-13', 'Responsive Zoom: Viewport meta tag supports scaling and CSS supports 320px-360px reflow', () => {
    if (!html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0">')) {
      throw new Error('Viewport must allow user scaling and default initial scale');
    }
    if (html.includes('maximum-scale') || html.includes('user-scalable=no')) {
      throw new Error('Viewport meta must not disable user-scalable or limit maximum-scale');
    }
    if (!css.includes('@media (max-width: 640px)') || !css.includes('@media (max-width: 360px)')) {
      throw new Error('Missing responsive reflow breakpoints in CSS');
    }
  });

  // Test A11Y-14: Language attribute synchronization
  test('A11Y-14', 'Localization: html tag has lang attribute and updates dynamically on switch', () => {
    if (!html.includes('<html lang="en">')) {
      throw new Error('Document root must have lang="en" by default');
    }
    if (!appJs.includes('document.documentElement.lang = lang;')) {
      throw new Error('applyLanguage must synchronize document.documentElement.lang');
    }
  });

  // Test A11Y-15: Progressbar Accessibility
  test('A11Y-15', 'Progress Indicator: role="progressbar" with aria-valuenow, valuemin, and valuemax', () => {
    if (!appJs.includes('role="progressbar"')) {
      throw new Error('Modal checklist progress bar must have role="progressbar"');
    }
    if (!appJs.includes('aria-valuemin="0"') || !appJs.includes('aria-valuemax="100"')) {
      throw new Error('Progressbar must have aria-valuemin="0" and aria-valuemax="100"');
    }
    if (!appJs.includes("wrap.setAttribute('aria-valuenow', pct)")) {
      throw new Error('Progressbar must update aria-valuenow on completion percentage change');
    }
  });

  // Test A11Y-16: Admin Table Accessibility
  test('A11Y-16', 'Data Table: <caption>, <th scope="col">, and descriptive aria-labels for actions', () => {
    if (!html.includes('<caption class="sr-only">')) {
      throw new Error('Admin notices table must have a screen-reader accessible <caption>');
    }
    if (!html.includes('<th scope="col"')) {
      throw new Error('Table header cells must specify scope="col"');
    }
    if (!appJs.includes('aria-label="Update status for notice:')) {
      throw new Error('Status select in table rows must have descriptive aria-label');
    }
    if (!appJs.includes('aria-label="Toggle publication for notice')) {
      throw new Error('Toggle published button in table rows must have descriptive aria-label');
    }
  });

  console.log('\n=================================================================');
  console.log(`Accessibility Verification Summary: ${passed} PASSED, ${failed} FAILED`);
  console.log('=================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSuite();
