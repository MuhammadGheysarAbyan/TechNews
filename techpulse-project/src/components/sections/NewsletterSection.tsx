'use client';

import { useState } from 'react';

interface NewsletterSectionProps {
    onOpenModal: () => void;
}

export default function NewsletterSection({ onOpenModal }: NewsletterSectionProps) {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="mb-10">
            <div
                className="relative rounded-2xl p-8 sm:p-10 text-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 25%, #f0f9ff 50%, #ede9fe 75%, #eff6ff 100%)',
                }}
            >
                {/* Gradient mesh overlay */}
                <div className="absolute inset-0 gradient-mesh opacity-50" />

                {/* Glassmorphism card */}
                <div className="relative z-10 max-w-lg mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 flex items-center justify-center mx-auto mb-5 shadow-premium animate-float">
                        <svg className="w-7 h-7 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-1">Stay Updated</h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Bergabung dengan <span className="font-semibold text-accent-600">128.000+</span> pembaca yang mendapatkan ringkasan berita teknologi terbaik setiap hari.
                    </p>

                    <div className={`flex gap-3 max-w-md mx-auto transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="email@anda.com"
                            type="email"
                            className="flex-1 bg-white/90 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-accent-400 focus:ring-4 focus:ring-accent-100/50 shadow-sm transition-all duration-300"
                        />
                        <button
                            onClick={onOpenModal}
                            className="bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-glow-blue ripple"
                        >
                            Subscribe
                        </button>
                    </div>

                    <p className="text-gray-400 text-xs mt-4 flex items-center justify-center gap-3">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Gratis
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Tanpa spam
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Bisa berhenti
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}
