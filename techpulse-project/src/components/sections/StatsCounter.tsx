'use client';

import { useState, useEffect, useRef } from 'react';

interface StatItem {
    value: number;
    label: string;
    suffix: string;
    icon: React.ReactNode;
}

export default function StatsCounter() {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
    const ref = useRef<HTMLDivElement>(null);

    const stats: StatItem[] = [
        {
            value: 8,
            label: 'Artikel Berkualitas',
            suffix: '+',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
        },
        {
            value: 700,
            label: 'Pembaca Aktif',
            suffix: 'K+',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
        },
        {
            value: 6,
            label: 'Kategori Berita',
            suffix: '',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
            ),
        },
        {
            value: 24,
            label: 'Update Harian',
            suffix: '/7',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1500;
        const steps = 40;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = Math.min(step / steps, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map((s) => Math.round(s.value * eased)));

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <section ref={ref} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden bg-white rounded-xl border border-gray-100/80 p-5 text-center group hover:border-accent-200/60 transition-all duration-500 hover:shadow-premium ${isVisible ? 'animate-countUp' : 'opacity-0'
                            }`}
                        style={{ animationDelay: `${i * 120}ms` }}
                    >
                        {/* Gradient top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-400/0 via-accent-500/40 to-accent-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300 group-hover:shadow-glow-blue group-hover:scale-110">
                            {stat.icon}
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900 tabular-nums">
                            {counts[i]}{stat.suffix}
                        </p>
                        <p className="text-gray-400 text-[12px] mt-1 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
