# 🚀 TechPulse — Website Berita Teknologi Profesional

> Media teknologi terdepan Indonesia. Dibangun dengan **Next.js 14**, TypeScript, TailwindCSS, Prisma, dan PostgreSQL.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🏠 **Homepage** | Hero carousel, breaking news ticker, trending sidebar, grid artikel responsif |
| 📰 **Article Page** | Reading progress bar, author bio, nested comments, like, bookmark, share |
| ⚙️ **Admin Dashboard** | Dashboard stats, chart pageviews, CRUD artikel, user management, analytics |
| 🔍 **Search & Filter** | Live search, filter kategori + tag, staggered card animations |
| 📧 **Newsletter** | Subscribe modal, inline CTA section |
| 🔐 **Auth System** | JWT, bcrypt, role-based (Admin/Editor/Writer/User) |
| 🗺️ **SEO** | Auto meta, OpenGraph, Twitter card, sitemap XML |
| 🌙 **Premium Dark UI** | Glassmorphism, micro-animations, gradient effects |

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
│   │   │   ├── articles/     # CRUD artikel
│   │   │   ├── auth/login/   # Login endpoint
│   │   │   ├── comments/     # Komentar & reply
│   │   │   └── newsletter/   # Subscribe/konfirmasi
│   │   ├── globals.css       # Design system (glassmorphism, animations)
│   │   ├── layout.tsx        # Root layout + Google Fonts + metadata
│   │   ├── page.tsx          # Homepage (composed from components)
│   │   └── sitemap.ts        # Auto-generated sitemap
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx     # 3 variants: default, hero, compact
│   │   │   ├── ArticleDetail.tsx   # Full article page
│   │   │   └── HeroSection.tsx     # Carousel + trending sidebar
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Glassmorphism navbar
│   │   │   ├── Footer.tsx          # Social icons + links
│   │   │   └── BreakingBar.tsx     # Animated ticker
│   │   ├── sections/
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── PopularTags.tsx
│   │   ├── ui/
│   │   │   ├── Avatar.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ImagePlaceholder.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ReadingProgress.tsx
│   │   └── TechPulse.jsx    # Legacy monolithic component
│   └── lib/
│       ├── auth.ts           # JWT + bcrypt helpers
│       ├── data.ts           # Article data + types
│       ├── db.ts             # Prisma client singleton
│       └── utils.ts          # Formatting utilities
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ⚡ Cara Menjalankan (Quick Start)

### Prerequisites
- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm** (sudah termasuk di Node.js)

### 1. Buka Terminal / Command Prompt

```bash
cd c:\xampp\htdocs\tech-pulse\techpulse-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

### 4. Buka di Browser

```
http://localhost:3000
```

🎉 **Selesai!** Website langsung bisa diakses dengan data demo built-in.

---

## 🔑 Login Admin (Demo)

1. Klik tombol **"Admin"** di navbar
2. Isi email dan password **apapun** (demo mode)
3. Klik **"Masuk"**

---

## 🗄️ Setup Database (Opsional — untuk Production)

Jika ingin menggunakan database PostgreSQL yang sesungguhnya:

### 1. Install PostgreSQL

Download di: https://www.postgresql.org/download/

### 2. Setup Environment Variables

```bash
copy .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/techpulse"
JWT_SECRET="your-jwt-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Push Schema & Seed Data

```bash
npx prisma db push
npx ts-node prisma/seed.ts
```

### 4. Credentials Setelah Seed

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@techpulse.id | admin123 |
| **Editor** | rina@techpulse.id | editor123 |
| **Writer** | dimas@techpulse.id | writer123 |

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
| **Mono Font** | JetBrains Mono |
| **Background** | gray-950 (#030712) |
| **Primary Color** | emerald-500 (#10b981) |
| **Border** | white/10 rgba |
| **Effects** | Glassmorphism, backdrop-blur |
| **Animations** | fadeIn, scaleIn, shimmer, pulseGlow |

---

## 🚀 Production Build

```bash
npm run build
npm start
```

---

**Dibuat dengan ❤️ untuk ekosistem developer Indonesia 🇮🇩**
