# CivicSignal AI — System Design Document

**Project Theme:** Citizen Engagement and Public Services  
**Project Name:** CivicSignal AI  
**Tagline:** Important local information, made easy for everyone.  
**Architecture Model:** Frontend-Only Single Page Web Application (Vanilla HTML/CSS/JavaScript + Browser LocalStorage)  
**Hackathon Edition:** College Demonstration Prototype (Round 1 Ready)  

---

## 1. System Overview

**CivicSignal AI** is a lightweight, client-side web application designed to help ordinary citizens quickly understand complex public notices issued by municipal and government authorities. In real life, government notifications, civic alerts, and administrative orders are often published as dense, multi-page circulars filled with legal and technical jargon.

CivicSignal AI provides **Notice-to-Action Intelligence**, breaking down announcements into:
1. **Plain-Language Summaries**: Explaining the core announcement in everyday terms.
2. **Critical Timelines**: Highlighting precise dates, start/end windows, and operational hours verified against calendars.
3. **Affected Locations**: Pinpointing specific wards, sectors, colonies, and landmarks with one-click filtering.
4. **Actionable Citizen Checklists**: Providing step-by-step guidance on what citizens must do (e.g., store water, unplug appliances, use detour routes) with live completion tracking.
5. **Bilingual Regional Support**: Offering seamless switching between English and Telugu (తెలుగు) demo content.

The system is built entirely with client-side web standards, requiring zero external server setup, no database installation, and no API keys, making it completely reliable and portable for hackathon evaluation and demonstration.

---

## 2. Basic Architecture

The architecture follows a modular, decoupled **Model-View-Controller (MVC)** pattern implemented directly in vanilla JavaScript without any heavy frameworks:

```
┌─────────────────────────────────────────────────────────────┐
│                       BROWSER CLIENT                        │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                     VIEW (UI)                       │   │
│   │  - index.html (Semantic HTML5 Document)             │   │
│   │  - style.css (Design System & Responsive Styles)    │   │
│   │  - Hero, Category Pills, Notice Cards, Modal Dialog │   │
│   │  - Admin Demo Console (Add Notice & Manage Table)   │   │
│   └──────────────────────────▲──────────────────────────┘   │
│                              │ Updates DOM / Captures Events│
│   ┌──────────────────────────▼──────────────────────────┐   │
│   │                  CONTROLLER (app.js)                │   │
│   │  - App State Management (Lang, Filter, Search, Sort)│   │
│   │  - Event Listeners (Input, Click, Change, Esc)      │   │
│   │  - Localization Engine (data-i18n String Swapper)   │   │
│   │  - UI Renderers (renderFeed, renderStats, Modal)    │   │
│   │  - Demo Summary Assistant Simulation Engine         │   │
│   └──────────────────────────▲──────────────────────────┘   │
│                              │ Invokes CRUD & Queries       │
│   ┌──────────────────────────▼──────────────────────────┐   │
│   │                  MODEL (notices.js)                 │   │
│   │  - NoticeStore Interface                            │   │
│   │  - queryNotices (Multi-Field Search & Filter Engine)│   │
│   │  - CRUD Handlers (addNotice, updateStatus, delete)  │   │
│   │  - Stats Aggregator (getStats)                      │   │
│   └──────────────────────────▲──────────────────────────┘   │
│                              │ Read / Write Serialized JSON │
│   ┌──────────────────────────▼──────────────────────────┐   │
│   │             PERSISTENCE & DATA LAYER                │   │
│   │  - Browser localStorage ('civicsignal_notices_v2')  │   │
│   │  - Checklist State ('civicsignal_checklist_v2')     │   │
│   │  - Default Seed Dataset (demo-data.js)              │   │
│   │  - UI Bilingual Dictionaries (demo-data.js)         │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Characteristics:
- **Serverless & Self-Contained:** Runs directly from any static web server or via `file://` protocol.
- **Offline Capable:** All scripts, styles, data, and icons are stored locally without external runtime API calls.
- **Immediate State Synchronization:** When an admin edits or adds a notice, changes are immediately committed to `localStorage` and re-rendered across both the public feed and admin view.

