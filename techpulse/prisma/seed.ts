// prisma/seed.ts
import { PrismaClient, Role, Status, Category } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@12345", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@techpulse.id" },
    update: {},
    create: {
      name: "Admin TechPulse",
      email: "admin@techpulse.id",
      passwordHash: adminHash,
      role: Role.ADMIN,
      avatar: "/avatars/admin.jpg",
      bio: "Administrator utama TechPulse Indonesia.",
      emailVerified: new Date(),
    },
  });

  const editorHash = await bcrypt.hash("Editor@12345", 12);
  const editor = await prisma.user.upsert({
    where: { email: "rina@techpulse.id" },
    update: {},
    create: {
      name: "Rina Hartanto",
      email: "rina@techpulse.id",
      passwordHash: editorHash,
      role: Role.EDITOR,
      bio: "10+ tahun meliput industri teknologi global. Ex-Forbes Asia.",
    },
  });

  const writer = await prisma.user.upsert({
    where: { email: "dimas@techpulse.id" },
    update: {},
    create: {
      name: "Dimas Pratama",
      email: "dimas@techpulse.id",
      passwordHash: editorHash,
      role: Role.WRITER,
      bio: "PhD kandidat AI. Penulis tamu MIT Technology Review.",
    },
  });

  // ── Tags ────────────────────────────────────────────────────────────────
  const tags = await Promise.all(
    ["OpenAI", "GPT-5", "LLM", "Machine Learning", "Apple", "Vision Pro",
     "VR", "AR", "Google", "Gemini", "Android", "Startup", "Unicorn",
     "Indonesia", "Funding", "Ransomware", "Cyber Attack", "Security",
     "Rust", "Golang", "Backend", "React", "JavaScript", "NVIDIA", "GPU"].map((name) =>
      prisma.tag.upsert({
        where: { slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-") },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        },
      })
    )
  );

  const tagMap = Object.fromEntries(tags.map((t) => [t.name, t]));

  // ── Articles ─────────────────────────────────────────────────────────────
  const articlesData = [
    {
      slug: "openai-gpt5-multimodal-breakthrough",
      title: "OpenAI Rilis GPT-5: Model Multimodal Terbaru yang Mengguncang Industri AI Global",
      excerpt: "GPT-5 hadir dengan kemampuan reasoning setara manusia dewasa, mampu memproses teks, gambar, audio, dan video secara simultan dengan akurasi yang belum pernah ada sebelumnya.",
      content: `OpenAI secara resmi merilis GPT-5, model bahasa besar generasi terbaru yang diklaim sebagai lompatan terbesar dalam sejarah kecerdasan buatan. Model ini tidak hanya memproses teks, tetapi juga gambar, audio, dan video secara bersamaan dengan tingkat pemahaman kontekstual yang mendekati kemampuan manusia.\n\nDalam benchmark internal OpenAI, GPT-5 berhasil mencapai skor 87,4% pada tes penalaran abstrak, melampaui rata-rata manusia dewasa yang berada di angka 79,2%. Yang lebih mengesankan, model ini mampu menyelesaikan soal matematika olimpiade tingkat internasional dengan akurasi 91%.\n\nSam Altman dalam konferensi pers menyatakan bahwa GPT-5 adalah perubahan paradigma dalam cara kita berinteraksi dengan AI. Model ini akan tersedia melalui API mulai bulan depan dengan harga yang diklaim 40% lebih murah dari GPT-4.\n\nPara peneliti dari Stanford dan MIT yang mendapat akses awal menyebut GPT-5 sebagai inflection point dalam pengembangan AGI. Namun kritik dari kalangan peneliti keamanan AI mempertanyakan transparansi OpenAI terkait proses training dan data yang digunakan.`,
      category: Category.AI,
      views: 142830,
      readTime: 8,
      isFeatured: true,
      isTrending: true,
      authorId: writer.id,
      tags: ["OpenAI", "GPT-5", "LLM", "Machine Learning"],
    },
    {
      slug: "apple-vision-pro-2-indonesia",
      title: "Apple Vision Pro 2 Resmi Masuk Indonesia: Harga Rp 85 Juta, Ini Spesifikasi Lengkapnya",
      excerpt: "Apple akhirnya membawa Vision Pro generasi kedua ke pasar Asia Tenggara termasuk Indonesia dengan chipset M4 Ultra dan layar micro-OLED 8K per mata.",
      content: `Apple secara resmi mengumumkan kehadiran Vision Pro 2 di Indonesia melalui Apple Store online dan beberapa authorized reseller terpilih. Headset mixed reality premium ini hadir dengan sejumlah peningkatan signifikan dibanding pendahulunya.\n\nDiperkuat chipset M4 Ultra dengan 32-core GPU, Vision Pro 2 menawarkan performa rendering 3D real-time yang dua kali lebih cepat. Layar micro-OLED 8K per mata dengan refresh rate 240Hz menjadikannya perangkat VR/AR dengan visual paling tajam di kelasnya saat ini.\n\nFitur Spatial Audio generasi baru mampu mereplikasi suara ruangan dengan akurasi milimeter, sementara sistem eye-tracking terbaru mengklaim latensi hanya 0,8 milidetik.\n\nHarga resmi Rp 85.000.000 untuk model 256GB. Pembelian pertama dibatasi dua unit per pelanggan.`,
      category: Category.GADGET,
      views: 98420,
      readTime: 6,
      isFeatured: true,
      isTrending: true,
      authorId: editor.id,
      tags: ["Apple", "Vision Pro", "VR", "AR"],
    },
    {
      slug: "ransomware-blacknova-serang-bank-asia",
      title: "Ransomware 'BlackNova' Serang 47 Bank di Asia: Kerugian Diperkirakan $2,3 Miliar",
      excerpt: "Kelompok hacker baru bernama ShadowSyndicate melancarkan serangan ransomware canggih yang mengeksploitasi zero-day vulnerability di sistem core banking.",
      content: `Serangan siber terbesar dalam sejarah industri perbankan Asia tengah berlangsung. Kelompok hacker yang menamakan diri ShadowSyndicate berhasil menginfeksi sistem 47 bank di 12 negara Asia menggunakan ransomware bernama BlackNova yang belum pernah terdeteksi sebelumnya.\n\nBlackNova mengeksploitasi zero-day vulnerability pada SWIFT messaging system yang digunakan hampir semua lembaga keuangan global. Yang membuat serangan ini berbeda adalah kemampuan BlackNova untuk menonaktifkan sistem backup sebelum mulai mengenkripsi data utama.\n\nBSI, Mandiri, dan BCA di Indonesia dikonfirmasi termasuk dalam daftar korban, meski ketiga bank tersebut menyatakan operasional masih berjalan normal dengan sistem contingency.\n\nKemenkopolhukam bersama BSSN sedang berkoordinasi dengan Interpol dan FBI untuk melacak pelaku. Tebusan yang diminta mencapai $50 juta dalam Monero per institusi.`,
      category: Category.CYBER_SECURITY,
      views: 187650,
      readTime: 9,
      isFeatured: true,
      isTrending: true,
      authorId: editor.id,
      tags: ["Ransomware", "Cyber Attack", "Security"],
    },
    {
      slug: "react-19-stable-release",
      title: "React 19 Stable Dirilis: Actions, Server Components Stabil, dan Compiler Baru",
      excerpt: "Meta merilis React 19 sebagai versi stable dengan fitur-fitur revolusioner yang menyederhanakan pengembangan aplikasi web modern secara drastis.",
      content: `Setelah lebih dari setahun dalam fase kandidat rilis, React 19 akhirnya mendapat status stable. Versi ini membawa perubahan paradigmatik dalam cara developer membangun aplikasi web, dengan fokus pada pengurangan boilerplate dan peningkatan developer experience.\n\nFitur Actions memungkinkan form submission dan data mutations tanpa useEffect yang rumit. Compiler baru secara otomatis mengoptimalkan re-render, mengeliminasi kebutuhan akan useMemo dan useCallback dalam sebagian besar kasus.\n\nServer Components kini dinyatakan production-ready dan fully stable, memungkinkan rendering komponen langsung di server tanpa JavaScript di client. Ini menghasilkan bundle size yang jauh lebih kecil dan TTFB yang lebih cepat.\n\nVercel telah mengintegrasikan semua fitur React 19 ke dalam Next.js 15, yang juga dirilis bersamaan hari ini.`,
      category: Category.PROGRAMMING,
      views: 89320,
      readTime: 8,
      isTrending: true,
      authorId: editor.id,
      tags: ["React", "JavaScript"],
    },
    {
      slug: "startup-unicorn-indonesia-2025",
      title: "Tiga Startup Indonesia Raih Status Unicorn Serentak: Rekor Baru Asia Tenggara",
      excerpt: "HealthAI, EduVerse, dan AgriTech.id resmi bergabung dalam klub unicorn Indonesia, mendorong total valuasi ekosistem startup lokal melampaui $50 miliar.",
      content: `Indonesia mencatatkan sejarah baru dalam ekosistem startup Asia Tenggara dengan tiga perusahaan serentak meraih status unicorn dalam satu kuartal.\n\nHealthAI, platform diagnostik berbasis AI yang didirikan di Jakarta, berhasil menutup Series C senilai $200 juta yang dipimpin Sequoia Capital Asia. Platform ini kini digunakan lebih dari 500 rumah sakit di 12 negara Asia.\n\nEduVerse, startup edtech yang menggabungkan VR dan gamifikasi, mendapat pendanaan $150 juta dari SoftBank Vision Fund 3.\n\nAgriTech.id melengkapi trifekta dengan menutup pendanaan $120 juta dari kombinasi investor lokal dan internasional.`,
      category: Category.STARTUP,
      views: 54320,
      readTime: 7,
      authorId: writer.id,
      tags: ["Startup", "Unicorn", "Indonesia", "Funding"],
    },
  ];

  for (const data of articlesData) {
    const { tags: tagNames, ...articleData } = data;
    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        ...articleData,
        status: Status.PUBLISHED,
        publishedAt: new Date(),
        seoTitle: articleData.title,
        seoDesc: articleData.excerpt,
        tags: {
          create: tagNames
            .filter((n) => tagMap[n])
            .map((n) => ({ tag: { connect: { id: tagMap[n].id } } })),
        },
      },
    });
    console.log(`✅ Article: ${article.title.slice(0, 50)}...`);
  }

  // ── Newsletter subscribers ───────────────────────────────────────────────
  await prisma.newsletter.createMany({
    skipDuplicates: true,
    data: [
      { email: "reader1@gmail.com", isVerified: true },
      { email: "reader2@yahoo.com", isVerified: true },
      { email: "techfan@outlook.com", isVerified: false },
    ],
  });

  console.log("✅ Seed selesai!");
  console.log("─────────────────────────────────────────");
  console.log("Admin: admin@techpulse.id / Admin@12345");
  console.log("Editor: rina@techpulse.id  / Editor@12345");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
