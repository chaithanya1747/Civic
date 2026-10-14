# 📢 CivicSignal AI

> **Important local information, made easy for everyone.**  
> *A Solo College Hackathon Project under the theme: **Citizen Engagement and Public Services***

---

## 📌 1. Project Overview

**CivicSignal AI** is a lightweight, responsive web application that helps citizens easily understand official government announcements, civic alerts, and municipal administrative orders. In most cities, public notices regarding water cuts, scheduled power outages, vaccination drives, traffic diversions, and tax rebates are published as long, technical, and confusing circulars. 

CivicSignal AI transforms these complicated official circulars into:
- **Plain-Language Summaries**: Plain-English and plain-Telugu explanations that anyone can read in under 30 seconds.
- **Important Dates & Windows**: Clear timelines specifying start and end dates/times, verified against real calendars.
- **Affected Locations**: Specific neighborhoods, colonies, wards, and street junctions with one-click filtering.
- **Actionable Citizen Checklists**: Clear, practical steps citizens should take before or during an event.
- **Bilingual Regional Support**: Demonstration support for English and Telugu (తెలుగు) to reach a wider public audience.

> 💡 **Hackathon Note:** CivicSignal AI is an academic demonstration prototype built using pure frontend web technologies (HTML, CSS, JavaScript) and browser `localStorage`. It does not connect to live government databases, and all sample notices are curated demonstration data.

---

## 🛑 2. Problem Statement

Public notices are essential for daily urban life, yet citizens regularly miss or misunderstand them because:
1. **Dense Bureaucratic Jargon:** Official circulars are often 5 to 10 pages long and written in complex legal, administrative, and engineering terminology.
2. **Scattered Information:** Critical details—such as which specific localities are affected, exact shutdown hours, and emergency helpline numbers—are buried deep in paragraphs.
3. **No Clear Action Steps:** Circulars rarely tell citizens what practical precautions to take (e.g., storing water 24 hours in advance, charging backup batteries, or using detour link roads).
4. **Language Barriers:** Non-English speakers struggle when notices are issued solely in formal English or high-register official vocabulary.

---

## 💡 3. Proposed Solution & Key Differentiator

### The Core Differentiator: Notice-to-Action Intelligence

While typical portals merely display static notice feeds, CivicSignal AI is built around **Notice-to-Action Intelligence**, instantly answering three questions for any citizen:
1. 📍 **Does this notice affect my locality?** → Highlighted locality tags that instantly filter the feed when clicked.
2. ⏱️ **When does it happen?** → Clear start/end windows, specific operational hours, and active/upcoming status badges.
3. 📋 **What should I do?** → Practical preparation checklists with interactive checkboxes and progress tracking.

