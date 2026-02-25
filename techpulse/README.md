# 🚀 TechPulse — Website Berita Teknologi Profesional

Media teknologi modern seperti TechCrunch, dibangun dengan Next.js 14, TypeScript, TailwindCSS, Prisma, dan PostgreSQL.

---

## 📋 Tech Stack

| Layer       | Teknologi                                          |
|-------------|----------------------------------------------------|
| Frontend    | Next.js 14 (App Router), TypeScript, TailwindCSS   |
| Animasi     | Framer Motion                                      |
| Backend     | Next.js API Routes (REST)                          |
| Auth        | NextAuth.js (JWT + Credentials)                    |
| Database    | PostgreSQL + Prisma ORM                            |
| Email       | Nodemailer (SMTP)                                  |
| Upload      | Cloudinary                                         |
| Security    | bcryptjs, Rate Limiting, XSS headers               |

---

## 📂 Struktur Folder

```
techpulse/
├── app/
│   ├── (public)/               # Public pages (layout dengan Navbar+Footer)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Homepage
│   │   ├── [slug]/page.tsx     # Article detail
│   │   ├── category/[cat]/page.tsx
│   │   ├── search/page.tsx
│   │   └── tag/[slug]/page.tsx
│   ├── admin/                  # Admin panel (protected)
│   │   ├── layout.tsx          # Auth guard + AdminSidebar
│   │   ├── login/page.tsx
│   │   ├── page.tsx            # Dashboard
│   │   ├── articles/
│   │   │   ├── page.tsx        # Article list + CRUD
│   │   │   ├── new/page.tsx    # Create article
│   │   │   └── [id]/edit/page.tsx
│   │   ├── users/page.tsx
│   │   ├── tags/page.tsx
│   │   ├── newsletter/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── articles/
│   │   │   ├── route.ts             # GET list, POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts         # GET, PUT, DELETE
│   │   │       ├── comments/route.ts
│   │   │       ├── like/route.ts
│   │   │       └── bookmark/route.ts
│   │   ├── newsletter/route.ts
│   │   └── upload/route.ts
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── BreakingBar.tsx
│   ├── article/
│   │   ├── ArticleCard.tsx     # variant: default | hero | compact
│   │   ├── HeroCarousel.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── CommentSection.tsx
│   │   ├── ArticleActions.tsx  # Like, Bookmark, Share
│   │   ├── NewsletterBox.tsx
│   │   └── PopularTags.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminChart.tsx
│   │   ├── ArticleEditor.tsx   # TipTap WYSIWYG
│   │   └── DeleteArticleButton.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   └── SkeletonCard.tsx
│   └── Providers.tsx
├── lib/
│   ├── db.ts           # Prisma singleton
│   ├── auth.ts         # NextAuth config
│   ├── utils.ts        # Helpers
│   ├── validations.ts  # Zod schemas
│   └── rate-limit.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── styles/globals.css
├── types/index.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

---

## ⚡ Instalasi & Menjalankan Project

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/techpulse.git
cd techpulse
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi Anda:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/techpulse"
NEXTAUTH_SECRET="random-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Buat database di PostgreSQL
createdb techpulse

# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed data awal
npm run db:seed
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:3000

### 5. Login Admin

```
URL:      http://localhost:3000/admin/login
Email:    admin@techpulse.id
Password: Admin@12345
```

---

## 🔌 API Endpoints

### Articles
| Method | Endpoint                    | Deskripsi              | Auth         |
|--------|-----------------------------|------------------------|--------------|
| GET    | `/api/articles`             | List artikel           | Public       |
| POST   | `/api/articles`             | Buat artikel           | Admin/Editor |
| GET    | `/api/articles/:id`         | Detail artikel         | Public       |
| PUT    | `/api/articles/:id`         | Update artikel         | Admin/Editor |
| DELETE | `/api/articles/:id`         | Hapus artikel          | Admin        |
| GET    | `/api/articles/:id/comments`| Komentar artikel       | Public       |
| POST   | `/api/articles/:id/comments`| Tambah komentar        | User         |
| POST   | `/api/articles/:id/like`    | Like artikel           | User         |
| DELETE | `/api/articles/:id/like`    | Unlike artikel         | User         |
| POST   | `/api/articles/:id/bookmark`| Bookmark artikel       | User         |
| DELETE | `/api/articles/:id/bookmark`| Hapus bookmark         | User         |

### Auth
| Method | Endpoint             | Deskripsi    |
|--------|----------------------|--------------|
| POST   | `/api/auth/signin`   | Login        |
| POST   | `/api/auth/signout`  | Logout       |

### Newsletter
| Method | Endpoint          | Deskripsi            |
|--------|-------------------|----------------------|
| POST   | `/api/newsletter` | Subscribe            |
| GET    | `/api/newsletter?token=xxx` | Verify email |

---

## 🎨 Fitur Lengkap

### Homepage
- ✅ Breaking news ticker (auto-scroll)
- ✅ Hero carousel dengan auto-slide
- ✅ Trending sidebar dengan numbered ranking
- ✅ Category filter dengan Framer Motion animation
- ✅ Article grid responsive (1/2/3/4 col)
- ✅ Skeleton loading
- ✅ Newsletter subscribe form
- ✅ Popular tags

### Article Page
- ✅ SEO meta auto-generate (title, desc, OG, Twitter)
- ✅ Featured image
- ✅ Author bio card
- ✅ Reading time estimate
- ✅ View counter (auto-increment)
- ✅ Like & Bookmark (dengan auth)
- ✅ Share buttons (Twitter, copy link)
- ✅ Nested comment system
- ✅ Related articles

### Admin Dashboard
- ✅ Secure login (bcrypt + JWT)
- ✅ Role-based access (ADMIN/EDITOR/WRITER/USER)
- ✅ Dashboard stats (views, users, articles, newsletter)
- ✅ Bar chart pageviews
- ✅ CRUD artikel dengan TipTap WYSIWYG
- ✅ Draft & Publish workflow
- ✅ User management
- ✅ Tag management
- ✅ Newsletter management
- ✅ Analytics

### Security
- ✅ Password hashing (bcryptjs)
- ✅ JWT session
- ✅ Rate limiting (60/min API, 5/min auth, 3/5min email)
- ✅ Zod input validation
- ✅ Security headers (XSS, CSRF, frame options)
- ✅ Middleware auth guard

### Performance & SEO
- ✅ ISR (Incremental Static Regeneration)
- ✅ Image optimization (next/image)
- ✅ Lazy loading
- ✅ Auto sitemap.xml
- ✅ Auto robots.txt
- ✅ OpenGraph & Twitter meta
- ✅ Structured data ready

---

## 🚀 Production Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set environment variables di Vercel Dashboard.

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t techpulse .
docker run -p 3000:3000 --env-file .env techpulse
```

---

## 📦 Production Checklist

- [ ] Ganti `NEXTAUTH_SECRET` dengan string acak yang kuat
- [ ] Setup PostgreSQL production (Neon, Supabase, Railway)
- [ ] Setup Cloudinary untuk upload gambar
- [ ] Setup SMTP untuk email (Gmail App Password)
- [ ] Setup Google Analytics
- [ ] Enable HTTPS
- [ ] Setup CDN untuk static assets
- [ ] Configure rate limiting sesuai traffic

---

Dibuat dengan ❤️ untuk developer Indonesia 🇮🇩
