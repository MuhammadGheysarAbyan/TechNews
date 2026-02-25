import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "AI", "Programming", "Gadget", "Startup", "Cyber Security"];

const AUTHORS = [
  { id: 1, name: "Rina Hartanto", avatar: "RH", role: "Senior Tech Writer", bio: "10+ tahun meliput industri teknologi global. Ex-Forbes Asia." },
  { id: 2, name: "Dimas Pratama", avatar: "DP", role: "AI Correspondent", bio: "PhD kandidat AI. Penulis tamu MIT Technology Review." },
  { id: 3, name: "Sari Wulandari", avatar: "SW", role: "Security Analyst", bio: "Certified CISSP. Konsultan keamanan siber perusahaan Fortune 500." },
  { id: 4, name: "Budi Santoso", avatar: "BS", role: "Startup Reporter", bio: "Mantan founder startup. Meliput ekosistem VC Asia Tenggara." },
];

const ARTICLES = [
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

const TAGS = ["OpenAI", "Apple", "Google", "NVIDIA", "React", "Rust", "Golang", "Security", "Startup", "AI", "VR", "AR", "Indonesia", "Funding", "LLM"];

// ─── UTILITIES ───────────────────────────────────────────────────────────────
const formatNumber = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : n;
const formatDate = (d) => new Date(d).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" });
const getCategoryColor = (cat) => ({
  "AI": "emerald", "Programming": "blue", "Gadget": "purple",
  "Startup": "orange", "Cyber Security": "red", "All": "slate"
})[cat] || "slate";

const ImagePlaceholder = ({ type, className = "" }) => {
  const configs = {
    ai: { bg: "from-emerald-900 to-emerald-700", icon: "🤖", label: "Artificial Intelligence" },
    ai2: { bg: "from-teal-900 to-cyan-700", icon: "🧠", label: "Machine Learning" },
    gadget: { bg: "from-purple-900 to-indigo-700", icon: "📱", label: "Gadget & Hardware" },
    startup: { bg: "from-orange-900 to-amber-700", icon: "🚀", label: "Startup" },
    security: { bg: "from-red-900 to-rose-700", icon: "🔐", label: "Cyber Security" },
    code: { bg: "from-blue-900 to-blue-700", icon: "💻", label: "Programming" },
    nvidia: { bg: "from-green-900 to-emerald-600", icon: "⚡", label: "GPU & Hardware" },
    react: { bg: "from-cyan-900 to-blue-700", icon: "⚛️", label: "Web Development" },
  };
  const c = configs[type] || configs.ai;
  return (
    <div className={`bg-gradient-to-br ${c.bg} flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 50% 50%, white 1px, transparent 1px)", backgroundSize:"30px 30px"}} />
      <span className="text-4xl mb-2 relative z-10">{c.icon}</span>
      <span className="text-white/60 text-xs font-medium tracking-widest uppercase relative z-10">{c.label}</span>
    </div>
  );
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Badge = ({ category }) => {
  const colors = {
    "AI": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Programming": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Gadget": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Startup": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Cyber Security": "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[category] || "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
      {category}
    </span>
  );
};

const Avatar = ({ author, size = "sm" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {author.avatar}
    </div>
  );
};

const ArticleCard = ({ article, onSelect, variant = "default" }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(article.bookmarked);
  const [likeCount, setLikeCount] = useState(article.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (variant === "hero") {
    return (
      <div onClick={() => onSelect(article)} className="group cursor-pointer relative rounded-2xl overflow-hidden h-[520px] flex flex-col justify-end">
        <ImagePlaceholder type={article.image} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        {article.trending && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            TRENDING
          </div>
        )}
        <div className="relative z-10 p-6">
          <Badge category={article.category} />
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-3">
            {article.title}
          </h2>
          <p className="mt-2 text-gray-300 text-sm line-clamp-2">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar author={article.author} size="sm" />
              <span className="text-white text-sm font-medium">{article.author.name}</span>
            </div>
            <span className="text-gray-400 text-xs">{article.readTime} menit baca</span>
            <span className="text-gray-400 text-xs">👁 {formatNumber(article.views)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div onClick={() => onSelect(article)} className="group flex gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors">
        <ImagePlaceholder type={article.image} className="w-20 h-16 rounded-lg flex-shrink-0" />
        <div className="min-w-0">
          <Badge category={article.category} />
          <h4 className="mt-1 text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">{article.title}</h4>
          <div className="mt-1 flex items-center gap-2 text-gray-500 text-xs">
            <span>{article.readTime}m</span>
            <span>•</span>
            <span>{formatNumber(article.views)} views</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => onSelect(article)} className="group cursor-pointer bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
      <div className="relative">
        <ImagePlaceholder type={article.image} className="h-44 w-full" />
        {article.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />TRENDING
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${bookmarked ? "bg-emerald-500 text-white" : "bg-black/60 text-white hover:bg-white/20"}`}>
          {bookmarked ? "🔖" : "☆"}
        </button>
      </div>
      <div className="p-4">
        <Badge category={article.category} />
        <h3 className="mt-2 font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug text-[15px]">
          {article.title}
        </h3>
        <p className="mt-1.5 text-gray-400 text-xs line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar author={article.author} size="sm" />
            <div>
              <p className="text-white text-xs font-medium">{article.author.name}</p>
              <p className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <button onClick={handleLike} className={`flex items-center gap-1 hover:text-red-400 transition-colors ${liked ? "text-red-400" : ""}`}>
              {liked ? "❤️" : "🤍"} {formatNumber(likeCount)}
            </button>
            <span>💬 {article.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ARTICLE DETAIL ──────────────────────────────────────────────────────────
const ArticleDetail = ({ article, onBack, allArticles, onSelect }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Reza Firmansyah", avatar: "RF", text: "Artikel yang sangat komprehensif! Ini akan berdampak besar pada industri.", time: "2 jam lalu", likes: 24, replies: [] },
    { id: 2, user: "Maya Putri", avatar: "MP", text: "Apakah ada informasi lebih lanjut tentang ketersediaan di Indonesia?", time: "4 jam lalu", likes: 12, replies: [
      { id: 3, user: "Dimas Pratama", avatar: "DP", text: "Kami akan menulis artikel follow-up tentang ini minggu depan, Maya!", time: "3 jam lalu", likes: 8 }
    ]},
  ]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const related = allArticles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, {
      id: Date.now(), user: "Anda", avatar: "AN", text: comment, time: "Baru saja", likes: 0, replies: []
    }]);
    setComment("");
  };

  useEffect(() => { window.scrollTo(0, 0); }, [article.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-emerald-400 transition-colors">← Beranda</button>
        <span>/</span>
        <span className="text-gray-400">{article.category}</span>
      </div>

      {/* Article Header */}
      <div className="mb-6">
        <Badge category={article.category} />
        <h1 className="mt-3 text-3xl md:text-4xl font-black text-white leading-tight">{article.title}</h1>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">{article.excerpt}</p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar author={article.author} size="md" />
          <div>
            <p className="text-white font-semibold">{article.author.name}</p>
            <p className="text-gray-500 text-sm">{article.author.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-sm ml-auto flex-wrap">
          <span>📅 {formatDate(article.publishedAt)}</span>
          <span>⏱ {article.readTime} menit baca</span>
          <span>👁 {formatNumber(article.views)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium ${liked ? "bg-red-500/20 border-red-500/40 text-red-400" : "border-white/20 text-gray-400 hover:border-red-500/40 hover:text-red-400"}`}>
          {liked ? "❤️" : "🤍"} {formatNumber(article.likes + (liked ? 1 : 0))} Suka
        </button>
        <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium ${bookmarked ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "border-white/20 text-gray-400 hover:border-emerald-500/40 hover:text-emerald-400"}`}>
          {bookmarked ? "🔖" : "☆"} {bookmarked ? "Tersimpan" : "Simpan"}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-gray-500 text-sm">Bagikan:</span>
          {["Twitter", "LinkedIn", "WhatsApp"].map(s => (
            <button key={s} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all border border-white/10">{s}</button>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      <ImagePlaceholder type={article.image} className="w-full h-64 md:h-96 rounded-2xl mb-8" />

      {/* Content */}
      <div className="prose prose-invert max-w-none mb-10">
        {article.content.split("\n\n").map((para, i) => (
          <p key={i} className="text-gray-300 leading-relaxed mb-4 text-[15px]">{para}</p>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-white/10">
        {article.tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:border-emerald-500/40 hover:text-emerald-400 cursor-pointer transition-all">#{tag}</span>
        ))}
      </div>

      {/* Author Bio */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
        <h3 className="text-white font-bold mb-4">Tentang Penulis</h3>
        <div className="flex items-start gap-4">
          <Avatar author={article.author} size="lg" />
          <div>
            <p className="text-white font-semibold text-lg">{article.author.name}</p>
            <p className="text-emerald-400 text-sm mb-2">{article.author.role}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{article.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mb-10">
        <h3 className="text-white font-bold text-xl mb-6">💬 {comments.reduce((a,c) => a + 1 + c.replies.length, 0)} Komentar</h3>
        
        {/* Comment Input */}
        <div className="flex gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">AN</div>
          <div className="flex-1">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Tulis komentar Anda..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-emerald-500/50 transition-colors"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button onClick={handleComment} className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
                Kirim Komentar
              </button>
            </div>
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.map(c => (
            <div key={c.id}>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-700 to-blue-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{c.avatar}</div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">{c.user}</span>
                      <span className="text-gray-600 text-xs">{c.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{c.text}</p>
                  </div>
                  <button className="mt-1 ml-2 text-gray-600 hover:text-emerald-400 text-xs transition-colors">🤍 {c.likes} • Balas</button>
                </div>
              </div>
              {c.replies.map(r => (
                <div key={r.id} className="flex gap-3 mt-3 ml-12">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-blue-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{r.avatar}</div>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-xs">{r.user}</span>
                        <span className="text-gray-600 text-xs">{r.time}</span>
                      </div>
                      <p className="text-gray-300 text-xs">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Artikel Terkait</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map(a => <ArticleCard key={a.id} article={a} onSelect={onSelect} />)}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [articles, setArticles] = useState(ARTICLES);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", excerpt: "", category: "AI", status: "draft" });

  const stats = [
    { label: "Total Artikel", value: "847", change: "+12", icon: "📰" },
    { label: "Pageviews Bulan Ini", value: "2.4M", change: "+23%", icon: "👁" },
    { label: "Total Users", value: "128K", change: "+8%", icon: "👥" },
    { label: "Revenue", value: "Rp 84jt", change: "+15%", icon: "💰" },
  ];

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "articles", label: "📰 Artikel" },
    { id: "users", label: "👥 Users" },
    { id: "analytics", label: "📈 Analytics" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  // Simple sparkline bar chart
  const chartData = [45, 78, 52, 91, 67, 84, 96, 73, 88, 110, 95, 128];
  const maxVal = Math.max(...chartData);

  return (
    <div className="fixed inset-0 bg-black z-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-gray-950 border-r border-white/10 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">T</div>
            <div>
              <p className="text-white font-bold text-sm">TechPulse</p>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === t.id ? "bg-emerald-500/20 text-emerald-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={onClose} className="w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            ← Kembali ke Website
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gray-950/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-white font-bold capitalize">{tabs.find(t=>t.id===activeTab)?.label.slice(2)}</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">Admin Utama</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">AU</div>
          </div>
        </div>

        <div className="p-6">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <p className="text-2xl font-black text-white">{s.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                    <p className="text-emerald-400 text-xs mt-1 font-medium">{s.change} vs bulan lalu</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Pageviews 12 Bulan Terakhir</h3>
                <div className="flex items-end gap-2 h-32">
                  {chartData.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-emerald-500/80 rounded-t-sm transition-all hover:bg-emerald-400"
                        style={{height: `${(v/maxVal)*100}%`}} />
                      <span className="text-gray-600 text-xs">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Articles */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Artikel Terbaru</h3>
                <div className="space-y-3">
                  {articles.slice(0, 5).map(a => (
                    <div key={a.id} className="flex items-center gap-3">
                      <ImagePlaceholder type={a.image} className="w-12 h-10 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{a.title}</p>
                        <p className="text-gray-500 text-xs">{a.author.name} • {formatDate(a.publishedAt)}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-emerald-400 text-xs font-medium">Published</span>
                        <p className="text-gray-500 text-xs">{formatNumber(a.views)} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ARTICLES */}
          {activeTab === "articles" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <input placeholder="Cari artikel..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/50 w-64" />
                <button onClick={() => { setEditing("new"); setForm({ title: "", excerpt: "", category: "AI", status: "draft" }); }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                  + Artikel Baru
                </button>
              </div>

              {editing && (
                <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">{editing === "new" ? "Buat Artikel Baru" : "Edit Artikel"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-xs mb-1.5 block">Judul Artikel</label>
                      <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Masukkan judul artikel..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-xs mb-1.5 block">Ringkasan</label>
                      <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none" rows={3} placeholder="Ringkasan artikel..." />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Kategori</label>
                      <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                        {["AI", "Programming", "Gadget", "Startup", "Cyber Security"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Status</label>
                      <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setEditing(null)} className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">Simpan</button>
                    <button onClick={() => setEditing(null)} className="border border-white/20 text-gray-400 hover:text-white text-sm px-5 py-2 rounded-full transition-colors">Batal</button>
                  </div>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Artikel", "Kategori", "Penulis", "Views", "Status", "Aksi"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {articles.map(a => (
                      <tr key={a.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-white text-sm font-medium line-clamp-1 max-w-xs">{a.title}</p>
                          <p className="text-gray-600 text-xs">{formatDate(a.publishedAt)}</p>
                        </td>
                        <td className="px-4 py-3"><Badge category={a.category} /></td>
                        <td className="px-4 py-3"><span className="text-gray-400 text-sm">{a.author.name}</span></td>
                        <td className="px-4 py-3"><span className="text-gray-400 text-sm">{formatNumber(a.views)}</span></td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">Published</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => { setEditing(a.id); setForm({title:a.title,excerpt:a.excerpt,category:a.category,status:"published"}); }}
                              className="text-gray-500 hover:text-blue-400 text-sm transition-colors">Edit</button>
                            <button onClick={() => setArticles(articles.filter(x=>x.id!==a.id))}
                              className="text-gray-500 hover:text-red-400 text-sm transition-colors">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[["Admin", 3, "emerald"], ["Editor", 12, "blue"], ["Writer", 47, "purple"]].map(([role, count, color]) => (
                  <div key={role} className={`bg-${color}-500/10 border border-${color}-500/20 rounded-2xl p-4`}>
                    <p className={`text-${color}-400 font-bold text-2xl`}>{count}</p>
                    <p className="text-gray-400 text-sm mt-1">{role}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Daftar User</h3>
                <div className="space-y-3">
                  {AUTHORS.map(a => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <Avatar author={a} size="md" />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{a.name}</p>
                        <p className="text-gray-500 text-xs">{a.role}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Editor</span>
                      <button className="text-gray-600 hover:text-red-400 text-xs transition-colors">Nonaktifkan</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">Artikel Terpopuler</h3>
                  <div className="space-y-3">
                    {[...ARTICLES].sort((a,b)=>b.views-a.views).slice(0,5).map((a,i) => (
                      <div key={a.id} className="flex items-center gap-3">
                        <span className="text-gray-600 font-mono text-sm w-4">{i+1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs truncate">{a.title}</p>
                          <div className="mt-1 h-1.5 bg-white/10 rounded-full">
                            <div className="h-full bg-emerald-500 rounded-full" style={{width:`${(a.views/187650)*100}%`}} />
                          </div>
                        </div>
                        <span className="text-gray-400 text-xs flex-shrink-0">{formatNumber(a.views)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">Distribusi Kategori</h3>
                  <div className="space-y-3">
                    {CATEGORIES.slice(1).map(cat => {
                      const count = ARTICLES.filter(a=>a.category===cat).length;
                      const pct = Math.round((count/ARTICLES.length)*100);
                      return (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="text-gray-400 text-xs w-24">{cat}</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full">
                            <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:`${pct}%`}} />
                          </div>
                          <span className="text-gray-500 text-xs">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-xl space-y-6">
              {[
                { label: "Nama Website", value: "TechPulse" },
                { label: "Tagline", value: "Berita Teknologi Terdepan Indonesia" },
                { label: "Email Admin", value: "admin@techpulse.id" },
                { label: "Google Analytics ID", value: "G-XXXXXXXXXX" },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-gray-400 text-xs mb-1.5 block">{field.label}</label>
                  <input defaultValue={field.value} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
              ))}
              <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
                Simpan Pengaturan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function TechPulse() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const heroArticles = ARTICLES.filter(a => a.featured);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroArticles.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredArticles = ARTICLES.filter(a => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const trendingArticles = ARTICLES.filter(a => a.trending);
  const latestArticles = ARTICLES.slice(0, 6);

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setLoggedIn(true);
      setShowLoginModal(false);
      setShowAdmin(true);
    }
  };

  if (showAdmin && loggedIn) return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  if (selectedArticle) return (
    <div className="min-h-screen bg-gray-950">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">T</div>
            <span className="text-white font-black text-lg tracking-tight">TechPulse</span>
          </button>
          <button onClick={() => setShowAdmin(true)} className="text-gray-400 hover:text-white text-sm transition-colors">Admin</button>
        </div>
      </nav>
      <div className="pt-16">
        <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} allArticles={ARTICLES} onSelect={setSelectedArticle} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{fontFamily:"'Georgia', serif"}}>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-white font-bold text-xl mb-1">Masuk ke Admin</h2>
            <p className="text-gray-500 text-sm mb-5">Gunakan kredensial admin Anda</p>
            <div className="space-y-3">
              <input value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}
                placeholder="Email" type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 placeholder-gray-600" />
              <input value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}
                placeholder="Password" type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 placeholder-gray-600" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleLogin} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2.5 rounded-full text-sm transition-colors">
                Masuk
              </button>
              <button onClick={() => setShowLoginModal(false)} className="flex-1 border border-white/20 text-gray-400 hover:text-white py-2.5 rounded-full text-sm transition-colors">
                Batal
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-3 text-center">Demo: isi email & password apapun</p>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-gray-950/80 backdrop-blur-sm"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">T</div>
              <span className="text-white font-black text-xl tracking-tight">TechPulse</span>
              <span className="hidden sm:block text-emerald-400 text-xs font-medium border border-emerald-500/30 px-2 py-0.5 rounded-full">ID</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari artikel, topik, atau tag..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 pl-9 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">✕</button>
                )}
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {CATEGORIES.slice(1).map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? "All" : cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-white"}`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setShowNewsletter(true)} className="hidden sm:block bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                Subscribe
              </button>
              <button onClick={() => setShowLoginModal(true)} className="border border-white/20 text-gray-400 hover:text-white text-xs px-3 py-2 rounded-full transition-colors">
                Admin
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-gray-400 hover:text-white">☰</button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="lg:hidden pb-4 border-t border-white/10 pt-4">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari..." className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none mb-3" />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setMobileMenu(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-emerald-500 text-white" : "bg-white/5 text-gray-400"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Newsletter Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl p-8 w-full max-w-md text-center">
            <div className="text-4xl mb-3">📧</div>
            {subscribed ? (
              <>
                <h2 className="text-white font-bold text-xl mb-2">Terima kasih! 🎉</h2>
                <p className="text-gray-400 text-sm mb-4">Anda berhasil subscribe ke newsletter TechPulse. Cek inbox Anda!</p>
                <button onClick={() => { setShowNewsletter(false); setSubscribed(false); setEmail(""); }} className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors">Tutup</button>
              </>
            ) : (
              <>
                <h2 className="text-white font-bold text-xl mb-1">Newsletter TechPulse</h2>
                <p className="text-gray-400 text-sm mb-5">Dapatkan berita teknologi terbaru langsung di inbox Anda. Gratis, tanpa spam.</p>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="email@anda.com" type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 mb-3 placeholder-gray-600" />
                <div className="flex gap-3">
                  <button onClick={() => { if (email) setSubscribed(true); }} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2.5 rounded-full text-sm transition-colors">
                    Subscribe Sekarang
                  </button>
                  <button onClick={() => setShowNewsletter(false)} className="border border-white/20 text-gray-400 px-4 py-2.5 rounded-full text-sm hover:text-white transition-colors">Nanti</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* BREAKING NEWS BAR */}
        <div className="bg-red-600 py-2 overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap" style={{animation:"marquee 30s linear infinite"}}>
            <span className="font-bold text-sm ml-4">🔴 BREAKING:</span>
            {trendingArticles.map((a, i) => (
              <span key={i} className="text-sm text-white/90 mx-8 cursor-pointer hover:text-white" onClick={() => setSelectedArticle(a)}>
                {a.title} <span className="mx-4 text-white/40">•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* HERO SECTION */}
          {(!search && activeCategory === "All") && (
            <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Hero */}
                <div className="lg:col-span-2">
                  <ArticleCard article={heroArticles[heroIndex]} onSelect={setSelectedArticle} variant="hero" />
                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-3">
                    {heroArticles.map((_, i) => (
                      <button key={i} onClick={() => setHeroIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? "bg-emerald-500 w-6" : "bg-white/20"}`} />
                    ))}
                  </div>
                </div>

                {/* Sidebar trending */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500 font-bold text-sm">🔥 TRENDING</span>
                  </div>
                  {trendingArticles.slice(0, 5).map((a, i) => (
                    <div key={a.id} onClick={() => setSelectedArticle(a)}
                      className="group cursor-pointer flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                      <span className="text-3xl font-black text-gray-800 group-hover:text-emerald-800 transition-colors leading-none">{String(i+1).padStart(2,"0")}</span>
                      <div>
                        <Badge category={a.category} />
                        <h4 className="text-white text-sm font-semibold group-hover:text-emerald-400 transition-colors mt-1 leading-snug line-clamp-2">{a.title}</h4>
                        <p className="text-gray-600 text-xs mt-1">{formatNumber(a.views)} views • {a.readTime}m</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CATEGORY FILTER */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 text-xs opacity-60">{ARTICLES.filter(a=>a.category===cat).length}</span>}
              </button>
            ))}
            {search && (
              <span className="text-gray-500 text-sm ml-2">
                {filteredArticles.length} hasil untuk "<span className="text-white">{search}</span>"
              </span>
            )}
          </div>

          {/* ARTICLES GRID */}
          <section className="mb-12">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-white font-semibold text-lg">Tidak ada artikel ditemukan</p>
                <p className="text-gray-500 text-sm mt-1">Coba kata kunci atau kategori lain</p>
                <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 bg-emerald-500 text-white text-sm px-5 py-2 rounded-full hover:bg-emerald-400 transition-colors">Reset Filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredArticles.map(a => <ArticleCard key={a.id} article={a} onSelect={setSelectedArticle} />)}
              </div>
            )}
          </section>

          {/* NEWSLETTER INLINE */}
          {(!search && activeCategory === "All") && (
            <section className="mb-12">
              <div className="bg-gradient-to-r from-emerald-950 to-blue-950 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Stay Updated 📡</h2>
                <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
                  Bergabung dengan 128.000+ pembaca yang mendapatkan ringkasan berita teknologi terbaik setiap hari.
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                  <input placeholder="email@anda.com" type="email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500" />
                  <button onClick={() => setShowNewsletter(true)} className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors flex-shrink-0">
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-600 text-xs mt-3">Gratis • Tanpa spam • Berhenti berlangganan kapan saja</p>
              </div>
            </section>
          )}

          {/* POPULAR TAGS */}
          {(!search && activeCategory === "All") && (
            <section className="mb-8">
              <h3 className="text-white font-bold text-lg mb-4">🏷️ Tag Populer</h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button key={tag} onClick={() => setSearch(tag)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-all">
                    #{tag}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-gray-950 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">T</div>
                  <span className="text-white font-black text-lg">TechPulse</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Media teknologi terdepan Indonesia. Berita terkini, analisis mendalam, dan wawasan industri.
                </p>
              </div>
              {[
                { title: "Kategori", links: ["AI & Machine Learning", "Programming", "Gadget", "Startup", "Cyber Security"] },
                { title: "Perusahaan", links: ["Tentang Kami", "Tim Redaksi", "Karir", "Kontak", "Iklan"] },
                { title: "Legal", links: ["Kebijakan Privasi", "Syarat & Ketentuan", "Sitemap", "RSS Feed"] },
              ].map(col => (
                <div key={col.title}>
                  <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map(link => (
                      <li key={link}><a href="#" className="text-gray-500 text-sm hover:text-emerald-400 transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">© 2025 TechPulse. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {["Twitter", "LinkedIn", "Instagram", "YouTube"].map(s => (
                  <a key={s} href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }
      `}</style>
    </div>
  );
}
