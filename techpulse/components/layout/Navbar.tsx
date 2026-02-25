// components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Rss, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "AI",             href: "/category/ai" },
  { label: "Programming",    href: "/category/programming" },
  { label: "Gadget",         href: "/category/gadget" },
  { label: "Startup",        href: "/category/startup" },
  { label: "Cyber Security", href: "/category/cyber-security" },
];

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-gray-950/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-gray-950/80 backdrop-blur-sm"
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm group-hover:bg-emerald-400 transition-colors">T</div>
              <span className="text-white font-black text-xl tracking-tight">TechPulse</span>
              <span className="hidden sm:block text-emerald-400 text-xs font-medium border border-emerald-500/30 px-2 py-0.5 rounded-full">ID</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.href} href={cat.href}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    pathname?.startsWith(cat.href)
                      ? "bg-emerald-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  )}>
                  {cat.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Search size={16} />
              </button>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <Link href="/newsletter"
                className="hidden sm:flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                <Rss size={12} /> Subscribe
              </Link>
              <Link href="/admin"
                className="hidden sm:block border border-white/20 text-gray-400 hover:text-white text-xs px-3 py-2 rounded-full transition-all">
                Admin
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10">
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-white/10">
                <div className="py-4 flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)}
                      className={cn("px-4 py-2 rounded-xl text-sm transition-all",
                        pathname?.startsWith(cat.href) ? "bg-emerald-500/20 text-emerald-400" : "text-gray-300 hover:bg-white/5")}>
                      {cat.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 pt-2 mt-1 flex gap-2">
                    <Link href="/newsletter" onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center bg-emerald-500 text-white text-sm py-2 rounded-full">Subscribe</Link>
                    <Link href="/admin" onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center border border-white/20 text-gray-400 text-sm py-2 rounded-full">Admin</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, topik, atau tag..."
                  className="w-full bg-gray-900 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-emerald-500/50" />
                <button type="button" onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X size={20} />
                </button>
              </form>
              <p className="text-gray-600 text-sm mt-3 text-center">Tekan Enter untuk mencari • Esc untuk menutup</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
