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
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass shadow-premium border-b border-white/40'
                    : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
                }`}
        >
            {/* Gradient bottom border on scroll */}
            {scrolled && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.3), rgba(0,204,255,0.2), rgba(0,102,255,0.3), transparent)',
                    }}
                />
            )}

            <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                <div className="h-[60px] flex items-center gap-6">
                    {/* Logo */}
                    <button onClick={onLogoClick} className="flex items-center gap-2.5 flex-shrink-0 group">
                        <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white font-extrabold text-[15px] shadow-glow-blue group-hover:shadow-glow-blue-lg transition-all duration-300 group-hover:scale-105">
                            T
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-gray-900 font-extrabold text-[19px] tracking-[-0.02em]">
                                Tech<span className="text-accent-500 group-hover:text-accent-600 transition-colors">Pulse</span>
                            </span>
                        </div>
                    </button>

                    {/* Divider */}
                    <div className="hidden lg:block w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                    {/* Nav Links */}
                    <nav className="hidden lg:flex items-center gap-0.5">
                        {CATEGORIES.slice(1).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat === activeCategory ? 'All' : cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-300 ripple ${activeCategory === cat
                                        ? 'bg-accent-500 text-white shadow-sm shadow-accent-500/25'
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
                    <div className={`hidden md:block transition-all duration-400 ${searchFocused ? 'w-80' : 'w-56'}`}>
                        <div className="relative group">
                            <svg
                                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-all duration-300 ${searchFocused ? 'text-accent-500 scale-110' : 'text-gray-400'
                                    }`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                placeholder="Cari artikel..."
                                className={`w-full border rounded-xl pl-10 pr-3 py-[8px] text-gray-900 text-[13px] placeholder-gray-400 transition-all duration-300 ${searchFocused
                                        ? 'bg-white border-accent-400 ring-[4px] ring-accent-50 shadow-sm'
                                        : 'bg-gray-50/80 border-gray-200/80 hover:border-gray-300'
                                    }`}
                            />
                            {search && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-accent-100 hover:text-accent-600 flex items-center justify-center transition-all duration-200"
                                >
                                    <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onSubscribe}
                            className="hidden sm:flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-[13px] font-semibold px-4 py-[8px] rounded-xl transition-all duration-300 shadow-sm hover:shadow-glow-blue ripple"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Subscribe
                        </button>
                        <button
                            onClick={onAdminLogin}
                            className="text-gray-400 hover:text-accent-500 text-[13px] font-medium px-3 py-[7px] rounded-lg transition-all duration-300 hover:bg-accent-50"
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
                    <div className="lg:hidden border-t border-gray-100 py-4 space-y-3 animate-slideDown">
                        <div className="relative md:hidden">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Cari artikel..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-50"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { onCategoryChange(cat); setMobileMenu(false); }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                                            ? 'bg-accent-500 text-white shadow-sm'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
