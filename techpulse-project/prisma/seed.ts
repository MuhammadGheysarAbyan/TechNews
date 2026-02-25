// prisma/seed.ts
import { PrismaClient, Role, Category, ArticleStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const adminPass = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@techpulse.id' },
    update: {},
    create: {
      name: 'Admin Utama',
      email: 'admin@techpulse.id',
      passwordHash: adminPass,
      role: Role.ADMIN,
      emailVerified: true,
      bio: 'Admin TechPulse Indonesia',
    },
  })

  const editor = await prisma.user.upsert({
    where: { email: 'rina@techpulse.id' },
    update: {},
    create: {
      name: 'Rina Hartanto',
      email: 'rina@techpulse.id',
      passwordHash: await bcrypt.hash('editor123', 12),
      role: Role.EDITOR,
      emailVerified: true,
      bio: '10+ tahun meliput industri teknologi global. Ex-Forbes Asia.',
    },
  })

  const writer = await prisma.user.upsert({
    where: { email: 'dimas@techpulse.id' },
    update: {},
    create: {
      name: 'Dimas Pratama',
      email: 'dimas@techpulse.id',
      passwordHash: await bcrypt.hash('writer123', 12),
      role: Role.WRITER,
      emailVerified: true,
      bio: 'PhD kandidat AI. Penulis tamu MIT Technology Review.',
    },
  })

  // Create tags
  const tags = await Promise.all(
    ['OpenAI', 'GPT-5', 'LLM', 'Machine Learning', 'Apple', 'Vision Pro',
     'VR', 'AR', 'Google', 'Gemini', 'NVIDIA', 'GPU', 'Startup', 'Unicorn',
     'Ransomware', 'Cyber Attack', 'React', 'JavaScript', 'Rust', 'Golang'].map(name =>
      prisma.tag.upsert({
        where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
      })
    )
  )

  // Create articles
  const articles = [
    {
      title: 'OpenAI Rilis GPT-5: Model Multimodal Terbaru yang Mengguncang Industri AI Global',
      slug: 'openai-gpt5-multimodal-breakthrough',
      excerpt: 'GPT-5 hadir dengan kemampuan reasoning setara manusia dewasa, mampu memproses teks, gambar, audio, dan video secara simultan.',
      content: `OpenAI secara resmi merilis GPT-5, model bahasa besar generasi terbaru yang diklaim sebagai lompatan terbesar dalam sejarah kecerdasan buatan.

Dalam benchmark internal OpenAI, GPT-5 berhasil mencapai skor 87,4% pada tes penalaran abstrak, melampaui rata-rata manusia dewasa yang berada di angka 79,2%.

Sam Altman dalam konferensi pers menyatakan bahwa ini adalah perubahan paradigma dalam cara kita berinteraksi dengan AI.`,
      category: Category.AI,
      status: ArticleStatus.PUBLISHED,
      featured: true,
      trending: true,
      readTime: 8,
      views: 142830,
      authorId: writer.id,
      publishedAt: new Date('2025-03-15'),
    },
    {
      title: 'Apple Vision Pro 2 Resmi Masuk Indonesia: Harga Rp 85 Juta',
      slug: 'apple-vision-pro-2-indonesia',
      excerpt: 'Apple akhirnya membawa Vision Pro generasi kedua ke pasar Asia Tenggara dengan chipset M4 Ultra dan layar micro-OLED 8K per mata.',
      content: `Apple secara resmi mengumumkan kehadiran Vision Pro 2 di Indonesia melalui Apple Store online.

Diperkuat chipset M4 Ultra dengan 32-core GPU, Vision Pro 2 menawarkan performa rendering 3D real-time yang dua kali lebih cepat.

Harga resmi Rp 85.000.000 untuk model 256GB.`,
      category: Category.GADGET,
      status: ArticleStatus.PUBLISHED,
      featured: true,
      trending: true,
      readTime: 6,
      views: 98420,
      authorId: editor.id,
      publishedAt: new Date('2025-03-14'),
    },
    {
      title: 'Ransomware BlackNova Serang 47 Bank di Asia: Kerugian Diperkirakan $2,3 Miliar',
      slug: 'ransomware-blacknova-serang-bank-asia',
      excerpt: 'Kelompok hacker ShadowSyndicate melancarkan serangan ransomware canggih yang mengeksploitasi zero-day vulnerability di sistem core banking.',
      content: `Serangan siber terbesar dalam sejarah industri perbankan Asia tengah berlangsung.

BlackNova mengeksploitasi zero-day vulnerability pada SWIFT messaging system yang digunakan hampir semua lembaga keuangan global.

OJK telah mengeluarkan alert darurat kepada seluruh lembaga keuangan yang diawasi.`,
      category: Category.CYBER_SECURITY,
      status: ArticleStatus.PUBLISHED,
      featured: true,
      trending: true,
      readTime: 9,
      views: 187650,
      authorId: editor.id,
      publishedAt: new Date('2025-03-11'),
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        ...article,
        metaTitle: article.title,
        metaDesc: article.excerpt,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('📧 Admin: admin@techpulse.id / admin123')
  console.log('📧 Editor: rina@techpulse.id / editor123')
  console.log('📧 Writer: dimas@techpulse.id / writer123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