```
[Dense 10-Page Official Circular]
                ↓
    [CivicSignal AI Extraction]
                ↓
┌─────────────────────────────────────────────────────────┐
│ 1. Plain-Language Summary (3-4 concise sentences)       │
│ 2. When It Happens (Calendar Date & Precise Hours)      │
│ 3. Where It Applies (Affected Wards & Localities)       │
│ 4. What To Do (Interactive Preparation Checklist)       │
│ 5. Bilingual Toggle (English & Telugu)                  │
│ 6. Official Excerpt Comparison (Before vs. After)       │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 4. Project Objectives

- **Enhance Public Transparency:** Make municipal governance information accessible to all citizens, including senior citizens and non-technical residents.
- **Promote Preparedness:** Equip residents with interactive task checklists so they take timely action before outages or diversions occur.
- **Support Regional Languages:** Demonstrate bilingual accessibility with English and Telugu.
- **Deliver a Fast, Lightweight Experience:** Built with client-side web standards—zero build tools, zero npm packages, and zero server installation.
- **Enable Administrative Simulation:** Provide an easy-to-use Admin Demo Console where mock notices can be published, edited, and managed using browser `localStorage`.

---

## 🌟 5. Main Features

### 🏛️ Citizen Portal
- **Scannable Notice Cards:** Color-coded category tags, priority levels (Urgent, Standard, Advisory), and active status indicators.
- **Bilingual Interface:** One-click instant switching between **English** and **Telugu (తెలుగు)** for both interface labels and notice contents.
- **Instant Live Search:** Real-time multi-field search across titles, summaries, departments, locations, and official reference numbers.
- **Clickable Locality Chips:** Clicking any locality chip (e.g., `Kukatpally`) immediately filters the feed for that specific area.
- **Category Filter Pills:** Quickly filter announcements by:
  - 💧 Water Supply
  - ⚡ Electricity & Power
  - 🏥 Public Health
  - 🚗 Traffic & Transit
  - 💰 Taxes & Schemes
  - 🧹 Sanitation & Drainage
- **Interactive Action Checklist:** Citizens can check off actions (e.g., *"Store water before 9 PM"*) directly on the card or in the modal, with progress tracking saved in browser storage.
- **Detailed Citizen Breakdown Modal:** Displays full notice details, date/time highlights, affected ward chips, and an expandable **"Original Official Circular Text"** accordion to compare the complex bureaucratic text with the plain-language summary.
- **Print & Share Tools:** One-click print-ready notice view (`window.print()`) and one-click copy summary to clipboard.

### 🛠️ Administrator Demo Console
- **Publish New Notice:** Form allowing administrators to enter title, category, department, schedule, timings, affected locations, citizen actions, urgency, and original text.
- **⚡ Demo AI Summary Assistant — Simulated:** A simulated client-side helper that generates structured plain-language summary drafts and recommended action items from entered text using rule-based parsing.
- **Status Lifecycle Control:** Change notice status dynamically between `Active`, `Upcoming`, and `Completed`.
- **Visibility Toggle:** Toggle notices between `Published` (visible to citizens) and `Draft` (hidden from citizens).
- **Notice Management:** Delete individual notices or restore the initial 6 sample notices with one click.
- **Client-Side Persistence:** All additions, edits, and deletions persist inside the browser's `localStorage`.

---

## 💻 6. Technology Stack

| Component | Technology | Rationale |
|---|---|---|
| **Structure** | Semantic HTML5 | Accessible, SEO-friendly, clean markup |
| **Styling** | Vanilla CSS3 | Custom design system, responsive CSS Grid, print stylesheet, zero heavy frameworks |
| **Typography** | Google Fonts (`Outfit`, `Inter`, `Noto Sans Telugu`) with native system fallbacks (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`) | High-contrast civic typography; falls back seamlessly to native fonts offline |
| **Logic** | Vanilla JavaScript (ES6+) | Modular Model-View-Controller architecture without framework bloat |
| **Data Storage** | Browser `localStorage` | Zero server setup, instant persistence, offline capability |
| **Icons** | Native Unicode & Custom SVG | Fast loading, zero third-party font dependencies |

---

## 📁 7. Project Folder Structure

The application is structured cleanly and can be launched directly from either the workspace root or the `civicsignal-ai/` directory:

```
civicsignal-ai/
├── index.html              # Main application single-page structure & semantic layout
├── css/
│   └── style.css           # Modern civic design system, responsive grid, micro-animations & print CSS
├── js/
│   ├── app.js              # Application controller, bilingual localization & event handlers
│   ├── notices.js          # NoticeStore data access layer, search/filter queries & stats aggregations
│   └── demo-data.js        # 6 sample demo notices & parallel English/Telugu translation dictionaries
├── assets/
│   └── images/
│       └── logo.svg        # Custom CivicSignal AI brand SVG emblem
├── tests/
│   └── verify.js           # Automated 16-point verification test suite (Node.js)
├── docs/
│   ├── SYSTEM_DESIGN.md    # Frontend-only architecture, component breakdown & localStorage specs
│   ├── WORKFLOW.md         # Detailed citizen, administrator, and data lifecycle workflows
│   └── TESTING.md          # 16 executed test cases with procedures, inputs, and results
├── README.md               # Complete project presentation guide for hackathon judges
└── .gitignore              # Operating system, IDE, and temporary files exclusions
```

