// src/lib/data.ts

export interface Author {
  id: number;
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  image: string;
  publishedAt: string;
  bookmarked: boolean;
}

export const CATEGORIES = ["All", "AI", "Programming", "Gadget", "Startup", "Cyber Security"];

export const AUTHORS: Author[] = [
  { id: 1, name: "Rina Hartanto", avatar: "RH", role: "Senior Tech Writer", bio: "10+ tahun meliput industri teknologi global. Ex-Forbes Asia." },
  { id: 2, name: "Dimas Pratama", avatar: "DP", role: "AI Correspondent", bio: "PhD kandidat AI. Penulis tamu MIT Technology Review." },
  { id: 3, name: "Sari Wulandari", avatar: "SW", role: "Security Analyst", bio: "Certified CISSP. Konsultan keamanan siber perusahaan Fortune 500." },
  { id: 4, name: "Budi Santoso", avatar: "BS", role: "Startup Reporter", bio: "Mantan founder startup. Meliput ekosistem VC Asia Tenggara." },
];

export const ARTICLES: Article[] = [
  {
    id: 1, slug: "openai-gpt5-multimodal-breakthrough",
    title: "OpenAI Rilis GPT-5: Model Multimodal Terbaru yang Mengguncang Industri AI Global",
    excerpt: "GPT-5 hadir dengan kemampuan reasoning setara manusia dewasa, mampu memproses teks, gambar, audio, dan video secara simultan dengan akurasi yang belum pernah ada sebelumnya.",
    content: `OpenAI secara resmi merilis GPT-5, model bahasa besar generasi terbaru yang diklaim sebagai lompatan terbesar dalam sejarah kecerdasan buatan. Model ini tidak hanya memproses teks, tetapi juga gambar, audio, dan video secara bersamaan dengan tingkat pemahaman kontekstual yang mendekati kemampuan manusia.\n\nDalam benchmark internal OpenAI, GPT-5 berhasil mencapai skor 87,4% pada tes penalaran abstrak, melampaui rata-rata manusia dewasa yang berada di angka 79,2%. Yang lebih mengesankan, model ini mampu menyelesaikan soal matematika olimpiade tingkat internasional dengan akurasi 91%.\n\nSam Altman dalam konferensi pers menyatakan, "GPT-5 bukan hanya upgrade biasa. Ini adalah perubahan paradigma dalam cara kita berinteraksi dengan AI." Model ini akan tersedia melalui API mulai bulan depan dengan harga yang diklaim 40% lebih murah dari GPT-4.\n\nPara peneliti dari Stanford dan MIT yang mendapat akses awal menyebut GPT-5 sebagai "inflection point" dalam pengembangan AGI. Namun kritik dari kalangan peneliti keamanan AI mempertanyakan transparansi OpenAI terkait proses training dan data yang digunakan.`,
    category: "AI", author: AUTHORS[1], readTime: 8,
    views: 142830, likes: 4721, comments: 234,
    tags: ["OpenAI", "GPT-5", "LLM", "Machine Learning"],
    featured: true, trending: true,
    image: "ai", publishedAt: "2025-03-15", bookmarked: false,
  },
  {
    id: 2, slug: "apple-vision-pro-2-indonesia",
    title: "Apple Vision Pro 2 Resmi Masuk Indonesia: Harga Rp 85 Juta, Ini Spesifikasi Lengkapnya",
    excerpt: "Apple akhirnya membawa Vision Pro generasi kedua ke pasar Asia Tenggara termasuk Indonesia dengan chipset M4 Ultra dan layar micro-OLED 8K per mata.",
    content: `Apple secara resmi mengumumkan kehadiran Vision Pro 2 di Indonesia melalui Apple Store online dan beberapa authorized reseller terpilih. Headset mixed reality premium ini hadir dengan sejumlah peningkatan signifikan dibanding pendahulunya.\n\nDiperkuat chipset M4 Ultra dengan 32-core GPU, Vision Pro 2 menawarkan performa rendering 3D real-time yang dua kali lebih cepat. Layar micro-OLED 8K per mata dengan refresh rate 240Hz menjadikannya perangkat VR/AR dengan visual paling tajam di kelasnya saat ini.\n\nFitur Spatial Audio generasi baru mampu mereplikasi suara ruangan dengan akurasi milimeter, sementara sistem eye-tracking terbaru mengklaim latensi hanya 0,8 milidetik. Apple juga memperkenalkan "visionOS 3" yang hadir pre-installed dengan ekosistem aplikasi yang kini mencapai lebih dari 3.000 judul.\n\nHarga resmi Rp 85.000.000 untuk model 256GB. Pembelian pertama dibatasi dua unit per pelanggan.`,
    category: "Gadget", author: AUTHORS[0], readTime: 6,
    views: 98420, likes: 3102, comments: 187,
    tags: ["Apple", "Vision Pro", "VR", "AR", "Mixed Reality"],
    featured: true, trending: true,
    image: "gadget", publishedAt: "2025-03-14", bookmarked: false,
  },
  {
    id: 3, slug: "google-project-astra-android",
    title: "Google Project Astra Kini Hadir di Android: AI Assistant yang Bisa 'Melihat' Dunia Real-Time",
    excerpt: "Project Astra resmi diluncurkan untuk pengguna Android, menghadirkan AI yang dapat memahami lingkungan sekitar melalui kamera smartphone secara real-time.",
    content: `Google mengumumkan peluncuran Project Astra secara global untuk perangkat Android, menandai era baru asisten AI yang dapat berinteraksi dengan dunia fisik secara langsung.\n\nMenggunakan Gemini Ultra 2.0 sebagai backbone, Astra mampu menganalisis apa yang dilihat kamera, memahami konteks percakapan hingga 10 menit ke belakang, dan memberikan respons yang relevan dalam waktu kurang dari 500 milidetik.\n\nDalam demonstrasi, Astra berhasil membantu seorang teknisi memperbaiki mesin industri hanya dengan mengarahkan kamera ke komponen yang rusak. Sistem AI ini juga dapat membaca dan menerjemahkan teks dalam 95 bahasa secara real-time, termasuk Bahasa Indonesia.\n\nProject Astra tersedia gratis untuk pengguna Google One AI Premium dan akan hadir di iOS pada Q3 2025.`,
    category: "AI", author: AUTHORS[1], readTime: 5,
    views: 76540, likes: 2890, comments: 143,
    tags: ["Google", "Gemini", "AI Assistant", "Android"],
    featured: false, trending: true,
    image: "ai2", publishedAt: "2025-03-13", bookmarked: false,
  },
  {
    id: 4, slug: "startup-unicorn-indonesia-2025",
    title: "Tiga Startup Indonesia Raih Status Unicorn Serentak: Rekor Baru Ekosistem Startup Asia Tenggara",
    excerpt: "HealthAI, EduVerse, dan AgriTech.id resmi bergabung dalam klub unicorn Indonesia, mendorong total valuasi ekosistem startup lokal melampaui $50 miliar.",
    content: `Indonesia mencatatkan sejarah baru dalam ekosistem startup Asia Tenggara dengan tiga perusahaan serentak meraih status unicorn dalam satu kuartal, sebuah pencapaian yang belum pernah terjadi sebelumnya di kawasan ini.\n\nHealthAI, platform diagnostik berbasis AI yang didirikan di Jakarta, berhasil menutup Series C senilai $200 juta yang dipimpin Sequoia Capital Asia. Platform ini kini digunakan lebih dari 500 rumah sakit di 12 negara Asia.\n\nEduVerse, startup edtech yang menggabungkan VR dan gamifikasi, mendapat pendanaan $150 juta dari SoftBank Vision Fund 3. Dengan 8 juta pengguna aktif, EduVerse diklaim sebagai platform belajar VR terbesar di Asia Tenggara.\n\nAgriTech.id melengkapi trifekta dengan menutup pendanaan $120 juta dari kombinasi investor lokal dan internasional, dipimpin East Ventures dan Temasek.`,
    category: "Startup", author: AUTHORS[3], readTime: 7,
    views: 54320, likes: 1876, comments: 98,
    tags: ["Startup", "Unicorn", "Indonesia", "Funding", "VC"],
    featured: false, trending: false,
    image: "startup", publishedAt: "2025-03-12", bookmarked: false,
  },
  {
    id: 5, slug: "ransomware-baru-serang-bank-asia",
    title: "Ransomware 'BlackNova' Serang 47 Bank di Asia: Kerugian Diperkirakan $2,3 Miliar",
    excerpt: "Kelompok hacker baru bernama ShadowSyndicate melancarkan serangan ransomware canggih yang mengeksploitasi zero-day vulnerability di sistem core banking.",
    content: `Serangan siber terbesar dalam sejarah industri perbankan Asia tengah berlangsung. Kelompok hacker yang menamakan diri ShadowSyndicate berhasil menginfeksi sistem 47 bank di 12 negara Asia menggunakan ransomware bernama BlackNova yang belum pernah terdeteksi sebelumnya.\n\nBlackNova mengeksploitasi zero-day vulnerability pada SWIFT messaging system yang digunakan hampir semua lembaga keuangan global. Yang membuat serangan ini berbeda adalah kemampuan BlackNova untuk menonaktifkan sistem backup sebelum mulai mengenkripsi data utama.\n\nBSI, Mandiri, dan BCA di Indonesia dikonfirmasi termasuk dalam daftar korban, meski ketiga bank tersebut menyatakan operasional masih berjalan normal dengan sistem contingency. Otoritas Jasa Keuangan (OJK) telah mengeluarkan alert darurat kepada seluruh lembaga keuangan yang diawasi.\n\nKemenkopolhukam bersama BSSN sedang berkoordinasi dengan Interpol dan FBI untuk melacak pelaku. Tebusan yang diminta mencapai $50 juta dalam Monero per institusi.`,
    category: "Cyber Security", author: AUTHORS[2], readTime: 9,
    views: 187650, likes: 5432, comments: 389,
    tags: ["Ransomware", "Cyber Attack", "Banking", "Security"],
    featured: true, trending: true,
    image: "security", publishedAt: "2025-03-11", bookmarked: false,
  },
  {
    id: 6, slug: "rust-vs-golang-2025-benchmark",
    title: "Rust vs Go 2025: Benchmark Komprehensif Menunjukkan Siapa yang Mendominasi Backend Modern",
    excerpt: "Tim engineering dari Netflix, Cloudflare, dan Discord merilis studi benchmark terbaru yang membandingkan performa Rust dan Go dalam skenario production nyata.",
    content: `Perdebatan Rust vs Go kembali memanas setelah tiga perusahaan teknologi terkemuka merilis benchmark komprehensif yang dilakukan dalam kondisi production sesungguhnya, bukan environment lab yang terkontrol.\n\nDalam uji throughput HTTP server dengan 1 juta concurrent connections, Rust mengungguli Go dengan margin 23%. Namun dalam kecepatan kompilasi dan kemudahan deployment, Go masih menjadi raja yang tak terbantahkan.\n\nNetflix yang telah memigrasikan sebagian sistem recommendation engine ke Rust melaporkan penurunan konsumsi CPU sebesar 31% dan penurunan memory footprint 44%. Namun mereka mengakui waktu onboarding engineer baru ke codebase Rust membutuhkan 3x lebih lama dibanding Go.\n\nCloudflare, yang menggunakan keduanya secara ekstensif, menyimpulkan bahwa Rust adalah pilihan tepat untuk komponen low-level yang membutuhkan performa ekstrem, sementara Go tetap superior untuk microservices yang memerlukan development velocity tinggi.`,
    category: "Programming", author: AUTHORS[0], readTime: 10,
    views: 43210, likes: 2341, comments: 267,
    tags: ["Rust", "Golang", "Backend", "Performance", "Benchmark"],
    featured: false, trending: false,
    image: "code", publishedAt: "2025-03-10", bookmarked: false,
  },
  {
    id: 7, slug: "nvidia-blackwell-ultra-indonesia",
    title: "NVIDIA Blackwell Ultra GPU Resmi Tersedia: Performa 8x H100 untuk Inferensi AI",
    excerpt: "NVIDIA meluncurkan B200 Ultra dengan 192GB HBM3e memory dan NVLink 5.0, menjadikannya accelerator AI paling powerful untuk deployment LLM skala enterprise.",
    content: `NVIDIA mengumumkan ketersediaan umum GPU Blackwell Ultra B200, chip yang dirancang khusus untuk inferensi model bahasa besar (LLM) dalam skala enterprise. Chip ini menawarkan performa inferensi 8x lebih cepat dibanding H100 dengan konsumsi daya yang hanya 40% lebih tinggi.\n\nFitur unggulan B200 Ultra adalah memory bandwidth 8 TB/s yang memungkinkan loading model berparameter 1 triliun dalam hitungan detik. Teknologi NVLink 5.0 menghubungkan hingga 576 GPU dalam satu cluster dengan bandwidth inter-GPU 1,8 TB/s.\n\nDi Indonesia, PT Data Sinergitama Jaya (DSJ Cloud) menjadi penyedia cloud pertama yang menawarkan akses B200 Ultra melalui platform cloud mereka. Harga sewa dimulai dari $35 per GPU-hour.\n\nMeta, Google, dan Microsoft telah memesan lebih dari 200.000 unit untuk tahun 2025, menciptakan backlog yang diperkirakan baru terpenuhi pada Q4 2025.`,
    category: "AI", author: AUTHORS[1], readTime: 6,
    views: 67890, likes: 2987, comments: 156,
    tags: ["NVIDIA", "GPU", "AI", "Hardware", "Blackwell"],
    featured: false, trending: true,
    image: "nvidia", publishedAt: "2025-03-09", bookmarked: false,
  },
  {
    id: 8, slug: "react-19-stable-release",
    title: "React 19 Stable Dirilis: Actions, Server Components Stabil, dan Compiler Baru yang Mengubah Segalanya",
    excerpt: "Meta merilis React 19 sebagai versi stable dengan fitur-fitur revolusioner yang menyederhanakan pengembangan aplikasi web modern secara drastis.",
    content: `Setelah lebih dari setahun dalam fase kandidat rilis, React 19 akhirnya mendapat status stable. Versi ini membawa perubahan paradigmatik dalam cara developer membangun aplikasi web, dengan fokus pada pengurangan boilerplate dan peningkatan developer experience.\n\nFitur Actions memungkinkan form submission dan data mutations tanpa useEffect yang rumit. Compiler baru secara otomatis mengoptimalkan re-render, mengeliminasi kebutuhan akan useMemo dan useCallback dalam sebagian besar kasus.\n\nServer Components kini dinyatakan production-ready dan fully stable, memungkinkan rendering komponen langsung di server tanpa JavaScript di client. Ini menghasilkan bundle size yang jauh lebih kecil dan TTFB yang lebih cepat.\n\nVercel telah mengintegrasikan semua fitur React 19 ke dalam Next.js 15, yang juga dirilis bersamaan hari ini. Tim React mengklaim aplikasi yang dimigrasikan ke React 19 rata-rata 40% lebih cepat dalam Core Web Vitals.`,
    category: "Programming", author: AUTHORS[0], readTime: 8,
    views: 89320, likes: 4123, comments: 312,
    tags: ["React", "JavaScript", "Frontend", "Web Dev"],
    featured: false, trending: true,
    image: "react", publishedAt: "2025-03-08", bookmarked: false,
  },
];

export const TAGS = [
  "OpenAI", "Apple", "Google", "NVIDIA", "React", "Rust", "Golang",
  "Security", "Startup", "AI", "VR", "AR", "Indonesia", "Funding", "LLM",
];

export const IMAGE_CONFIGS: Record<string, { bg: string; icon: string; label: string }> = {
  ai: { bg: "from-emerald-900 to-emerald-700", icon: "🤖", label: "Artificial Intelligence" },
  ai2: { bg: "from-teal-900 to-cyan-700", icon: "🧠", label: "Machine Learning" },
  gadget: { bg: "from-purple-900 to-indigo-700", icon: "📱", label: "Gadget & Hardware" },
  startup: { bg: "from-orange-900 to-amber-700", icon: "🚀", label: "Startup" },
  security: { bg: "from-red-900 to-rose-700", icon: "🔐", label: "Cyber Security" },
  code: { bg: "from-blue-900 to-blue-700", icon: "💻", label: "Programming" },
  nvidia: { bg: "from-green-900 to-emerald-600", icon: "⚡", label: "GPU & Hardware" },
  react: { bg: "from-cyan-900 to-blue-700", icon: "⚛️", label: "Web Development" },
};
