'use client';

import { useState, useEffect } from 'react';
import { ARTICLES, CATEGORIES, Article } from '@/lib/data';
import { authenticateAdmin, saveSession, getSession, clearSession, AdminUser } from '@/lib/auth';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BreakingBar from '@/components/layout/BreakingBar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import BackToTop from '@/components/ui/BackToTop';
import Modal from '@/components/ui/Modal';
import ArticleCard from '@/components/article/ArticleCard';
import ArticleDetail from '@/components/article/ArticleDetail';
import HeroSection from '@/components/article/HeroSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import PopularTags from '@/components/sections/PopularTags';
import StatsCounter from '@/components/sections/StatsCounter';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { ToastProvider, useToast } from '@/components/ui/Toast';

function HomeContent() {
  const { showToast } = useToast();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Auth state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginLocked, setLoginLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Omit<AdminUser, 'password'> | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  // Check existing session on mount
  useEffect(() => {
    const session = getSession();
    if (session) setLoggedInUser(session);
  }, []);

  // Lock timer countdown
  useEffect(() => {
    if (lockTimer > 0) {
      const interval = setInterval(() => setLockTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (lockTimer === 0 && loginLocked) {
      setLoginLocked(false);
      setLoginAttempts(0);
    }
  }, [lockTimer, loginLocked]);

  const handleLogin = () => {
    if (loginLocked) return;
    setLoginError('');
    setLoginLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = authenticateAdmin(loginForm.email, loginForm.password);
      setLoginLoading(false);

      if (result.success && result.user) {
        setLoggedInUser(result.user);
        saveSession(result.user);
        setShowLoginModal(false);
        setShowAdmin(true);
        setLoginForm({ email: '', password: '' });
        setLoginAttempts(0);
        showToast('success', `Selamat datang, ${result.user.name}!`);
      } else {
        setLoginError(result.error || 'Login gagal');
        setShakeKey((k) => k + 1);
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 3) {
          setLoginLocked(true);
          setLockTimer(30);
          setLoginError(`Terlalu banyak percobaan gagal. Coba lagi dalam 30 detik.`);
          showToast('error', 'Akun terkunci sementara selama 30 detik');
        } else {
          showToast('error', result.error || 'Login gagal');
        }
      }
    }, 800);
  };

  const handleLogout = () => {
    clearSession();
    setLoggedInUser(null);
    setShowAdmin(false);
    showToast('info', 'Anda telah keluar dari admin panel');
  };

  const handleAdminClick = () => {
    if (loggedInUser) {
      setShowAdmin(true);
    } else {
      setShowLoginModal(true);
      setLoginError('');
      setLoginForm({ email: '', password: '' });
    }
  };

  const heroArticles = ARTICLES.filter((a) => a.featured);
  const trendingArticles = ARTICLES.filter((a) => a.trending);
  const editorPicks = ARTICLES.filter((a) => !a.featured).slice(0, 3);

  const filteredArticles = ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (showAdmin && loggedInUser) {
    return <AdminDashboard user={loggedInUser} onClose={() => setShowAdmin(false)} onLogout={handleLogout} />;
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-[#fafbfc]">
        <Navbar search="" onSearchChange={() => { }} activeCategory="" onCategoryChange={() => { }} onSubscribe={() => { }} onAdminLogin={handleAdminClick} onLogoClick={() => setSelectedArticle(null)} />
        <div className="pt-[60px]"><ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} onSelect={setSelectedArticle} /></div>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <LoadingScreen />

      {/* ── Login Modal ── */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <div className="p-7 w-full" key={shakeKey}>
          <div className={loginError && !loginLoading ? 'animate-shake' : ''}>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-extrabold text-[15px] shadow-[0_2px_8px_rgba(37,99,235,0.3)]">T</div>
              <div>
                <h2 className="text-gray-900 font-bold text-lg leading-tight">Admin Login</h2>
                <p className="text-gray-400 text-[12px]">Masuk untuk mengelola konten</p>
              </div>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                <div>
                  <p className="text-red-700 text-[13px] font-medium">{loginError}</p>
                  {loginAttempts > 0 && loginAttempts < 3 && (
                    <p className="text-red-500 text-[11px] mt-0.5">Percobaan {loginAttempts}/3 — akan terkunci setelah 3x gagal</p>
                  )}
                  {loginLocked && lockTimer > 0 && (
                    <p className="text-red-500 text-[11px] mt-0.5">Coba lagi dalam {lockTimer} detik</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label className="text-gray-600 text-[12px] mb-1.5 block font-medium">Email Address</label>
                <input
                  value={loginForm.email}
                  onChange={(e) => { setLoginForm({ ...loginForm, email: e.target.value }); setLoginError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="admin@techpulse.id"
                  type="email"
                  disabled={loginLocked}
                  className={`w-full bg-gray-50/80 border rounded-lg px-4 py-2.5 text-gray-900 text-[14px] focus:outline-none focus:ring-[3px] placeholder-gray-400 transition-all ${loginError ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-50'
                    } ${loginLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
              <div>
                <label className="text-gray-600 text-[12px] mb-1.5 block font-medium">Password</label>
                <div className="relative">
                  <input
                    value={loginForm.password}
                    onChange={(e) => { setLoginForm({ ...loginForm, password: e.target.value }); setLoginError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    disabled={loginLocked}
                    className={`w-full bg-gray-50/80 border rounded-lg px-4 py-2.5 pr-10 text-gray-900 text-[14px] focus:outline-none focus:ring-[3px] placeholder-gray-400 transition-all ${loginError ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-50'
                      } ${loginLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loginLocked || loginLoading}
              className={`w-full mt-5 font-semibold py-2.5 rounded-lg text-[14px] transition-all shadow-sm flex items-center justify-center gap-2 ${loginLocked || loginLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                }`}
            >
              {loginLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Memverifikasi...
                </>
              ) : loginLocked ? (
                `Terkunci (${lockTimer}s)`
              ) : (
                'Masuk'
              )}
            </button>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-[11px]">atau</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <button onClick={() => setShowLoginModal(false)} className="w-full mt-3 border border-gray-200 text-gray-500 hover:text-gray-900 py-2.5 rounded-lg text-[14px] transition-colors hover:bg-gray-50">
              Batal
            </button>

            {/* Credentials hint */}
            <div className="mt-5 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-blue-700 text-[11px] font-semibold mb-1.5">Akun Admin Demo:</p>
              <div className="space-y-1 text-[11px] text-blue-600 font-mono">
                <p>admin@techpulse.id / admin123 <span className="text-blue-400 font-sans">(Super Admin)</span></p>
                <p>editor@techpulse.id / editor123 <span className="text-blue-400 font-sans">(Editor)</span></p>
                <p>writer@techpulse.id / writer123 <span className="text-blue-400 font-sans">(Writer)</span></p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Newsletter Modal ── */}
      <Modal isOpen={showNewsletter} onClose={() => setShowNewsletter(false)}>
        <div className="p-8 w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          </div>
          {subscribed ? (
            <>
              <h2 className="text-gray-900 font-bold text-xl mb-2">Terima kasih! 🎉</h2>
              <p className="text-gray-500 text-[14px] mb-5">Newsletter TechPulse akan dikirim ke inbox Anda.</p>
              <button onClick={() => { setShowNewsletter(false); setSubscribed(false); setEmail(''); }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-[14px] transition-colors">Tutup</button>
            </>
          ) : (
            <>
              <h2 className="text-gray-900 font-bold text-xl mb-1">Newsletter TechPulse</h2>
              <p className="text-gray-500 text-[14px] mb-5 leading-relaxed">Ringkasan berita teknologi terbaik, dikirim setiap pagi. Gratis.</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@anda.com" type="email"
                className="w-full bg-gray-50/80 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50 mb-3 placeholder-gray-400" />
              <button onClick={() => { if (email) { setSubscribed(true); showToast('success', 'Berhasil subscribe newsletter!'); } }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-[14px] transition-colors shadow-sm">Subscribe</button>
              <p className="text-gray-400 text-[11px] mt-3">Tanpa spam · Berhenti langganan kapan saja</p>
            </>
          )}
        </div>
      </Modal>

      {/* Navbar */}
      <Navbar search={search} onSearchChange={setSearch} activeCategory={activeCategory} onCategoryChange={setActiveCategory}
        onSubscribe={() => setShowNewsletter(true)} onAdminLogin={handleAdminClick} onLogoClick={() => setSelectedArticle(null)} />

      <main className="pt-[60px]">
        <BreakingBar articles={trendingArticles} onArticleClick={setSelectedArticle} />
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8">
          {/* Hero */}
          {!search && activeCategory === 'All' && <HeroSection heroArticles={heroArticles} trendingArticles={trendingArticles} onSelectArticle={setSelectedArticle} />}

          {/* Animated Stats */}
          {!search && activeCategory === 'All' && <StatsCounter />}

          {/* Editor's Picks */}
          {!search && activeCategory === 'All' && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full bg-blue-600" />
                <h2 className="text-gray-900 font-bold text-xl">Pilihan Editor</h2>
                <div className="flex-1 h-px bg-gray-100 ml-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {editorPicks.map((a, i) => (
                  <div key={a.id} className="animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}><ArticleCard article={a} onSelect={setSelectedArticle} /></div>
                ))}
              </div>
            </section>
          )}

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gray-300" />
              <h2 className="text-gray-900 font-bold text-xl">{activeCategory === 'All' ? 'Semua Artikel' : activeCategory}</h2>
              {search && <span className="text-gray-400 text-[13px] ml-2">{filteredArticles.length} hasil untuk &ldquo;{search}&rdquo;</span>}
            </div>
            <div className="hidden md:flex items-center gap-0.5 bg-gray-50 border border-gray-100 rounded-lg p-0.5">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeCategory === cat ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                  {cat}{cat !== 'All' && <span className="ml-1 text-[10px] opacity-50">{ARTICLES.filter((a) => a.category === cat).length}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile pills */}
          <div className="flex md:hidden items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-5 px-5">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200 shadow-sm'}`}>{cat}</button>
            ))}
          </div>

          {/* Grid */}
          <section className="mb-12">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
                <p className="text-gray-900 font-semibold text-lg">Tidak ada artikel ditemukan</p>
                <p className="text-gray-400 text-[14px] mt-1">Coba kata kunci atau kategori lain</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 bg-blue-600 text-white text-[13px] px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">Reset Filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredArticles.map((a, i) => (
                  <div key={a.id} className="animate-fadeIn" style={{ animationDelay: `${i * 40}ms` }}><ArticleCard article={a} onSelect={setSelectedArticle} /></div>
                ))}
              </div>
            )}
          </section>

          {!search && activeCategory === 'All' && <NewsletterSection onOpenModal={() => setShowNewsletter(true)} />}
          {!search && activeCategory === 'All' && <PopularTags onTagClick={setSearch} />}
        </div>
        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
