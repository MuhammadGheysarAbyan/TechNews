'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import ArticleCard from '@/components/article/ArticleCard';

interface HeroSectionProps {
    heroArticles: Article[];
    trendingArticles: Article[];
    onSelectArticle: (article: Article) => void;
}

export default function HeroSection({ heroArticles, trendingArticles, onSelectArticle }: HeroSectionProps) {
    const [heroIndex, setHeroIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setHeroIndex((i) => (i + 1) % heroArticles.length);
                setIsTransitioning(false);
            }, 300);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroArticles.length]);

    const changeHero = (index: number) => {
        if (index === heroIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setHeroIndex(index);
            setIsTransitioning(false);
        }, 200);
    };

    return (
        <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Hero */}
                <div className="lg:col-span-8">
                    <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
                        <ArticleCard article={heroArticles[heroIndex]} onSelect={onSelectArticle} variant="hero" />
                    </div>

                    {/* Premium dots indicator */}
                    <div className="flex justify-center gap-2 mt-5">
                        {heroArticles.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => changeHero(i)}
                                className="group relative py-1"
                            >
                                <div
                                    className={`rounded-full transition-all duration-500 ${i === heroIndex
                                            ? 'bg-gradient-to-r from-accent-500 to-accent-400 w-8 h-[6px] shadow-sm shadow-accent-500/30'
                                            : 'bg-gray-300 w-[6px] h-[6px] group-hover:bg-accent-300 group-hover:w-4'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trending Sidebar */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-xl border border-gray-100/80 shadow-premium p-5 h-full relative overflow-hidden">
                        {/* Subtle gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-orange-500 to-red-400" />

                        <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-gray-100">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                                </svg>
                            </div>
                            <h3 className="text-gray-900 font-bold text-[13px] tracking-wide uppercase">
                                Trending Sekarang
                            </h3>
                            <div className="ml-auto flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                </span>
                                <span className="text-[10px] text-red-500 font-semibold">LIVE</span>
                            </div>
                        </div>

                        <div className="space-y-0">
                            {trendingArticles.slice(0, 5).map((a, i) => (
                                <div
                                    key={a.id}
                                    onClick={() => onSelectArticle(a)}
                                    className="group cursor-pointer flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 transition-all duration-300 rounded-lg hover:bg-accent-50/30 hover:px-2 -mx-0"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <span className="text-[22px] font-black text-gray-200 group-hover:text-accent-300 transition-all duration-300 leading-none select-none mt-0.5 tabular-nums w-7 text-right flex-shrink-0">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge category={a.category} />
                                        </div>
                                        <h4 className="text-gray-900 text-[13px] font-semibold group-hover:text-accent-600 transition-colors leading-snug line-clamp-2">
                                            {a.title}
                                        </h4>
                                        <p className="text-gray-400 text-[11px] mt-1 flex items-center gap-1.5">
                                            <span>{formatNumber(a.views)} views</span>
                                            <span className="text-gray-300">·</span>
                                            <span>{a.readTime}m baca</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
