'use client';

import { Article } from '@/lib/data';

interface BreakingBarProps {
    articles: Article[];
    onArticleClick: (article: Article) => void;
}

export default function BreakingBar({ articles, onArticleClick }: BreakingBarProps) {
    return (
        <div className="bg-red-600 py-2 overflow-hidden">
            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
                <span className="font-bold text-sm text-white ml-4 flex items-center gap-2 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    BREAKING
                </span>
                {[...articles, ...articles].map((a, i) => (
                    <span
                        key={`${a.id}-${i}`}
                        className="text-sm text-white/90 mx-6 cursor-pointer hover:text-white hover:underline transition-colors flex-shrink-0"
                        onClick={() => onArticleClick(a)}
                    >
                        {a.title}
                        <span className="mx-6 text-white/30">|</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
