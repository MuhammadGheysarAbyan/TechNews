'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES } from '@/lib/data';

interface NavbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
    onSubscribe: () => void;
    onAdminLogin: () => void;
    onLogoClick: () => void;
}

export default function Navbar({
    search, onSearchChange, activeCategory, onCategoryChange,
    onSubscribe, onAdminLogin, onLogoClick,
}: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border-b border-gray-100/80'
                : 'bg-white border-b border-gray-100'
            }`}>
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                <div className="h-[60px] flex items-center gap-6">
                    {/* Logo */}
                    <button onClick={onLogoClick} className="flex items-center gap-2.5 flex-shrink-0 group">
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-extrabold text-[15px] shadow-[0_2px_8px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-shadow">
                            T
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-gray-900 font-extrabold text-[19px] tracking-[-0.02em]">
                                Tech<span className="text-blue-600">Pulse</span>
                            </span>
                        </div>
                    </button>

                    {/* Divider */}
                    <div className="hidden lg:block w-px h-6 bg-gray-200" />

                    {/* Nav Links */}
                    <nav className="hidden lg:flex items-center gap-0.5">
                        {CATEGORIES.slice(1).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat === activeCategory ? 'All' : cat)}
                                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Search */}
                    <div className={`hidden md:block transition-all duration-300 ${searchFocused ? 'w-72' : 'w-52'}`}>
                        <div className="relative group">
                            <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                placeholder="Cari artikel..."
                                className="w-full bg-gray-50/80 border border-gray-200/80 rounded-lg pl-9 pr-3 py-[7px] text-gray-900 text-[13px] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50 focus:bg-white transition-all"
                            />
                            {search && (
                                <button onClick={() => onSearchChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                                    <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onSubscribe}
                            className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-[7px] rounded-lg transition-all shadow-sm hover:shadow-md"
                        >
                            Subscribe
                        </button>
                        <button
                            onClick={onAdminLogin}
                            className="text-gray-400 hover:text-gray-700 text-[13px] font-medium px-3 py-[7px] rounded-lg transition-all hover:bg-gray-50"
                        >
                            Admin
                        </button>
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="lg:hidden text-gray-500 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                {mobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenu && (
                    <div className="lg:hidden border-t border-gray-100 py-4 space-y-3 animate-fadeInFast">
                        <div className="relative md:hidden">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Cari artikel..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button key={cat} onClick={() => { onCategoryChange(cat); setMobileMenu(false); }}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 border border-gray-200'
                                        }`}>{cat}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