---

## 🚀 8. Setup & Run Instructions

CivicSignal AI requires **zero build steps, no npm install, and no backend dependencies**.

### Method 1: Python HTTP Server (Recommended)
```bash
# Navigate to project folder
cd /Users/chaithanya/Desktop/demo/civicsignal-ai

# Start local server
python3 -m http.server 8000
```
Open your browser and visit: **`http://localhost:8000/`**

### Method 2: Node.js Serve
```bash
cd /Users/chaithanya/Desktop/demo/civicsignal-ai
npx -y serve .
```

### Method 3: Direct File Launch
Double-click `index.html` or run:
```bash
open /Users/chaithanya/Desktop/demo/index.html   # macOS
```

---

## 📖 9. How to Use the Website

### For Citizens:
1. **Browse Notices:** Scroll down the homepage to view active public announcements.
2. **Search by Locality or Keyword:** Type a ward or keyword (e.g., `"Kukatpally"` or `"Power"`) into the search bar.
3. **Filter by Category:** Click any category pill (e.g., `💧 Water Supply` or `🚗 Traffic & Transit`) to view specific alerts.
4. **Click a Locality Chip:** Click on any highlighted location chip on a card to immediately filter the feed for that locality.
5. **View Notice Breakdown:** Click **"🔍 View Citizen Breakdown"** on any card to view the plain-language summary, schedule, affected wards, and action checklist.
6. **Check Off Actions:** Check off completed tasks (e.g., *"Store water before 9 PM"*) to track your readiness.
7. **Switch Language:** Click the **"తెలుగు"** button in the top navigation bar to read notices in Telugu.
8. **Print or Copy:** Use the **"🖨️ Print Notice"** or **"📋 Copy Summary"** buttons inside the modal dialog.

### For Administrators / Demonstrators:
1. **Access the Console:** Click **"🛠️ Admin Demo"** in the top navigation bar.
2. **Publish a Notice:** Fill out the form in the "Publish New Notice" tab.
3. **Use the Summary Assistant:** Paste circular text and click **"✨ Demo Summary Assistant (Draft Generator)"** to auto-populate draft summary and action fields.
4. **Click Publish:** Click **"📢 Publish Notice to Feed"** to add the notice to the feed.
5. **Manage Notices:** Switch to the **"Manage Notices"** tab to update notice statuses (`Active`, `Upcoming`, `Completed`), toggle visibility (`Published` / `Draft`), or delete notices.
6. **Reset Sample Data:** Click **"🔄 Reset to Sample Demo Data"** anytime to restore the original 6 sample notices.

---

## 📊 10. Demo Data Explanation

CivicSignal AI comes pre-loaded with **6 realistic public notices** representing common urban civic scenarios with verified calendar dates:

| ID | Category | Issuing Authority | Scenario | Schedule | Status | Priority |
|---|---|---|---|---|:---:|:---:|
| `cs-2026-001` | **Water Supply** | HMWSSB | 48-Hour Drinking Water Shutdown in West Zone for Pipeline Upgradation | Sat, Oct 17 - Mon, Oct 19, 2026 | Upcoming | Urgent |
| `cs-2026-002` | **Electricity** | TSSPDCL | Scheduled 33/11 KV Sub-Station Pre-Monsoon Maintenance & Outage | Fri, Oct 16, 2026 (10 AM - 2 PM) | Upcoming | Standard |
| `cs-2026-003` | **Public Health** | Health Dept | National Pulse Polio Immunization Drive Across Urban Health Centers | Sun, Oct 25, 2026 (7 AM - 6 PM) | Upcoming | Advisory |
| `cs-2026-004` | **Traffic & Transit** | Traffic Police | Nightly Traffic Diversions on Outer Ring Road for Steel Flyover Girders | Oct 14 - Oct 20, 2026 (11 PM - 5 AM) | Active | Urgent |
| `cs-2026-005` | **Taxes & Schemes** | Municipal Revenue | 5% Early Bird Incentive Rebate on Full Year Property Tax Settlement | Valid till Sat, Oct 31, 2026 | Active | Advisory |
| `cs-2026-006` | **Sanitation** | Sanitation Division | Underground Drainage De-silting Drive Completed in Eastern Wards | Completed on Sun, Oct 11, 2026 | Completed | Standard |

