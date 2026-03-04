# 🚀 TechPulse — Website Berita Teknologi Premium

> Media teknologi terdepan Indonesia. Dibangun dengan **Next.js 14**, TypeScript, TailwindCSS, Prisma, dan PostgreSQL.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|----------|-----------|
| 🏠 **Homepage** | Hero carousel, breaking news ticker, trending sidebar, animated stats counter, grid artikel responsif |
| 📰 **Article Page** | Reading progress bar, author bio, nested comments, like, bookmark, share |
| ⚙️ **Admin Dashboard** | Dashboard stats, chart pageviews, CRUD artikel, user management, analytics |
| 🔍 **Search & Filter** | Live search, filter kategori + tag, staggered card animations |
| 📧 **Newsletter** | Subscribe modal, gradient mesh section, glassmorphism cards |
| 🔐 **Auth System** | JWT, bcrypt, role-based (Admin/Editor/Writer/User) |
| 🗺️ **SEO** | Auto meta, OpenGraph, Twitter card, sitemap XML |
| 🌟 **Premium UI** | Glassmorphism, micro-animations, gradient effects, pulse glow, particle dots |

---

## ⚡ Cara Menjalankan (Quick Start)

### ✅ Yang Dibutuhkan
- **Node.js 18+** — [Download di sini](https://nodejs.org/)
- **npm** (sudah termasuk saat install Node.js)

### Langkah 1 — Buka Terminal

Buka **Command Prompt** atau **PowerShell** atau **Terminal** di VS Code.

### Langkah 2 — Masuk ke Folder Project

```bash
cd c:\xampp\htdocs\tech-pulse\techpulse-project
```

### Langkah 3 — Install Dependencies

```bash
npm install
```

> ⏱️ Proses ini memakan waktu beberapa menit saat pertama kali.

### Langkah 4 — Jalankan Development Server

```bash
npm run dev
```

### Langkah 5 — Buka di Browser

```
http://localhost:3000
```

🎉 **Selesai!** Website langsung bisa diakses dengan data demo built-in.

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `npm install` error | Pastikan Node.js 18+ terinstall. Cek: `node --version` |
| Port 3000 sudah dipakai | Jalankan: `npx next dev -p 3001` |
| Module not found | Hapus `node_modules` lalu `npm install` ulang |
| Gambar tidak muncul | Pastikan folder `public/images/articles/` berisi file PNG |

---

## 🔑 Login Admin (Demo)

1. Klik tombol **"Admin"** di navbar
2. Gunakan salah satu akun demo:

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | admin@techpulse.id | admin123 |
| **Editor** | editor@techpulse.id | editor123 |
| **Writer** | writer@techpulse.id | writer123 |

---

## 📂 Struktur Folder

```
techpulse-project/
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── src/
│   ├── app/
│   │   ├── api/              # REST API routes
│   │   ├── globals.css       # Design system (glassmorphism, animations)
│   │   ├── layout.tsx        # Root layout + Google Fonts
│   │   ├── page.tsx          # Homepage
│   │   └── sitemap.ts        # Auto-generated sitemap
│   ├── components/
│   │   ├── admin/            # Admin Dashboard
│   │   ├── article/          # ArticleCard, ArticleDetail, HeroSection
│   │   ├── layout/           # Navbar, Footer, BreakingBar
│   │   ├── sections/         # Newsletter, PopularTags, StatsCounter
│   │   └── ui/               # Avatar, Badge, Modal, LoadingScreen, Toast
│   └── lib/
│       ├── auth.ts           # Authentication helpers
│       ├── data.ts           # Article data + types
│       ├── db.ts             # Prisma client singleton
│       └── utils.ts          # Formatting utilities
├── public/images/articles/   # Article images
├── tailwind.config.js
└── package.json
```

---

## 🌐 API Endpoints

### Articles
```
GET    /api/articles              # List artikel
POST   /api/articles              # Buat artikel (auth: Writer+)
GET    /api/articles/:slug        # Detail artikel
PUT    /api/articles/:slug        # Update artikel (auth: Editor+)
DELETE /api/articles/:slug        # Hapus artikel (auth: Editor+)
```

### Auth & Social
```
POST   /api/auth/login            # Login → { token, user }
GET    /api/comments?articleId=   # List komentar
POST   /api/comments              # Tambah komentar (auth: User+)
POST   /api/newsletter            # Subscribe email
```

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Font** | Inter (sans-serif) |
| **Display Font** | Merriweather (serif) |
| **Mono Font** | JetBrains Mono |
| **Background** | #fafbfc |
| **Accent Color** | #0066ff |
| **Effects** | Glassmorphism, backdrop-blur, gradient mesh |
| **Animations** | fadeIn, scaleIn, pulseGlow, float, gradientShift, countUp |

---

## 🚀 Production Build

```bash
npm run build
npm start
```

---

## 🗄️ Setup Database (Opsional)

Untuk production dengan PostgreSQL:

```bash
copy .env.example .env
# Edit .env dengan DATABASE_URL PostgreSQL
npx prisma db push
npx ts-node prisma/seed.ts
```

---

**Dibuat dengan ❤️ untuk ekosistem developer Indonesia 🇮🇩**
