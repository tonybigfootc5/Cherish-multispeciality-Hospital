# Cherish Multispeciality Hospital — Technical Handover Document

**Date:** April 7, 2026  
**Repository:** https://github.com/tonybigfootc5/Cherish-multispeciality-Hospital  
**Branch:** `main`  
**Latest Commit:** `3b89d6f`  
**Status:** Production-ready, fully deployed

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure & Line Counts](#2-file-structure--line-counts)
3. [Technology Stack](#3-technology-stack)
4. [External Dependencies](#4-external-dependencies)
5. [index.html — Main Page Architecture](#5-indexhtml--main-page-architecture)
6. [style.css — Styling Architecture](#6-stylecss--styling-architecture)
7. [script.js — JavaScript Architecture](#7-scriptjs--javascript-architecture)
8. [Department Pages](#8-department-pages)
9. [dept-style.css — Department Page Styles](#9-dept-stylecss--department-page-styles)
10. [Assets (Images & Videos)](#10-assets-images--videos)
11. [Theme System (Dark/Light Mode)](#11-theme-system-darklight-mode)
12. [Key Contact Information (Hardcoded)](#12-key-contact-information-hardcoded)
13. [Git History & Change Log](#13-git-history--change-log)
14. [Deployment & Hosting](#14-deployment--hosting)
15. [Known Patterns & Conventions](#15-known-patterns--conventions)
16. [What Was Done (Work Summary)](#16-what-was-done-work-summary)

---

## 1. Project Overview

Static marketing website for **Cherish Multispeciality Hospital**, Vijayawada. No backend, no database, no build tools — pure HTML/CSS/JS served as static files.

**Core features:**
- Responsive dark/light theme with localStorage persistence
- Hero section with looping MP4 video background
- 8 department pages with individual content, doctors, FAQs
- One-tap phone call CTAs (replaced a full booking system)
- Animated stats counters, scroll-reveal sections, marquee testimonials
- Doctor spotlight featuring Dr. Indra Mohan (Chief Surgeon & Director)

---

## 2. File Structure & Line Counts

```
CHERRISH/
├── index.html              (~850 lines)   — Main landing page
├── style.css               (~2500 lines)  — All main page styles + themes
├── script.js               (~550 lines)   — All interactive JavaScript
├── dept-style.css          (~600 lines)   — Shared department page styles
├── departments/
│   ├── cardiology.html     (~240 lines)
│   ├── dermatology.html    (~180 lines)
│   ├── ent.html            (~190 lines)
│   ├── general-surgery.html(~220 lines)
│   ├── gynecology.html     (~200 lines)
│   ├── neurology.html      (~210 lines)
│   ├── orthopedics.html    (~240 lines)
│   └── pediatrics.html     (~220 lines)
├── images/
│   ├── logo.png                                    — Hospital logo
│   ├── ChatGPT Image Mar 24, 2026, 06_59_44 PM.png — Dr. Indra Mohan photo #1
│   ├── ChatGPT Image Mar 24, 2026, 07_15_55 PM.png — Dr. Indra Mohan photo #2 (director msg)
│   └── ChatGPT Image Mar 24, 2026, 07_28_48 PM.png — Additional facility image
├── videos/
│   └── hero-dna.mp4        — DNA helix hero background video
├── HANDOVER.md             — This document
└── .git/                   — Git repository
```

---

## 3. Technology Stack

| Aspect | Detail |
|--------|--------|
| **Languages** | HTML5, CSS3, JavaScript (ES6+) |
| **Architecture** | Static site, client-side only |
| **Frameworks** | None (vanilla everything) |
| **Build tools** | None (no bundler, no preprocessor) |
| **CSS approach** | Custom properties (variables), dark/light themes via `data-theme` |
| **Responsive** | Mobile-first, breakpoints at 768px and 480px |
| **Typography** | Google Fonts — Inter (300–800 weights) |
| **Icons** | Font Awesome 6.5.1 (solid + brands) |
| **SEO** | Meta tags, Open Graph tags, semantic HTML5 |
| **Browser support** | Modern browsers (CSS Grid, Flexbox, CSS Custom Properties) |
| **State** | `localStorage` for theme preference only (`cherishTheme` key) |

---

## 4. External Dependencies

All loaded via CDN — no `node_modules` or package manager.

| Dependency | URL | Purpose |
|-----------|-----|---------|
| **Google Fonts (Inter)** | `fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800` | Primary typeface |
| **Font Awesome 6.5.1** | `cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css` | Icons throughout |
| **Unsplash Images** | `images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=...&q=80` | Gallery/facility/department hero images |

> **Note:** Unsplash images are hotlinked. If Unsplash changes URLs or rate-limits, images will break. Consider downloading and hosting locally for production stability.

---

## 5. index.html — Main Page Architecture

### Section Map (top to bottom)

| # | Section | ID/Class | Purpose |
|---|---------|----------|---------|
| 1 | **Toast Container** | `#toast-container` | ARIA live region for notifications |
| 2 | **Navbar** | `#navbar` | Fixed nav: logo, links, Call Now button, theme toggle, hamburger |
| 3 | **Hero** | `#home` | Full-screen video background, headline, CTA buttons |
| 4 | **Trust Stats** | `#stats` | 4 animated counter cards (patients, surgeries, departments, doctors) |
| 5 | **Departments** | `#departments` | Filterable grid (All/Surgical/Medical/Specialty), rendered by JS |
| 6 | **Doctor Spotlight** | `#doctor-spotlight` | Dr. Indra Mohan feature — photo, credentials, call CTA |
| 7 | **Smart Call** | `#booking` | Primary phone call section — Smart Call card + WhatsApp/Email/Hours |
| 8 | **Facilities** | `#facilities` | 6-card image gallery with hover overlays |
| 9 | **Why Choose Us** | `#why-us` | 6 feature cards (technology, ambulance, doctors, care, pricing, infrastructure) |
| 10 | **Director's Message** | `#director-message` | Quote + photo + 3-stat row |
| 11 | **Testimonials** | `#testimonials` | CSS-only marquee with 5 patient reviews (duplicated for seamless loop) |
| 12 | **Footer** | `footer` | 4-column grid: about, quick links, departments, newsletter + credit |

### Navbar Links
- Home → `#home`
- Departments → `#departments`
- Doctors → `#doctor-spotlight`
- Call Us → `tel:+918247442686`
- Location → Google Maps link (Vijayawada)

### CTA Buttons (all dial phone)
- Hero: "Call to Book" → `tel:+918247442686`
- Hero: "Explore Departments" → scrolls to `#departments`
- Navbar: "Call Now" → `tel:+918247442686`
- Smart Call section: primary call button → `tel:+918247442686`
- Emergency Helpline card → `tel:+918247442686` (whole card clickable)

---

## 6. style.css — Styling Architecture

### CSS Variable System

**Dark mode (default — `:root`):**
- `--primary: #000000` / `--primary-light: #111111`
- `--accent: #ffffff` / `--accent-light: #e5e5e5`
- `--text: #f5f5f7` / `--text-muted: #86868b`
- `--card-bg: #1c1c1e` / `--card-bg-hover: #2c2c2e`
- `--glass-bg: rgba(255, 255, 255, 0.04)` / `--glass-border: rgba(255, 255, 255, 0.1)`
- `--success: #30d158` / `--warning: #ffd60a` / `--danger: #ff453a` / `--info: #64d2ff`
- `--radius: 20px` / `--radius-sm: 12px` / `--radius-xs: 8px`
- `--nav-height: 48px`
- `--shadow: 0 2px 12px rgba(0, 0, 0, 0.3)`
- `--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

**Light mode (`[data-theme="light"]`):**
- All colors invert: `--primary: #ffffff`, `--accent: #000000`, `--text: #1d1d1f`, `--card-bg: #ffffff`
- Additional forced overrides for footer (stays dark), hero text (stays white), department card overlays

### Major CSS Sections (in order)

1. Reset & Base — universal reset, scroll behavior, body, links
2. Glass Card Component — `.glass-card` with backdrop blur, hover states
3. Buttons — `.btn`, `.btn-accent`, `.btn-outline`, `.btn-danger`
4. Section Headers — `.section-header`, `.section-title` (clamp 2rem–3rem)
5. Navbar — `.navbar`, `.nav-scrolled`, hamburger, mobile nav pop-out animation
6. Hero — full viewport, video background, overlay gradient, floating shapes
7. Stats — 4-column grid, `.stat-number` targets for JS counter animation
8. Departments — 4-column grid, `.dept-card` with image overlay and hover effects
9. Doctor Spotlight — 2-column layout, credentials list
10. Smart Call — 2-column grid, pulse ring animation on phone icon
11. Facilities Gallery — 3-column grid, overlay reveal on hover
12. Why Choose Us — 3-column centered cards
13. Director's Message — 2-column, blockquote styling
14. Testimonials — CSS `@keyframes marqueeScroll` (40s infinite linear)
15. Footer — 4-column grid, social links, newsletter, `.footer-credit`
16. Toast Notifications — fixed bottom-right, slide in/out animations
17. Back to Top — fixed bottom-left circle button
18. Floating Emergency CTA — bottom-right button group

### Key Animations

| Animation | Duration | Purpose |
|-----------|----------|---------|
| `float` | 8–12s | Floating decorative shapes in hero |
| `pulseRing` | 2s | Pulsing ring on Smart Call phone icon |
| `livePulse` | 2s | Blinking green dot for availability |
| `marqueeScroll` | 40s | Continuous testimonial carousel |
| `toastIn` / `toastOut` | 0.4s / 0.3s | Toast notification slide |
| `spin` | 1s | Loading spinner |

### Responsive Breakpoints
- **768px:** Grids collapse to 1–2 columns, mobile nav activates, reduced padding
- **480px:** Single columns, further font/spacing reductions

---

## 7. script.js — JavaScript Architecture

### Data Constants

**`DEPARTMENTS` array (8 items):**
Each object: `{ id, name, icon, category, desc, img }`
- Categories: `medical` (cardiology, neurology, pediatrics, dermatology), `surgical` (orthopedics, general-surgery, gynecology, ent), `specialty` (covers some overlap)

**`DOCTORS` array (12 items):**
Each object: `{ name, dept, specialty, exp }`
- Doctors listed: Dr. Indra Mohan, Dr. Arjun Mehta, Dr. Kavitha Rao, Dr. Sameer Joshi, Dr. Neha Gupta, Dr. Rakesh Verma, Dr. Deepa Nair, Dr. Pooja Sharma, Dr. Sunil Reddy, Dr. Meera Iyer, Dr. Anil Kapoor, Dr. Priya Das

### Functions

| Function | Purpose |
|----------|---------|
| `initTheme()` | Reads `cherishTheme` from localStorage or system preference, applies `data-theme` |
| `setTheme(theme)` | Sets `data-theme` attribute, updates toggle icon (moon/sun) |
| `toggleTheme()` | Switches dark↔light, saves to localStorage |
| `renderDepartments()` | Populates `#deptGrid` from DEPARTMENTS array with HTML cards |
| `initDeptFilters()` | Filter button click handlers, show/hide cards by category |
| `scrollToBooking()` | Smooth scrolls to `#booking` section |
| `initNavScroll()` | Scroll listener: adds `.scrolled` class to navbar, calls `updateActiveNavLink()` |
| `updateActiveNavLink()` | Highlights nav link matching current viewport section |
| `initSmoothScroll()` | Attaches smooth scroll to all `a[href^="#"]` links |
| `toggleMobileNav()` | Toggles `.open` on `#navLinks`, `.active` on `#hamburger` |
| `showToast(msg, type)` | Creates toast notification (types: success/error/warning/info), auto-removes 4s |
| `initBackToTop()` | Shows `#backToTop` button when scrollY > 400 |
| `showChatbotPopup()` | Toggles `#chatbotPopup` visibility (chatbot UI stub) |
| `closeChatbotPopup()` | Hides chatbot popup |
| `initStatsCounter()` | IntersectionObserver: triggers `animateCounter()` on `.stat-number` elements |
| `animateCounter(el)` | Animates number 0→target over 2s (easeOutQuad), appends "+" suffix |
| `initHeroVideoLoop()` | Adds `loaded` class on `playing` event (fade-in fix), resets video before end for seamless loop |
| `initSectionReveal()` | IntersectionObserver: adds `.revealed` class to `.reveal` elements on scroll |

### DOMContentLoaded Init Order

```
1. initTheme()
2. renderDepartments()
3. initNavScroll()
4. initSmoothScroll()
5. initStatsCounter()
6. initDeptFilters()
7. initBackToTop()
8. initSectionReveal()
9. initHeroVideoLoop()
```

### Event Listeners

- **Scroll** → navbar `.scrolled` class, active nav link, back-to-top visibility
- **Click** → hamburger toggle, theme toggle, filter buttons, smooth scroll anchors, back-to-top, modal close on overlay, chatbot outside-click close
- **Keydown** → ESC closes all modals
- **IntersectionObserver** → stat counters (one-time), section reveal (one-time)
- **Video `playing`** → fade-in hero video (one-time, `{ once: true }`)
- **Video `timeupdate`** → seamless loop reset

---

## 8. Department Pages

All 8 pages share an identical layout structure. Each links back to `index.html`.

### Shared Template

```
dept-nav (fixed, 48px) → Back link + Logo
dept-hero (420px banner) → Tag + H1 + Description
dept-body (2-column grid)
  ├── dept-content (left)
  │   ├── Overview + Key Stats (4-column grid)
  │   ├── Conditions We Treat (6 info-cards, 2-col)
  │   ├── Treatments/Procedures (4–6 info-cards)
  │   ├── Our Specialists (doctor rows with avatars)
  │   ├── Gallery (2 images)
  │   └── FAQ (3–4 accordion items)
  └── dept-booking (right, sticky sidebar)
      ├── Department name
      ├── Phone: +91 82474 42686
      ├── Call button
      ├── WhatsApp link
      └── Trust badges
dept-footer → Copyright + Home link
```

### Per-Department Summary

| Department | File | Icon | Key Stats Highlight | Doctors |
|-----------|------|------|---------------------|---------|
| Cardiology | `cardiology.html` | `fa-heart-pulse` | 3000+ surgeries, 98% success | Dr. Arjun Mehta, Dr. Kavitha Rao |
| Orthopedics | `orthopedics.html` | `fa-bone` | 2000+ joint replacements, 97% satisfaction | Dr. Sameer Joshi, Dr. Neha Gupta |
| Neurology | `neurology.html` | `fa-brain` | 1500+ neuro surgeries, 96% success | Dr. Rakesh Verma, Dr. Deepa Nair |
| Pediatrics | `pediatrics.html` | `fa-baby` | 5000+ children, 99% vaccination rate | Dr. Pooja Sharma |
| Gynecology | `gynecology.html` | `fa-person-pregnant` | 4000+ deliveries, 24/7 labour ward | Dr. Sunil Reddy |
| ENT | `ent.html` | `fa-ear-listen` | 3000+ procedures, 500+ cochlear implants | Dr. Meera Iyer |
| Dermatology | `dermatology.html` | `fa-hand-dots` | 8000+ patients, 15+ lasers | Dr. Anil Kapoor |
| General Surgery | `general-surgery.html` | `fa-syringe` | 5000+ surgeries, 99% success | Dr. Indra Mohan, Dr. Priya Das |

> **Note:** General Surgery hero uses Dr. Indra Mohan's local photo instead of an Unsplash image.

---

## 9. dept-style.css — Department Page Styles

Styles all 8 department sub-pages. Defines its own `:root` variables for consistency.

### Key Components

| Class | Purpose |
|-------|---------|
| `.dept-nav` | Fixed 48px navbar, semi-transparent dark background |
| `.dept-hero` | 420px banner with background image + overlay |
| `.dept-body` | 2-column grid: `1fr + 380px` (collapses at 768px) |
| `.dept-section` | Content section block with 64px bottom margin |
| `.info-card` | Bordered card with icon, title, description |
| `.doctors-list` / `.doctor-row` | Doctor listing with circular avatar initials |
| `.dept-gallery` | 2-column image grid, 16:10 aspect ratio |
| `.faq-list` / `.faq-item` | Accordion FAQ with CSS max-height animation |
| `.dept-booking` / `.booking-widget` | Sticky sidebar with call CTA + WhatsApp + trust badges |
| `.bw-desc` | Widget description text (monospace phone number styling) |
| `.bw-phone` | Large phone number display |
| `.dept-footer` | Centered copyright strip |

### Responsive Behavior
- **1024px:** Grid adjusts to `1fr + 340px`
- **768px:** Single column, booking widget unsticks
- **480px:** Further spacing/font reductions

---

## 10. Assets (Images & Videos)

### Local Files

| File | Used In | Purpose |
|------|---------|---------|
| `images/logo.png` | Navbar + Footer (all pages) | Hospital logo |
| `images/ChatGPT Image...06_59_44 PM.png` | Hero spotlight, general-surgery.html | Dr. Indra Mohan photo |
| `images/ChatGPT Image...07_15_55 PM.png` | Director's message section | Dr. Indra Mohan (director view) |
| `images/ChatGPT Image...07_28_48 PM.png` | (Available, not prominently featured) | Facility image |
| `videos/hero-dna.mp4` | index.html hero section | DNA helix animation background |

### External (Unsplash)

Used for: facility gallery (6 images), trust stats background, department hero banners (7 of 8 departments), department gallery images.

> **Risk:** All external images depend on Unsplash CDN availability.

---

## 11. Theme System (Dark/Light Mode)

### How It Works

1. **Before page paint** — Inline `<script>` in `<head>` reads `localStorage.getItem('cherishTheme')`, falls back to `prefers-color-scheme`, sets `document.documentElement.dataset.theme`
2. **Toggle** — `#themeToggle` button calls `toggleTheme()` → flips attribute + saves to localStorage
3. **CSS** — `:root` defines dark mode defaults; `[data-theme="light"]` overrides all variables
4. **Forced sections** — Footer, hero text stay dark/white regardless of theme via targeted `[data-theme="light"]` selectors

### localStorage Key
- Key: `cherishTheme`
- Values: `dark` | `light`

---

## 12. Key Contact Information (Hardcoded)

These values are scattered across HTML files — search and replace carefully if changing.

| Info | Value | Where Used |
|------|-------|-----------|
| **Phone** | +91 82474 42686 | Navbar, hero, Smart Call, all 8 dept pages, emergency CTA |
| **WhatsApp** | wa.me/918247442686 | Smart Call section, all dept page sidebars |
| **Email** | cherishmultispeciality@gmail.com | Smart Call section |
| **Address** | Vijayawada (Google Maps link in navbar) | Navbar "Location" link |
| **Designer Phone** | +91 8790679998 | Footer credit ("Solution Architect") |
| **Doctor** | Dr. Indra Mohan | Hero, spotlight, director message, general-surgery page |

---

## 13. Git History & Change Log

Full commit history (oldest → newest):

| Commit | Description |
|--------|-------------|
| `f90f2aa` | Initial commit — complete patient portal with OTP booking |
| `a1a386a` | Fix null reference on confirmGoogleBtn, update bookInDept |
| `a080135` | Smooth hero video loop with fade transitions |
| `4490964` | Seamless video loop: jump to start before final frame gap |
| `f53fc42` | Revert director image to existing file |
| `5164b0c` | Update director section image |
| `1bc9174` | Add dark/light theme toggle, social media links |
| `2721ba7` | Mobile-friendly: responsive fixes for all screen sizes |
| `290b808` | Add hospital logo to navbar and footer |
| `630f2a5` | Add Multispeciality subtitle under Cherish logo |
| `b12b046` | Fix navbar: sticky → fixed position on scroll |
| `889f636` | Update address to Vijayawada location |
| `91e3470` | Fix mobile bugs: hero height, modal scroll, nav overflow |
| `2e9faec` | Fix light mode: rewrite theme variables, add targeted overrides |
| `b5a30d1` | Fix light mode: remove hero white gradient, fix text visibility |
| `b5bded2` | Fix dept icons: solid white bg with shadow for light mode |
| `99f131e` | Fix mobile: remove gap between navbar and hero |
| `8abe256` | Fix navbar overlap: hero full-screen, scroll-margin for sections |
| `3fc47e8` | Fix navbar: transparent over hero, solid bg when scrolled |
| `d3bcd57` | Fix hero content overlap at all breakpoints |
| `f6ecf4a` | Mobile nav: pop-out/pop-back scale transition |
| `e3960a4` | Fix theme switching: mobile nav uses theme colors |
| `6ffcee2` | Fix Book Appointment button visibility |
| **`03dfce5`** | **Replace booking system with Smart Call CTA across entire site** |
| **`6ce7354`** | **Clean up dead code and fix all issues across codebase** |
| `d6bc03f` | Add clickable Emergency Helpline card + designer credit in footer |
| `da5013a` | Fix navbar Call Now button size to fit 48px nav height |
| `71f250b` | Fix hero video poster flash on initial load |
| `2e3cdce` | Update footer credit to Designed by Solution Architect |
| `3b89d6f` | Move contact number to new line in footer credit |

### Major Milestones

1. **`f90f2aa`** — Original site with full OTP booking system, appointment modals, auth flows
2. **`03dfce5`** — **Big refactor:** Removed entire booking/auth system (~1900 lines deleted), replaced with one-tap Smart Call CTA across all pages
3. **`6ce7354`** — **Code cleanup:** Removed 120+ orphaned CSS variables, dead auth JS (162 lines), fixed duplicate nav links, moved inline styles to CSS, fixed broken footer links

---

## 14. Deployment & Hosting

### Current Setup
- **Repository:** GitHub (`tonybigfootc5/Cherish-multispeciality-Hospital`)
- **Branch:** `main`
- **Hosting:** Static files — compatible with any static host

### How to Deploy
The site is pure static files. To deploy:

1. **GitHub Pages:** Enable in repo Settings → Pages → Source: main branch
2. **Netlify/Vercel:** Connect repo, no build command needed, publish directory: `/`
3. **Any web server:** Upload all files maintaining directory structure

### Local Development
```bash
# Start local server (Python)
python -m http.server 8080

# Or Node.js
npx serve .
```

### To Update
```bash
# Edit files
# Then:
git add -A
git commit -m "Description of changes"
git push
```

---

## 15. Known Patterns & Conventions

### CSS Conventions
- All colors via CSS custom properties — never hardcoded in component styles (except forced overrides via `[data-theme]` selectors)
- Glass morphism: `backdrop-filter: blur()` + semi-transparent backgrounds
- All transitions use `var(--transition)` (0.3s cubic-bezier)
- Border radius: `var(--radius)` for large, `var(--radius-sm)`, `var(--radius-xs)` for smaller
- Container: `max-width: 1200px; margin: 0 auto; padding: 0 24px`

### JS Conventions
- Functions prefixed `init*` are called once on DOMContentLoaded
- IntersectionObserver used for scroll-triggered effects (no scroll event math)
- `{ once: true }` event option used where listeners should fire once
- No jQuery, no framework — all vanilla DOM APIs

### HTML Conventions
- Sections use `id` for scroll targeting, `class="reveal"` for scroll animation
- All phone links use `tel:+918247442686` format
- WhatsApp links use `https://wa.me/918247442686`
- Department pages link back with `../index.html`

### Things to Watch
- **Unsplash images:** Hotlinked — consider self-hosting for reliability
- **Image filenames:** Contain spaces and special characters — URL-encode when referencing (`%20`)
- **No minification:** CSS/JS served as-is — consider minifying for production performance
- **No service worker / caching:** Could benefit from caching headers on host
- **Chatbot popup:** HTML stub exists in code (`showChatbotPopup`/`closeChatbotPopup`) but no actual chatbot is connected

---

## 16. What Was Done (Work Summary)

### Phase 1: Booking → Smart Call Transformation
- Removed entire OTP-based booking system (modals, auth, appointment forms)
- Removed ~1,900 lines of booking-related HTML, CSS, JS
- Replaced with "One-Tap" Smart Call section featuring `+91 82474 42686`
- Updated all 8 department pages: replaced booking forms with call CTAs
- Updated navbar and hero CTA buttons to dial phone directly

### Phase 2: Code Cleanup (Self-Audit Fix)
- Removed dead auth system from script.js (162 lines: OTP, Google sign-in, patient management)
- Removed patient view HTML from index.html
- Fixed duplicate nav links ("Contact Us" + "Contact" → "Call Us" + "Location")
- Removed 120+ orphaned CSS variables from dark and light themes
- Removed ~100 lines of dead profile dropdown CSS
- Fixed `cancelConfirmAction` ESC handler bug
- Moved inline styles from 8 dept pages to proper CSS classes in dept-style.css
- Fixed footer department links (# → actual dept page URLs)

### Phase 3: Polish & Refinements
- Made Emergency Helpline card fully clickable (wraps in `<a href="tel:...">`)
- Added footer credit: "Designed by Solution Architect" with Contact: +91 8790679998
- Fixed navbar Call Now button sizing to fit 48px nav height (padding: 6px 14px, font-size: 0.75rem)
- Fixed hero video poster image flash (removed poster attribute, video starts opacity:0, fades in on `playing` event)

---

*End of handover document.*
