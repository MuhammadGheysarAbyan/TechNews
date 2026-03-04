'use client';

import { useState } from 'react';
import { Article } from '@/lib/data';
import { formatNumber, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

interface ArticleCardProps {
    article: Article;
    onSelect: (article: Article) => void;
    variant?: 'default' | 'hero' | 'compact' | 'horizontal';
}

export default function ArticleCard({ article, onSelect, variant = 'default' }: ArticleCardProps) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(article.bookmarked);
    const [likeCount, setLikeCount] = useState(article.likes);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    // HERO
    if (variant === 'hero') {
        return (
            <div
                onClick={() => onSelect(article)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden h-[500px] flex flex-col justify-end shadow-premium-lg"
            >
                <ImagePlaceholder type={article.image} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {article.trending && (
                    <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg tracking-wide shadow-lg backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                        </span>
                        TRENDING
                    </div>
                )}

                <div className="relative z-10 p-7 sm:p-9">
                    <Badge category={article.category} />
                    <h2 className="mt-3 text-[28px] md:text-[34px] font-extrabold text-white leading-[1.15] group-hover:text-accent-200 transition-colors duration-300 line-clamp-3 font-display text-balance">
                        {article.title}
                    </h2>
                    <p className="mt-3 text-white/60 text-[15px] line-clamp-2 leading-relaxed max-w-xl">
                        {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/20">
                                {article.author.avatar}
                            </div>
                            <div>
                                <span className="text-white text-sm font-medium block leading-tight">{article.author.name}</span>
                                <span className="text-white/45 text-[11px]">{formatDate(article.publishedAt)}</span>
                            </div>
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden sm:block" />
                        <span className="text-white/45 text-xs hidden sm:block">{article.readTime} menit baca</span>
                        <span className="text-white/25 text-xs hidden sm:block">·</span>
                        <span className="text-white/45 text-xs hidden sm:block">{formatNumber(article.views)} views</span>
                    </div>
                </div>
            </div>
        );
    }

    // HORIZONTAL
    if (variant === 'horizontal') {
        return (
            <div
                onClick={() => onSelect(article)}
                className="group flex gap-5 cursor-pointer py-5 border-b border-gray-100/80 last:border-0 transition-all duration-300 hover:bg-accent-50/20 rounded-lg hover:px-3 -mx-0"
            >
                <div className="img-overlay">
                    <ImagePlaceholder type={article.image} className="w-[200px] h-[130px] rounded-xl flex-shrink-0 shadow-sm group-hover:shadow-premium transition-all duration-300" />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                    <div>
                        <Badge category={article.category} />
                        <h3 className="mt-1.5 font-bold text-gray-900 group-hover:text-accent-600 transition-colors line-clamp-2 leading-[1.35] text-[17px] font-display">
                            {article.title}
                        </h3>
                        <p className="mt-1.5 text-gray-500 text-[13px] line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-2.5 text-[12px] text-gray-400">
                        <span className="font-medium text-gray-600">{article.author.name}</span>
                        <span>·</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>·</span>
                        <span>{article.readTime}m baca</span>
                    </div>
                </div>
            </div>
        );
    }

    // COMPACT
    if (variant === 'compact') {
        return (
            <div
                onClick={() => onSelect(article)}
                className="group flex gap-3.5 cursor-pointer py-3.5 border-b border-gray-100/80 last:border-0 rounded-lg transition-all duration-300 hover:bg-accent-50/20"
            >
                <ImagePlaceholder type={article.image} className="w-20 h-[58px] rounded-lg flex-shrink-0" />
                <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-bold text-gray-900 group-hover:text-accent-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{article.readTime}m</span>
                        <span>·</span>
                        <span>{formatNumber(article.views)} views</span>
                    </div>
                </div>
            </div>
        );
    }

    // DEFAULT CARD — with premium enhancements
    return (
        <div
            onClick={() => onSelect(article)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden card-premium card-gradient-top border border-gray-100/80 hover:border-accent-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-premium-lg"
        >
            <div className="relative overflow-hidden img-overlay">
                <ImagePlaceholder type={article.image} className="h-[180px] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                {article.trending && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wide shadow-md">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                        </span>
                        TRENDING
                    </div>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${bookmarked
                            ? 'bg-accent-500 text-white shadow-glow-blue scale-110'
                            : 'bg-white/95 text-gray-400 hover:text-accent-500 shadow-sm hover:shadow-md hover:scale-105'
                        }`}
                >
                    <svg className="w-[14px] h-[14px]" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>

                {/* Reading time badge overlay */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    {article.readTime} min read
                </div>
            </div>

            <div className="p-4 pb-3.5">
                <div className="flex items-center gap-2 mb-2.5">
                    <Badge category={article.category} />
                    <span className="text-gray-300 text-[11px]">·</span>
                    <span className="text-gray-400 text-[11px]">{article.readTime} min</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-accent-600 transition-colors duration-300 line-clamp-2 leading-[1.35] text-[15px] font-display mb-1.5">
                    {article.title}
                </h3>
                <p className="text-gray-500 text-[13px] line-clamp-2 leading-[1.6]">
                    {article.excerpt}
                </p>
                <div className="mt-3.5 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Avatar author={article.author} size="sm" />
                        <div>
                            <p className="text-gray-800 text-[12px] font-semibold leading-tight">{article.author.name}</p>
                            <p className="text-gray-400 text-[11px] leading-tight">{formatDate(article.publishedAt)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1 transition-all duration-300 ${liked ? 'text-red-500 scale-110' : 'hover:text-red-400'}`}
                        >
                            <svg className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {formatNumber(likeCount)}
                        </button>
                        <span className="flex items-center gap-1 text-gray-300">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {article.comments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
