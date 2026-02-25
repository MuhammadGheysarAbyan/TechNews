'use client';

import { useState } from 'react';

interface NewsletterSectionProps {
    onOpenModal: () => void;
}

export default function NewsletterSection({ onOpenModal }: NewsletterSectionProps) {
    const [email, setEmail] = useState('');

    return (
        <section className="mb-10">
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-8 sm:p-10 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Stay Updated</h2>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                    Bergabung dengan 128.000+ pembaca yang mendapatkan ringkasan berita teknologi terbaik setiap hari.
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@anda.com"
                        type="email"
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                    />
                    <button onClick={onOpenModal} className="bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors flex-shrink-0 shadow-sm">
                        Subscribe
                    </button>
                </div>
                <p className="text-gray-400 text-xs mt-3">Gratis · Tanpa spam · Berhenti berlangganan kapan saja</p>
            </div>
        </section>
    );
}
