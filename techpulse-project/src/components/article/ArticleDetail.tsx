'use client';

import { useState, useEffect } from 'react';
import { Article, ARTICLES } from '@/lib/data';
import { formatNumber, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import ReadingProgress from '@/components/ui/ReadingProgress';
import ArticleCard from '@/components/article/ArticleCard';

interface ArticleDetailProps {
    article: Article;
    onBack: () => void;
    onSelect: (article: Article) => void;
}

export default function ArticleDetail({ article, onBack, onSelect }: ArticleDetailProps) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'Reza Firmansyah', avatar: 'RF', text: 'Artikel yang sangat komprehensif! Ini akan berdampak besar pada industri.', time: '2 jam lalu', likes: 24, replies: [] as { id: number; user: string; avatar: string; text: string; time: string; likes: number }[] },
        {
            id: 2, user: 'Maya Putri', avatar: 'MP', text: 'Apakah ada informasi lebih lanjut tentang ketersediaan di Indonesia? Sangat menarik untuk diikuti perkembangannya.', time: '4 jam lalu', likes: 12, replies: [
                { id: 3, user: 'Dimas Pratama', avatar: 'DP', text: 'Kami akan menulis artikel follow-up tentang ini minggu depan, Maya! Stay tuned.', time: '3 jam lalu', likes: 8 },
            ]
        },
        { id: 4, user: 'Andi Kusuma', avatar: 'AK', text: 'Terima kasih TechPulse untuk analisis yang mendalam. Jarang ada media teknologi Indonesia yang menulis sekomprehensif ini.', time: '6 jam lalu', likes: 31, replies: [] },
    ]);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [copied, setCopied] = useState(false);

    const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
    const moreArticles = ARTICLES.filter((a) => a.id !== article.id && a.category !== article.category).slice(0, 4);

    const handleComment = () => {
        if (!comment.trim()) return;
        setComments([...comments, { id: Date.now(), user: 'Anda', avatar: 'AN', text: comment, time: 'Baru saja', likes: 0, replies: [] }]);
        setComment('');
    };

    useEffect(() => { window.scrollTo(0, 0); }, [article.id]);

    return (
        <>
            <ReadingProgress />
            <article className="animate-fadeIn">
                {/* Hero */}
                <div className="relative w-full h-[300px] md:h-[460px]">
                    <ImagePlaceholder type={article.image} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="max-w-[720px] mx-auto px-5 sm:px-0">
                    {/* White card overlap */}
                    <div className="-mt-20 relative z-10 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-7 sm:px-10 pt-8 pb-2">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-5">
                            <button onClick={onBack} className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                Beranda
                            </button>
                            <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            <span className="text-gray-500">{article.category}</span>
                        </div>

                        <Badge category={article.category} size="md" />
                        <h1 className="mt-4 text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-[1.15] font-display text-balance">{article.title}</h1>
                        <p className="mt-4 text-[17px] text-gray-500 leading-[1.7] font-serif italic">{article.excerpt}</p>

                        {/* Author + Meta */}
                        <div className="flex flex-wrap items-center gap-4 mt-7 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Avatar author={article.author} size="md" />
                                <div>
                                    <p className="text-gray-900 font-semibold text-[14px]">{article.author.name}</p>
                                    <p className="text-gray-400 text-[12px]">{article.author.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-[13px] ml-auto flex-wrap">
                                <span>{formatDate(article.publishedAt)}</span>
                                <span className="text-gray-200">|</span>
                                <span>{article.readTime} menit baca</span>
                                <span className="text-gray-200">|</span>
                                <span>{formatNumber(article.views)} pembaca</span>
                            </div>
                        </div>

                        {/* Action bar */}
                        <div className="flex items-center gap-2 py-4 border-b border-gray-100 flex-wrap">
                            <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg border text-[13px] font-medium transition-all ${liked ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50/50'}`}>
                                <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                {formatNumber(article.likes + (liked ? 1 : 0))}
                            </button>
                            <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg border text-[13px] font-medium transition-all ${bookmarked ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50'}`}>
                                <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                {bookmarked ? 'Tersimpan' : 'Simpan'}
                            </button>
                            <div className="ml-auto flex items-center gap-1.5">
                                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all" title="Twitter">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </button>
                                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all" title="LinkedIn">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </button>
                                <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className={`px-3 py-[7px] rounded-lg border text-[13px] font-medium transition-all ${copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                                    {copied ? '✓ Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="py-8">
                            {article.content.split('\n\n').map((para, i) => (
                                <p key={i} className="text-gray-700 leading-[1.9] mb-5 text-[16.5px] font-serif">{para}</p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pb-6 border-b border-gray-100">
                            {article.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200 text-gray-500 text-[12px] font-medium hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all">#{tag}</span>
                            ))}
                        </div>

                        {/* Author Bio */}
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 my-8 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <Avatar author={article.author} size="lg" />
                                <div>
                                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Penulis</p>
                                    <p className="text-gray-900 font-bold text-[15px]">{article.author.name}</p>
                                    <p className="text-blue-600 text-[13px] mb-2">{article.author.role}</p>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">{article.author.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments */}
                <div className="bg-gray-50 border-t border-gray-100 mt-6">
                    <div className="max-w-[720px] mx-auto px-5 sm:px-0 py-10">
                        <h3 className="text-gray-900 font-bold text-xl mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            {comments.reduce((a, c) => a + 1 + c.replies.length, 0)} Komentar
                        </h3>
                        <div className="flex gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-bold text-gray-500 flex-shrink-0">AN</div>
                            <div className="flex-1">
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tulis komentar Anda..."
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-[14px] resize-none focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50" rows={3} />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-400 text-[12px]">Markdown supported</p>
                                    <button onClick={handleComment} className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm">Kirim</button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            {comments.map((c) => (
                                <div key={c.id}>
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">{c.avatar}</div>
                                        <div className="flex-1">
                                            <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-gray-900 font-semibold text-[13px]">{c.user}</span>
                                                    <span className="text-gray-400 text-[11px]">{c.time}</span>
                                                </div>
                                                <p className="text-gray-600 text-[14px] leading-relaxed">{c.text}</p>
                                            </div>
                                            <div className="mt-1.5 ml-1 flex items-center gap-3 text-[12px]">
                                                <button className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                    {c.likes}
                                                </button>
                                                <button className="text-gray-400 hover:text-blue-500 transition-colors">Balas</button>
                                            </div>
                                        </div>
                                    </div>
                                    {c.replies.map((r) => (
                                        <div key={r.id} className="flex gap-3 mt-3 ml-12">
                                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{r.avatar}</div>
                                            <div className="flex-1">
                                                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-gray-900 font-semibold text-[12px]">{r.user}</span>
                                                        <span className="text-blue-500 text-[10px] font-medium">Penulis</span>
                                                        <span className="text-gray-400 text-[11px]">{r.time}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-[13px] leading-relaxed">{r.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 rounded-full bg-blue-600" />
                            <h3 className="text-gray-900 font-bold text-xl">Artikel Terkait</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {related.map((a) => <ArticleCard key={a.id} article={a} onSelect={onSelect} />)}
                        </div>
                    </div>
                )}

                {/* More */}
                {moreArticles.length > 0 && (
                    <div className="bg-gray-50 border-t border-gray-100">
                        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6 rounded-full bg-gray-300" />
                                <h3 className="text-gray-900 font-bold text-xl">Baca Juga</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {moreArticles.map((a) => <ArticleCard key={a.id} article={a} onSelect={onSelect} />)}
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
