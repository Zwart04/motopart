# MotoPart — Motorcycle Workshop OS

![GitHub stars](https://img.shields.io/github/stars/Zwart04/motopart?style=social)
![GitHub license](https://img.shields.io/badge/License-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-Web-lightgrey)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwind-css)

**Satu OS bengkel untuk mekanik Indonesia.** Cari suku cadang berdasarkan tipe motor, diagnosis kerusakan pakai pohon keputusan, jadwalkan servis berkala, estimasi biaya reparasi, dan bagikan garasi publik.

**Live Demo:** https://motopart.zwart.qzz.io

---

## Features

- **Garage & Fitment Catalog** — 12 motor Indonesia (Beat, Vario, NMAX, Aerox, dll) dengan 80+ part. Filter otomatis berdasarkan model + tahun.
- **Smart Fitment Matcher** — rules-based engine kasih rekomendasi part compatible dengan confidence score 0-100. Bedakan OEM vs aftermarket.
- **Diagnostic Decision Tree** — input gejala (brebet, susah start, rem blong), dapat probable cause + parts to inspect + estimasi biaya.
- **Service Interval Scheduler** — set interval servis per motor (KM + tanggal). Background badge notifikasi untuk service due soon.
- **Repair Cost Estimator** — kalkulasi biaya part + labor + pajak + diskon. Export invoice PDF via jsPDF. Visualisasi Recharts parts vs labor.
- **Price Competitiveness Index** — bandingkan harga jual Anda dengan median pasar (3 sumber mock). Color-coded index 0-100 + histogram.
- **Service History + Before/After Slider** — timeline setiap servis. Upload foto before/after, canvas-based slider untuk compare.
- **Bilingual Shareable Garage** — public `/g/[slug]` menampilkan stats + service history. Share via wa.me deep-link + email mock. UTM capture + localStorage attribution → Recharts analytics di `/analytics`.
- **Bilingual EN/ID** — toggle full dictionary, semua label + konten.
- **PDF + Excel Export** — invoice PDF (jsPDF) + finance journal Excel (SheetJS/xlsx).
- **Local-first auth** — localStorage-based login/register, profesional tanpa backend.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 App Router + TypeScript |
| Styling | Tailwind CSS v4 + @tailwindcss/postcss |
| UI Components | shadcn/ui (Radix primitives) |
| Charts | Recharts |
| Export | jsPDF + SheetJS (xlsx) |
| Icons | lucide-react |
| Auth | localStorage (local-first) |
| i18n | Custom t.* dictionary (EN + ID) |
| Static | Next.js static export (output: 'export') |
| Deployment | Cloudflare Pages |

---

## Project Structure

```
motopart/
├── public/
│   ├── icon.svg              # Favicon
│   └── screenshots/          # Demo media (placeholder)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + AppProvider + ToastHost
│   │   ├── page.tsx          # Landing page
│   │   ├── login/            # Login page
│   │   ├── register/         # Register page
│   │   ├── dashboard/        # Overview stats + quick actions
│   │   ├── garage/           # Motor garage CRUD + fitment
│   │   ├── parts/            # Parts catalog + filter + price index
│   │   ├── diagnostic/       # Decision tree wizard
│   │   ├── service/          # Service interval scheduler
│   │   ├── estimator/        # Cost estimator + PDF invoice
│   │   ├── analytics/        # UTM + finance charts
│   │   └── public-garage/    # Public shareable garage
│   ├── components/
│   │   ├── app-provider.tsx  # Context: lang, auth, mounted guard
│   │   ├── site-header.tsx   # Nav + language toggle + auth
│   │   ├── site-footer.tsx   # Footer
│   │   └── toast.tsx         # shadcn Toast host
│   ├── lib/
│   │   ├── i18n.ts           # Full EN/ID dictionary
│   │   ├── auth.ts           # localStorage auth helpers
│   │   ├── attribution.ts    # UTM → localStorage.source
│   │   ├── finance.ts        # Auto-journal entries
│   │   ├── fitment.ts        # Rules-based matcher
│   │   ├── store.ts          # State management
│   │   └── types.ts          # TypeScript types
│   └── data/
│       ├── motors.json       # 12 motorcycles
│       ├── parts.json        # 80+ parts catalog
│       ├── diagnostics.json  # Decision tree nodes
│       └── service-intervals.json
├── out/                      # Static export (deployed to CF Pages)
├── next.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Zwart04/motopart.git
cd motopart
npm install
npm run dev     # Development: http://localhost:3000
npm run build   # Production build → out/
npm run start   # Serve production build
```

### Build for Deployment

```bash
npm run build
# Output dir: out/
# Deploy to Cloudflare Pages or any static host.
```

---

## Demo Account

Buat akun baru lewat `/register` atau gunakan format:

- Email: `bengkel@contoh.com`
- Password: `bengkel123`
- Nama Bengkel: `Bengkel Makmur`

---

## Roadmap

- [ ] Sync to Supabase/sync engine untuk multi-device
- [ ] Print label stok part (barcode)
- [ ] WhatsApp notification via wa.me API (boss-approved)
- [ ] Mobile PWA install prompt

---

## License

MIT © Zwart04
