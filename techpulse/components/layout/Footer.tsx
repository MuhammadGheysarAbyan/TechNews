// components/layout/Footer.tsx
import Link from "next/link";
import { Rss, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const LINKS = {
  Kategori: [
    { label: "AI & Machine Learning", href: "/category/ai" },
    { label: "Programming",           href: "/category/programming" },
    { label: "Gadget & Hardware",     href: "/category/gadget" },
    { label: "Startup",               href: "/category/startup" },
    { label: "Cyber Security",        href: "/category/cyber-security" },
  ],
  Perusahaan: [
    { label: "Tentang Kami",  href: "/about" },
    { label: "Tim Redaksi",   href: "/team" },
    { label: "Karir",         href: "/careers" },
    { label: "Kontak",        href: "/contact" },
    { label: "Pasang Iklan",  href: "/advertise" },
  ],
  Lainnya: [
    { label: "Newsletter",       href: "/newsletter" },
    { label: "RSS Feed",         href: "/feed.xml" },
    { label: "Sitemap",          href: "/sitemap.xml" },
    { label: "Kebijakan Privasi",href: "/privacy" },
    { label: "Syarat & Ketentuan",href: "/terms" },
  ],
};

const SOCIALS = [
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube,   href: "#", label: "YouTube" },
  { icon: Rss,       href: "/feed.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">T</div>
              <span className="text-white font-black text-lg">TechPulse</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Media teknologi terdepan Indonesia. Berita terkini, analisis mendalam, dan wawasan industri teknologi global.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-gray-500 hover:text-emerald-400 transition-all border border-white/10 hover:border-emerald-500/30">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-500 text-sm hover:text-emerald-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} TechPulse. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Dibuat dengan ❤️ di Jakarta, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