---

## 🤖 11. AI Implementation & Honest Explanation

- **Client-Side Simulation (Not a Live LLM):** The **Demo AI Summary Assistant — Simulated** feature is a purely client-side, rule-based simulation, not a live AI model or autonomous agent.
- **Rule Template Draft Generation:** It parses provided title, category, and location fields to generate a structured draft summary and recommended action items based on civic domain patterns.
- **Human Editorial Review Required:** Every generated draft is explicitly labeled `[Draft Summary - Please Review]` to emphasize that municipal announcements must be verified and confirmed by department staff.
- **Future Integration Path:** Real automated extraction from unstructured multi-page circulars would require a future server-side AI model integration (e.g., Google Gemini API), securely handling API keys without exposing secrets in client code.

---

## 🧪 12. Testing Status

The project includes an automated test suite verifying all 16 core requirements:
- **Test Suite Result:** **16 Passed, 0 Failed (100% Pass Rate)**
- Full verification logs, test objectives, and procedures are documented in [`docs/TESTING.md`](./docs/TESTING.md).

---

## ⚠️ 13. Known Limitations

1. **Browser-Scoped Storage:** Data persists in the browser's local `localStorage`. It does not sync across different physical devices.
2. **Simulated Assistant:** The summary assistant is rule-based and does not use a live LLM API.
3. **Open Admin Console:** The demo console is open without password authentication for easy hackathon judging.
4. **Demonstration Data:** All circulars, departments, and notices are realistic simulated scenarios created for hackathon demonstration.

---

## 🔮 14. Future Improvements

1. **Live Municipal API Connectors:** Sync notices automatically with official municipal portals via RSS or open data APIs.
2. **Server-Side LLM Pipeline:** Use Google Gemini 2.0 to parse uploaded PDF circulars and automatically generate structured bilingual JSON summaries.
3. **Multi-Language Expansion:** Add support for Hindi, Kannada, Tamil, Marathi, and Urdu.
4. **Location-Based Geo-Alerts:** Send push notifications based on postal codes or GPS proximity.
5. **WhatsApp Citizen Helpline:** Enable citizens to forward circulars to a WhatsApp civic bot to receive instant audio or text summaries.

---

## 🎤 15. Student Hackathon Demonstration Script (2–3 Minutes)

When presenting to judges, follow this concise flow:

1. **The Hook (30s):**  
   *"Hello judges! In our cities, public announcements—like water cuts or power outages—are published as 10-page bureaucratic circulars full of legal jargon. Citizens miss them, get confused, and struggle to prepare. CivicSignal AI solves this with **Notice-to-Action Intelligence**."*
2. **The Citizen Feed (30s):**  
   *"Here is our homepage. Each notice card immediately answers three questions: Does this affect my area? When does it happen? And what should I do? For example, looking at this water shutdown notice, citizens can click 'Kukatpally' to see all notices affecting their area."*
3. **Notice Details & Comparison (30s):**  
   *"When we open a notice, notice the contrast: here is the 3-sentence citizen summary, the exact schedule, and an interactive preparation checklist. Below is the official circular text accordion—citizens can see how dense the original document was compared to our simplified summary."*
4. **Bilingual Regional Support (20s):**  
   *"With one click on 'తెలుగు', the entire portal, including notice cards, checklists, and dates, switches to Telugu, making civic information truly accessible."*
5. **Admin Demo Console (30s):**  
   *"Administrators can publish new notices using our simulated Summary Assistant, update notice statuses, and toggle visibility. Everything persists offline in browser `localStorage` with zero server dependencies."*
