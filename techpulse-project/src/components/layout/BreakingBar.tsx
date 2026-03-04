'use client';

import { Article } from '@/lib/data';

interface BreakingBarProps {
    articles: Article[];
    onArticleClick: (article: Article) => void;
}

export default function BreakingBar({ articles, onArticleClick }: BreakingBarProps) {
    return (
        <div
            className="py-2.5 overflow-hidden relative"
            style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 30%, #f87171 60%, #ef4444 80%, #dc2626 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 6s ease infinite',
            }}
        >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap relative z-10">
                <span className="font-bold text-sm text-white ml-4 flex items-center gap-2 flex-shrink-0">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                    </span>
                    <span className="tracking-widest text-[11px] font-black uppercase">Breaking</span>
                </span>
                <div className="w-px h-4 bg-white/30 flex-shrink-0" />
                {[...articles, ...articles].map((a, i) => (
                    <span
                        key={`${a.id}-${i}`}
                        className="text-sm text-white/90 mx-4 cursor-pointer hover:text-white transition-all duration-200 flex-shrink-0 hover:underline underline-offset-2"
                        onClick={() => onArticleClick(a)}
                    >
                        {a.title}
                        <span className="mx-5 text-white/25 select-none">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
