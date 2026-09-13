# MotoPart - Features MVP

## Overview
MotoPart is a local-first motorcycle workshop OS for Indonesian mechanics and small workshops. It provides a parts catalog with automatic fitment filtering, a diagnostic decision tree, service interval scheduling, a repair cost estimator with PDF invoice export, a price competitiveness index, a service history timeline, and a public bilingual shareable garage page. All data lives in the browser; no backend, no third-party tracking, no third-party pixels.

## Target Audience
- Independent motorcycle repair shops (bengkel motor)
- Freelance mechanics
- Motorcycle owners who self-service
- Sparepart UMKM building their own catalog

## Features (8 kompleks)

### 1. Motor Garage + Fitment Catalog
- 12 popular Indonesian motorcycles: Honda Beat, Vario 125, PCX 150, ADV 160, Scoopy, Yamaha NMAX 155, Aerox 155, Mio M3, Supra X 125, CBR 150R, Suzuki Satria F150, Kawasaki Ninja 250.
- Each motor has brand/model/year/engine/power/weight/category/popularity metadata.
- 80+ parts across 9 categories: engine, brake, drivetrain, electrical, body, suspension, tire, tool, consumable, CVT.
- Add/remove motorcycles from local garage. Each entry stores current KM and license plate.
- Service history log per motorcycle (date, KM, parts, labor, cost, notes).

### 2. Smart Fitment Matcher
- Rules-based engine: motor.id + part.fitments array.
- Confidence score 0-100: OEM exact match = 95, aftermarket compatible = 80.
- Auto-filter catalog when motorcycle is selected.
- Reason display: "OEM exact match for [motor]" vs "Aftermarket compatible".

### 3. Diagnostic Decision Tree
- 6 symptoms across engine/brake/drivetrain/electrical/suspension categories.
- Each tree has 3-5 question nodes with yes/no branches leading to a leaf (cause + parts to inspect + labor hours + severity).
- Severity levels: low/medium/high, color-coded.
- Auto-estimate cost at leaf: parts price sum + labor hours × Rp 50,000.
- Save to history + log finance auto-task entry.

### 4. Service Interval Scheduler
- 12 service intervals based on standard pabrikan: ganti oli, filter udara, busi, V-belt, roller, kampas rem, minyak rem, rantai+sprocket, shockbreaker, aki, coolant, klep.
- Each interval has interval_km (e.g. 3000 KM) and interval_days (e.g. 90 days).
- Schedule state: garageId + intervalId + lastDoneKm + lastDoneDate.
- Background status check on page load: due (overdue), upcoming (within 10% of next interval), or OK.
- Mark done updates lastDoneKm/Date; can be triggered by completing a service log.

### 5. Repair Cost Estimator
- Add multiple parts with qty + custom price.
- Labor: hours × hourly rate.
- Subtotal = parts + labor.
- Discount % and Tax % applied.
- Final total computed with full breakdown.
- Export PDF invoice via jsPDF + jspdf-autotable, with date, table of parts, labor line, subtotal/discount/tax/total.
- Saves auto-bill finance entry on export.

### 6. Price Competitiveness Index
- For each part: market_median_idr + your_price.
- Index formula: 100 - ((your - median) / median * 100) clamped 0-100.
- Color-coded: <50 red (too expensive), 50-80 yellow (slightly above market), >=80 green (at or below market).
- Live update as user types their price.
- localStorage persistence of custom prices per workshop.

### 7. Service History Timeline + Before/After Slider
- Per-motorcycle service log table: date, type, KM, parts, labor, total, notes.
- Recharts scatter timeline visualization in /analytics.
- Before/After image slider: canvas-based drag widget (client-side image processing, no upload).
- Delete log option.

### 8. Bilingual Shareable Garage Page
- Public route /g/[slug] showing garage stats (motorcycles, services, total spend).
- Share buttons: wa.me deep-link (window.open manual, no API), mailto: email mock, clipboard copy.
- UTM/URL-param capture on first visit → localStorage.source → Recharts bar in /analytics.
- No Meta Pixel, no Google Ads/GA, no fbq/gtag scripts.

## Notification Spec
- In-app toast (custom ToastHost component, no library) for success/info/warning/error states.
- Service-due badge on header and dashboard stat card (red when due, green when all OK).
- Share via wa.me deep-link (manual window.open) + mailto: email.
- NO /waha tab. NO WAHA API. NO QR scan.

## Attribution Spec
- URL params: ?utm_source=...&utm_medium=...&utm_campaign=... (or ?source=&medium=&campaign=)
- On first visit: read params, persist to localStorage.source (object with source/medium/campaign/firstVisit/visits).
- Recharts bar chart in /analytics showing all sources.
- localStorage.mp_visit_count incremented on every load.
- NO Meta Pixel fbq injection. NO Google Ads gtag injection. NO NEXT_PUBLIC_META_PIXEL_ID or NEXT_PUBLIC_GOOGLE_ADS_ID env.

## Finance Auto-Journal Spec
- mp_finance localStorage key stores all entries.
- Each entry: {id, type, category, description, amount, source, ts}.
- Type values: auto-task (service log, diagnostic), auto-bill (invoice export), auto-vendor (predictive).
- Source: "motopart:service-log", "motopart:diagnostic", "motopart:estimator" etc.
- Monthly Recharts bar in /analytics, with spend totals and category breakdown (pie chart).
- Export PDF/Excel planned for next iteration.

## Stack
- Next.js 16 App Router + TypeScript 5.6
- Tailwind v4 + @tailwindcss/postcss
- lucide-react icons
- Recharts (bar, pie)
- jsPDF + jspdf-autotable (PDF invoice export)
- localStorage for all persistence
- Bilingual EN/ID (t.* dict, lang toggle in header)
- Static export (output: 'export') for Cloudflare Pages deploy

## 12+ Routes
- / (landing)
- /login
- /register
- /dashboard
- /garage
- /garage/[id] (motor detail + service history)
- /parts (catalog with fitment filter)
- /diagnostic (decision tree)
- /service (interval scheduler)
- /estimator (cost calculator + PDF export)
- /analytics (Recharts dashboards)
- /g/[slug] (public shareable garage)
