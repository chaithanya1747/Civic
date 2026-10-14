# CivicSignal AI — User & Data Workflows

**Project Theme:** Citizen Engagement and Public Services  
**Project Name:** CivicSignal AI  
**Tagline:** Important local information, made easy for everyone.  

This document details the three primary operating workflows of CivicSignal AI:
1. **Citizen Workflow** (Public User Journey)
2. **Administrator Demo Workflow** (Content Management Journey)
3. **Data Lifecycle Workflow** (Persistence & State Management)

---

## A. Citizen Workflow

```mermaid
flowchart TD
    A[1. Open Homepage] --> B[2. View Metrics & Browse Feed]
    B --> C{Search or Filter?}
    C -->|Search by Locality/Keyword| D[Enter Search Query e.g. 'Kukatpally']
    C -->|Click Locality Chip| D2[Click Chip on Notice Card]
    C -->|Filter by Category| E[Click Category Pill e.g. 'Water Supply']
    C -->|Direct Browsing| F[Browse Notice Cards]
    D --> G[Instant Filtered Results]
    D2 --> G
    E --> G
    F --> G
    G --> H[3. Open Notice Modal]
    H --> I[Review Answers: Locality, When, What To Do]
    H --> J[Check Off Citizen Action Items]
    H --> K[Compare with Official Circular Excerpt]
    H --> L[Print or Copy Notice]
    B --> M[4. Switch Language to Telugu]
    M --> N[All UI & Notice Content Translates to Telugu]
```

### Step 1: Open the Homepage
- The citizen opens the web application in any standard web browser on desktop or mobile.
- The hero section displays the core mission: *"Important local information, made easy for everyone."*
- Quick stats highlight active alerts, upcoming notices, affected localities, and supported languages.

### Step 2: Browse or Search Public Notices
- **Live Search**: The citizen types a query into the central search bar (e.g., `"Kukatpally"`, `"outage"`, `"health"`, or a circular reference number).
- **Locality Chip Click**: Clicking on any highlighted location chip on a card immediately filters the feed for that locality.
- **Category Filter Pills**: Clicking category pills filters the feed instantly without reloading.

### Step 3: Open a Notice for Full Breakdown
- The citizen clicks **"View Citizen Breakdown"** on any card to open the modal dialog.
- The modal highlights:
  1. **Plain-Language Summary**: The core announcement in 3–4 sentences.
  2. **Dates & Timings**: Verified calendar schedule and hours.
  3. **Affected Localities**: Specific municipal wards and neighborhoods.
  4. **Interactive Action Checklist**: Steps the citizen must take, with live percentage progress tracking.
  5. **Verification Container**: Reference number and demonstration status disclaimer.
  6. **Original Official Circular Text**: Expandable accordion comparing complex bureaucratic text with the plain summary.
  7. **Print & Copy Tools**: One-click printable view or summary clipboard copy.

### Step 4: Switch Between English and Telugu Demo Content
- The citizen clicks the **"తెలుగు"** button in the top navigation header.
- The entire interface, navigation labels, category pills, notice titles, summaries, and action items instantly translate into Telugu.

---

## B. Administrator Demo Workflow

```mermaid
flowchart TD
    A[1. Click 'Admin Demo' in Navigation] --> B[Open Admin Demo Console]
    B --> C[2. Enter Notice Information]
    C --> D{Use Summary Assistant?}
    D -->|Yes| E[Click 'Demo Summary Assistant']
    E --> F[Auto-generate Draft Summary & Actions]
    D -->|No| G[Manually Write Summary]
    F --> H[3. Click 'Publish Notice to Feed']
    G --> H
    H --> I[4. Notice Saved to localStorage & Feed Refreshed]
    I --> J[5. Switch to 'Manage Notices' Tab]
    J --> K[Change Status: Active / Upcoming / Completed]
    J --> L[Toggle Visibility: Published / Draft]
    J --> M[6. Delete Notice or Click 'Reset to Sample Data']
```

### Step 1: Open the Admin Demo Page
- Click **"🛠️ Admin Demo"** in the top navigation. The view transitions smoothly with a simulation disclaimer.

### Step 2: Enter Notice Details
- In the **"Publish New Notice"** tab, enter title, category, department, dates, timings, affected locations, actions, priority, and original circular text.

### Step 3: Utilize the Demo Summary Assistant
- Click **"✨ Demo AI Summary Assistant — Simulated"** to generate a structured draft summary and suggested actions based on the entered text using client-side rule templates.
- Review and refine the draft before publishing.

### Step 4: Publish Notice to Feed
- Click **"📢 Publish Notice to Feed"**.
- Form validation confirms all required fields are filled.
- An official reference number (e.g., `DEMO-REF: CS/WATER/2026/894`) is auto-generated and saved to `localStorage`.
- The view automatically switches to the **"Manage Notices"** table with a success toast.

### Step 5: Update Status or Visibility
- Change notice status between `Active`, `Upcoming`, and `Completed`.
- Toggle between `Published` (visible to citizens) and `Draft` (hidden from citizens).

### Step 6: Delete or Reset Sample Data
- Delete unwanted notices.
- Click **"🔄 Reset to Sample Demo Data"** anytime to restore the original 6 sample notices.

---

## C. Data Lifecycle Workflow

```mermaid
sequenceDiagram
    autonumber
    participant Browser as Browser Client
    participant App as app.js (Controller)
    participant Store as NoticeStore (notices.js)
    participant Storage as window.localStorage ('civicsignal_notices_v2')
    participant Seed as demo-data.js (Default Data)

    Note over Browser,Storage: Page Initialization
    Browser->>App: DOMContentLoaded Event
    App->>Store: NoticeStore.init()
    Store->>Storage: localStorage.getItem('civicsignal_notices_v2')
    alt Storage has saved notices
        Storage-->>Store: JSON String
        Store-->>App: Parsed Notices Array
    else Storage is empty or first visit
        Storage-->>Store: null
        Store->>Seed: Clone DEFAULT_NOTICES (6 notices)
        Store->>Storage: localStorage.setItem('civicsignal_notices_v2', JSON.stringify(DEFAULT_NOTICES))
        Store-->>App: Seed Notices Array
    end
    App->>Browser: Render Feed Cards, Stats & Admin Table

    Note over Browser,Storage: Adding or Updating a Notice
    Browser->>App: Admin Submits Notice / Changes Status
    App->>Store: NoticeStore.addNotice(notice) or updateStatus(id, status)
    Store->>Storage: localStorage.setItem('civicsignal_notices_v2', JSON.stringify(notices))
    Store-->>App: Operation Success
    App->>Browser: Update Feed, Refresh Stats, Show Toast
```