---

## 3. Main Website Components

1. **Hackathon Demo Banner**:
   - An alert bar clearly informing users that all notices are simulated demonstration data and not linked to official government portals.
2. **Site Header & Navigation**:
   - Brand identity (Logo, title, and tagline: *"Important local information, made easy for everyone."*).
   - Navigation links to jump between "Public Notices", "How It Works", and "Admin Demo".
   - Bilingual language selector toggle (`English` and `తెలుగు`).
3. **Hero & Metrics Dashboard**:
   - Live Search Input with instant debounce and clear button.
   - Real-time aggregated metrics counters derived from data (Total Notices, Active Notices, Upcoming Notices, Localities Covered, Supported Languages).
4. **Filter & Sort Controls Bar**:
   - 7 Category Pills (`All`, `Water Supply`, `Electricity`, `Public Health`, `Traffic & Transit`, `Taxes & Schemes`, `Sanitation`).
   - Status Filter dropdown (`All`, `Active`, `Upcoming`, `Completed`).
   - Chronological Sort dropdown (`Newest First`, `Oldest First`).
   - "Clear Filters" dynamic trigger button.
5. **Public Notices Grid (Notice-to-Action Intelligence)**:
   - Notice cards answering three core citizen questions: (1) Does this affect my locality? (2) When does it happen? (3) What should I do?
   - Interactive preparation checklist with real-time checkbox progress tracking.
   - Clickable locality chips that immediately filter the feed for that locality.
6. **Detailed Notice Modal Dialog**:
   - Plain-Language Summary callout box.
   - Schedule & Affected Localities 2-column detail grid.
   - Interactive Citizen Action Checklist with live completion progress bar.
   - Expandable Accordion: "Original Official Circular Text" allowing before/after comparison.
   - Verification Container: Official reference ID, issuing authority, and demonstration disclaimer.
   - Action controls: "Print Notice" (clean print stylesheet) and "Copy Summary".
7. **Educational "How It Works" Section**:
   - 3-step visual narrative explaining the civic problem of complex government orders, structured information extraction, and multilingual delivery.
8. **Administrator Demo Console**:
   - Tab 1: **Publish New Notice Form** with field validation.
   - **⚡ Demo AI Summary Assistant — Simulated**: Client-side draft generator using civic domain rule templates, clearly marked as requiring human staff review.
   - Tab 2: **Manage Notices Table** with status dropdowns, visibility toggles (`Published` / `Draft`), delete buttons, and "Reset to Sample Demo Data".

---

## 4. Data Storage & LocalStorage Specifications

Data persistence is handled by `NoticeStore` in `notices.js` using browser `window.localStorage`:

1. **Storage Keys**:
   - `civicsignal_notices_v2`: Stores the JSON-serialized array of public notices.
   - `civicsignal_lang`: Stores the citizen's preferred language (`'en'` or `'te'`).
   - `civicsignal_checklist_v2`: Stores a dictionary of completed citizen checklist items keyed by `${noticeId}_act_${index}`.
2. **Initialization Routine**:
   - `NoticeStore.init()` queries `localStorage.getItem('civicsignal_notices_v2')`.
   - If no data exists or data is corrupted, `NoticeStore.resetDefaults()` copies the initial sample notices from `DEFAULT_NOTICES` into localStorage.
3. **CRUD Operations**:
   - Every addition, deletion, or status update calls `NoticeStore.save(notices)`, serializing the modified array back to localStorage via `JSON.stringify()`.

---

## 5. System Limitations & Non-Goals

1. **No Live Backend / Database:** Data is stored exclusively in the browser's local `localStorage`. Changes are isolated to that specific browser instance.
2. **No Authentication:** The Admin Console is an open simulation without password authentication, designed solely for judges to test content management.
3. **Simulated AI Assistant:** The summary assistant is client-side and rule-based; it does not connect to a live LLM API or autonomous agent backend.
4. **Not Connected to Official Government Systems:** Sample circulars and notices are simulated demonstration records designed for presentation purposes.
