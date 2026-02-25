'use client';

import { useState } from 'react';
import { ARTICLES, CATEGORIES, AUTHORS, Article } from '@/lib/data';
import { formatNumber, formatDate } from '@/lib/utils';
import { AdminUser, getPermissions, RolePermissions, UserRole } from '@/lib/auth';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { useToast } from '@/components/ui/Toast';

interface AdminDashboardProps {
    user: Omit<AdminUser, 'password'>;
    onClose: () => void;
    onLogout: () => void;
}

type ViewMode = 'overview' | 'articles' | 'editor' | 'media' | 'users' | 'analytics' | 'settings';

export default function AdminDashboard({ user, onClose, onLogout }: AdminDashboardProps) {
    const { showToast } = useToast();
    const perms = getPermissions((user.roleKey || 'writer') as UserRole);
    const [activeTab, setActiveTab] = useState<ViewMode>(perms.canViewOverview ? 'overview' : 'articles');
    const [articles, setArticles] = useState(ARTICLES);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    // Editor state (WordPress-style)
    const [editorTitle, setEditorTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [editorExcerpt, setEditorExcerpt] = useState('');
    const [editorCategory, setEditorCategory] = useState('AI');
    const [editorTags, setEditorTags] = useState('');
    const [editorStatus, setEditorStatus] = useState('draft');
    const [editorVisibility, setEditorVisibility] = useState('public');
    const [editorSchedule, setEditorSchedule] = useState('');
    const [editorFeaturedImage, setEditorFeaturedImage] = useState('');
    const [editorSeoTitle, setEditorSeoTitle] = useState('');
    const [editorSeoDesc, setEditorSeoDesc] = useState('');
    const [editorSlug, setEditorSlug] = useState('');

    // Collapsible sidebar panels
    const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
        publish: true, category: true, tags: true, featured: true, excerpt: true, seo: false, slug: false,
    });
    const togglePanel = (key: string) => setOpenPanels({ ...openPanels, [key]: !openPanels[key] });

    const stats = [
        { label: 'Total Artikel', value: '847', change: '+12 bulan ini', icon: '📄' },
        { label: 'Pageviews', value: '2.4M', change: '+23% vs bulan lalu', icon: '👁' },
        { label: 'Users', value: '128K', change: '+8% vs bulan lalu', icon: '👥' },
        { label: 'Revenue', value: 'Rp 84jt', change: '+15% vs bulan lalu', icon: '💰' },
    ];

    const allTabs = [
        { id: 'overview', label: 'Overview', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { id: 'articles', label: user.roleKey === 'writer' ? 'Artikel Saya' : 'Semua Artikel', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { id: 'editor', label: 'Tambah Artikel', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> },
        { id: 'media', label: 'Media', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5zM18.75 3.75H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25z" /></svg> },
        { id: 'users', label: 'Users', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
        { id: 'analytics', label: 'Analytics', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
        { id: 'settings', label: 'Settings', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    ];
    const tabs = allTabs.filter((t) => perms.visibleTabs.includes(t.id));

    // Writer sees only own articles (by author name match)
    const visibleArticles = user.roleKey === 'writer' ? articles.filter((a) => a.author.name === user.name) : articles;

    const chartData = [45, 78, 52, 91, 67, 84, 96, 73, 88, 110, 95, 128];
    const maxVal = Math.max(...chartData);

    const openEditor = (article?: Article) => {
        if (article) {
            setEditingArticle(article);
            setEditorTitle(article.title);
            setEditorContent(article.content);
            setEditorExcerpt(article.excerpt);
            setEditorCategory(article.category);
            setEditorTags(article.tags.join(', '));
            setEditorStatus('published');
            setEditorFeaturedImage(article.image);
            setEditorSlug(article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
        } else {
            setEditingArticle(null);
            setEditorTitle('');
            setEditorContent('');
            setEditorExcerpt('');
            setEditorCategory('AI');
            setEditorTags('');
            setEditorStatus('draft');
            setEditorFeaturedImage('');
            setEditorSlug('');
        }
        setActiveTab('editor');
    };

    const handlePublish = () => {
        if (!editorTitle.trim()) { showToast('error', 'Judul artikel tidak boleh kosong'); return; }
        if (!editorContent.trim()) { showToast('error', 'Konten artikel tidak boleh kosong'); return; }
        if (editingArticle) {
            setArticles(articles.map((a) => a.id === editingArticle.id ? { ...a, title: editorTitle, content: editorContent, excerpt: editorExcerpt, category: editorCategory, tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean), image: editorFeaturedImage || a.image } : a));
            showToast('success', `Artikel "${editorTitle}" berhasil diperbarui`);
        } else {
            const newArticle: Article = { id: Date.now(), slug: editorSlug, title: editorTitle, excerpt: editorExcerpt || editorContent.slice(0, 150) + '...', content: editorContent, category: editorCategory, author: AUTHORS[0], readTime: Math.max(1, Math.ceil(editorContent.split(/\s+/).length / 200)), views: 0, likes: 0, comments: 0, tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean), featured: false, trending: false, image: editorFeaturedImage || 'ai', publishedAt: new Date().toISOString().split('T')[0], bookmarked: false };
            setArticles([newArticle, ...articles]);
            showToast('success', `Artikel "${editorTitle}" berhasil diterbitkan!`);
        }
        setActiveTab('articles');
    };

    const handleSaveDraft = () => {
        if (!editorTitle.trim()) { showToast('error', 'Judul artikel tidak boleh kosong'); return; }
        showToast('info', `Draft "${editorTitle}" berhasil disimpan`);
    };

    const handleDeleteArticle = (article: Article) => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${article.title}"?\n\nTindakan ini tidak bisa dibatalkan.`)) {
            setArticles(articles.filter((a) => a.id !== article.id));
            showToast('success', `Artikel "${article.title}" berhasil dihapus`);
        }
    };

    // ── Sidebar Panel Component ──
    const SidebarPanel = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button onClick={() => togglePanel(id)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200">
                <span className="text-[13px] font-semibold text-gray-700">{title}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${openPanels[id] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openPanels[id] && <div className="p-4">{children}</div>}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-[#f0f0f1] z-50 flex overflow-hidden animate-fadeIn">
            {/* ── WordPress-style Sidebar ── */}
            <div className="w-[220px] bg-[#1d2327] flex flex-col flex-shrink-0">
                <div className="px-4 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">T</div>
                        <div>
                            <p className="text-white font-bold text-[13px]">TechPulse</p>
                            <p className="text-gray-500 text-[11px]">Admin Panel</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 py-2 overflow-auto">
                    {tabs.map((t) => (
                        <button key={t.id} onClick={() => setActiveTab(t.id as ViewMode)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-all ${activeTab === t.id
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </nav>
                <div className="p-3 border-t border-white/10 space-y-1">
                    <button onClick={onClose} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        Kembali ke Website
                    </button>
                    <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                        Keluar
                    </button>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="flex-1 overflow-auto">
                {/* Top bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <h1 className="text-gray-900 font-bold text-[15px]">
                            {activeTab === 'editor'
                                ? (editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru')
                                : tabs.find((t) => t.id === activeTab)?.label}
                        </h1>
                        {activeTab === 'articles' && (
                            <button onClick={() => openEditor()} className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded transition-colors ml-2">
                                + Tambah Baru
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <span className="text-gray-700 text-[12px] font-medium block leading-tight">{user.name}</span>
                            <span className="text-gray-400 text-[10px]">{user.role}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white">{user.avatar}</div>
                    </div>
                </div>

                <div className="p-6">

                    {/* ══════════════════ WORDPRESS-STYLE EDITOR ══════════════════ */}
                    {activeTab === 'editor' && (
                        <div className="flex gap-5 items-start animate-fadeIn">
                            {/* ── Left: Main Content Area ── */}
                            <div className="flex-1 min-w-0 space-y-4">
                                {/* Title */}
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <input
                                        value={editorTitle}
                                        onChange={(e) => {
                                            setEditorTitle(e.target.value);
                                            setEditorSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                                        }}
                                        placeholder="Masukkan judul di sini"
                                        className="w-full px-5 py-4 text-[22px] font-bold text-gray-900 placeholder-gray-300 focus:outline-none border-0"
                                    />
                                    {editorTitle && (
                                        <div className="px-5 pb-3 flex items-center gap-1.5 text-[12px] text-gray-400">
                                            <span>Permalink:</span>
                                            <span className="text-blue-600">https://techpulse.id/artikel/</span>
                                            <input
                                                value={editorSlug}
                                                onChange={(e) => setEditorSlug(e.target.value)}
                                                className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-[12px] text-gray-700 focus:outline-none focus:border-blue-400 max-w-xs"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Content Editor Toolbar */}
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    {/* Toolbar */}
                                    <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex items-center gap-1 flex-wrap">
                                        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
                                            {[
                                                { icon: 'B', style: 'font-bold' },
                                                { icon: 'I', style: 'italic' },
                                                { icon: 'U', style: 'underline' },
                                                { icon: 'S', style: 'line-through' },
                                            ].map((btn) => (
                                                <button key={btn.icon} className={`w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-600 text-[13px] ${btn.style} transition-colors`}>
                                                    {btn.icon}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
                                            {/* Heading dropdown */}
                                            <select className="h-7 bg-transparent border border-gray-200 rounded px-1.5 text-[11px] text-gray-600 focus:outline-none focus:border-blue-400 cursor-pointer">
                                                <option>Paragraf</option>
                                                <option>Heading 1</option>
                                                <option>Heading 2</option>
                                                <option>Heading 3</option>
                                                <option>Heading 4</option>
                                                <option>Preformatted</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
                                            {/* List buttons */}
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Unordered List">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                                            </button>
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Ordered List">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                            </button>
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Blockquote">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6a1 1 0 011-1zm0-4h18" /></svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
                                            {/* Align */}
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Align Left">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h18" /></svg>
                                            </button>
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Align Center">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M3 18h18" /></svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Insert Link">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </button>
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Add Media">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" /></svg>
                                            </button>
                                            <button className="w-7 h-7 rounded hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" title="Code">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                                            </button>
                                        </div>
                                        <div className="ml-auto flex items-center gap-1">
                                            <button className="px-2 py-1 rounded text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">Visual</button>
                                            <button className="px-2 py-1 rounded text-[11px] font-medium text-gray-500 hover:bg-gray-200 transition-colors">Teks</button>
                                        </div>
                                    </div>

                                    {/* Editor Area */}
                                    <textarea
                                        value={editorContent}
                                        onChange={(e) => setEditorContent(e.target.value)}
                                        placeholder="Tulis konten artikel Anda di sini...

Anda bisa menulis dengan format HTML atau teks biasa. Gunakan toolbar di atas untuk memformat teks, menambahkan gambar, link, dan lainnya.

Tips:
• Gunakan heading (H2, H3) untuk struktur yang jelas
• Tambahkan gambar untuk memperkaya konten
• Sertakan link ke sumber referensi"
                                        className="w-full min-h-[420px] px-5 py-4 text-[15px] text-gray-700 placeholder-gray-300 focus:outline-none resize-y leading-[1.75] font-serif"
                                    />

                                    {/* Word count bar */}
                                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between text-[11px] text-gray-400">
                                        <span>Jumlah kata: {editorContent.split(/\s+/).filter(Boolean).length}</span>
                                        <span>Terakhir disimpan: Draft</span>
                                    </div>
                                </div>
                            </div>

                            {/* ── Right: WordPress-style Sidebar Panels ── */}
                            <div className="w-[300px] flex-shrink-0 space-y-4">

                                {/* Publish Panel */}
                                <SidebarPanel id="publish" title="Terbitkan">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <button onClick={handleSaveDraft} className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">Simpan Draft</button>
                                            <button onClick={() => showToast('info', 'Pratinjau artikel dibuka di tab baru')} className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">Pratinjau</button>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 space-y-2.5">
                                            <div className="flex items-center gap-2 text-[13px]">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
                                                <span className="text-gray-600">Status: </span>
                                                <select value={editorStatus} onChange={(e) => setEditorStatus(e.target.value)} className="text-[13px] border border-gray-200 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-400 bg-white">
                                                    <option value="draft">Draft</option>
                                                    <option value="pending">Pending Review</option>
                                                    {perms.canPublish && <option value="published">Published</option>}
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px]">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                <span className="text-gray-600">Visibilitas: </span>
                                                <select value={editorVisibility} onChange={(e) => setEditorVisibility(e.target.value)} className="text-[13px] border border-gray-200 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-400 bg-white">
                                                    <option value="public">Publik</option>
                                                    <option value="private">Privat</option>
                                                    <option value="password">Dilindungi Password</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px]">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                                                <span className="text-gray-600">Jadwal: </span>
                                                <input type="datetime-local" value={editorSchedule} onChange={(e) => setEditorSchedule(e.target.value)} className="text-[12px] border border-gray-200 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-400 bg-white" />
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                                            {editingArticle && perms.canDeleteArticle && (
                                                <button onClick={() => handleDeleteArticle(editingArticle)} className="text-[12px] text-red-500 hover:text-red-600 font-medium">Pindah ke Sampah</button>
                                            )}
                                            <button onClick={handlePublish} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2 rounded transition-colors shadow-sm">
                                                {!perms.canPublish ? 'Kirim untuk Review' : (editorStatus === 'published' ? 'Perbarui' : 'Terbitkan')}
                                            </button>
                                            {!perms.canPublish && <p className="text-[10px] text-amber-600 mt-1">Writer hanya bisa mengirim untuk review</p>}
                                        </div>
                                    </div>
                                </SidebarPanel>

                                {/* Kategori Panel */}
                                <SidebarPanel id="category" title="Kategori">
                                    <div className="space-y-2 max-h-40 overflow-auto">
                                        {['AI', 'Programming', 'Gadget', 'Startup', 'Cyber Security'].map((cat) => (
                                            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={editorCategory === cat}
                                                    onChange={() => setEditorCategory(cat)}
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button className="mt-3 text-[12px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                        Tambah Kategori Baru
                                    </button>
                                </SidebarPanel>

                                {/* Tag Panel */}
                                <SidebarPanel id="tags" title="Tag">
                                    <div className="space-y-2.5">
                                        <div className="flex gap-2">
                                            <input
                                                value={editorTags}
                                                onChange={(e) => setEditorTags(e.target.value)}
                                                placeholder="Tambah tag"
                                                className="flex-1 bg-white border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                            />
                                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[12px] font-medium px-3 py-1.5 rounded transition-colors border border-gray-200">Tambah</button>
                                        </div>
                                        {editorTags && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {editorTags.split(',').map((tag, i) => tag.trim() && (
                                                    <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded">
                                                        {tag.trim()}
                                                        <button onClick={() => setEditorTags(editorTags.split(',').filter((_, j) => j !== i).join(', '))} className="text-gray-400 hover:text-red-500 text-[10px] ml-0.5">✕</button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-[11px] text-gray-400">Pisahkan tag dengan koma</p>
                                    </div>
                                </SidebarPanel>

                                {/* Featured Image Panel */}
                                <SidebarPanel id="featured" title="Gambar Unggulan">
                                    {editorFeaturedImage ? (
                                        <div className="space-y-2">
                                            <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                                <ImagePlaceholder type={editorFeaturedImage} className="w-full h-36" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">Ganti Gambar</button>
                                                <button onClick={() => setEditorFeaturedImage('')} className="text-[12px] text-red-500 hover:text-red-600 font-medium">Hapus</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button onClick={() => setEditorFeaturedImage('ai')} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 flex flex-col items-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
                                            <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5zM18.75 3.75H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25z" /></svg>
                                            <span className="text-[12px] text-gray-400 group-hover:text-blue-500 font-medium">Atur Gambar Unggulan</span>
                                        </button>
                                    )}
                                </SidebarPanel>

                                {/* Excerpt Panel */}
                                <SidebarPanel id="excerpt" title="Kutipan (Excerpt)">
                                    <textarea
                                        value={editorExcerpt}
                                        onChange={(e) => setEditorExcerpt(e.target.value)}
                                        placeholder="Tulis ringkasan singkat artikel ini..."
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                                        rows={3}
                                    />
                                    <p className="text-[11px] text-gray-400 mt-1.5">Kutipan ditampilkan di halaman pencarian dan media sosial.</p>
                                </SidebarPanel>

                                {/* SEO Panel (collapsed by default) */}
                                <SidebarPanel id="seo" title="SEO & Meta">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[12px] text-gray-500 block mb-1 font-medium">SEO Title</label>
                                            <input value={editorSeoTitle || editorTitle} onChange={(e) => setEditorSeoTitle(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-blue-400" />
                                            <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all ${(editorSeoTitle || editorTitle).length > 60 ? 'bg-red-400' : (editorSeoTitle || editorTitle).length > 40 ? 'bg-green-400' : 'bg-yellow-400'}`} style={{ width: `${Math.min(((editorSeoTitle || editorTitle).length / 70) * 100, 100)}%` }} />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{(editorSeoTitle || editorTitle).length}/70 karakter</p>
                                        </div>
                                        <div>
                                            <label className="text-[12px] text-gray-500 block mb-1 font-medium">Meta Description</label>
                                            <textarea value={editorSeoDesc || editorExcerpt} onChange={(e) => setEditorSeoDesc(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-blue-400 resize-none" rows={2} />
                                            <p className="text-[10px] text-gray-400 mt-0.5">{(editorSeoDesc || editorExcerpt).length}/160 karakter</p>
                                        </div>
                                        {/* Google Preview */}
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                            <p className="text-[10px] text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Preview Google</p>
                                            <p className="text-[14px] text-blue-700 font-medium leading-tight line-clamp-1">{editorSeoTitle || editorTitle || 'Judul Artikel'}</p>
                                            <p className="text-[11px] text-green-700 mt-0.5">techpulse.id › artikel › {editorSlug || 'slug-artikel'}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{editorSeoDesc || editorExcerpt || 'Meta description artikel akan tampil di sini...'}</p>
                                        </div>
                                    </div>
                                </SidebarPanel>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════ OVERVIEW ══════════════════ */}
                    {activeTab === 'overview' && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((s) => (
                                    <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="text-2xl mb-2">{s.icon}</div>
                                        <p className="text-[24px] font-black text-gray-900">{s.value}</p>
                                        <p className="text-gray-500 text-[12px] mt-1">{s.label}</p>
                                        <p className="text-green-600 text-[11px] mt-1 font-medium">{s.change}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-900 font-semibold text-[14px]">Pageviews 12 Bulan</h3>
                                    <span className="text-green-600 text-[11px] font-semibold bg-green-50 px-2.5 py-1 rounded border border-green-200">+23%</span>
                                </div>
                                <div className="flex items-end gap-2 h-32">
                                    {chartData.map((v, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                            <div className="w-full bg-blue-500 hover:bg-blue-400 rounded-t cursor-pointer transition-colors" style={{ height: `${(v / maxVal) * 100}%` }} />
                                            <span className="text-gray-400 text-[9px]">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="text-gray-900 font-semibold text-[14px] mb-4">Artikel Terbaru</h3>
                                <div className="space-y-2.5">
                                    {articles.slice(0, 5).map((a) => (
                                        <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => openEditor(a)}>
                                            <ImagePlaceholder type={a.image} className="w-12 h-10 rounded flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-900 text-[13px] font-medium truncate">{a.title}</p>
                                                <p className="text-gray-400 text-[11px]">{a.author.name} · {formatDate(a.publishedAt)}</p>
                                            </div>
                                            <span className="text-green-600 text-[11px] font-medium bg-green-50 px-2 py-0.5 rounded border border-green-200 flex-shrink-0">Published</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════ ARTICLES LIST ══════════════════ */}
                    {activeTab === 'articles' && (
                        <div className="space-y-4 animate-fadeIn">
                            {user.roleKey === 'writer' && (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[13px] flex items-center gap-2">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                                    Anda melihat artikel milik Anda saja. Untuk melihat semua artikel, hubungi administrator.
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[13px]">
                                    <button className="text-gray-900 font-medium">Semua <span className="text-gray-400">({visibleArticles.length})</span></button>
                                    <span className="text-gray-300 mx-1">|</span>
                                    <button className="text-blue-600 hover:text-blue-700">Published <span className="text-gray-400">({visibleArticles.length})</span></button>
                                    <span className="text-gray-300 mx-1">|</span>
                                    <button className="text-blue-600 hover:text-blue-700">Draft <span className="text-gray-400">(0)</span></button>
                                </div>
                                <div className="ml-auto">
                                    <input placeholder="Cari artikel..." className="bg-white border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 w-56" />
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600 w-8"><input type="checkbox" className="rounded border-gray-300" /></th>
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600">Judul</th>
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600">Penulis</th>
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600">Kategori</th>
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600">Views</th>
                                            <th className="text-left px-4 py-2.5 text-[12px] font-semibold text-gray-600">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {visibleArticles.map((a) => (
                                            <tr key={a.id} className="hover:bg-blue-50/50 transition-colors group">
                                                <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300" /></td>
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <button onClick={() => openEditor(a)} className="text-[13px] font-semibold text-blue-700 hover:text-blue-800 text-left line-clamp-1 block">{a.title}</button>
                                                        <div className="flex items-center gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-[11px]">
                                                            {(perms.canEditAnyArticle || (perms.canEditOwnArticle && a.author.name === user.name)) && (
                                                                <><button onClick={() => openEditor(a)} className="text-blue-600 hover:text-blue-700">Edit</button><span className="text-gray-300">|</span></>
                                                            )}
                                                            {perms.canDeleteArticle && (
                                                                <><button onClick={() => handleDeleteArticle(a)} className="text-red-500 hover:text-red-600">Sampah</button><span className="text-gray-300">|</span></>
                                                            )}
                                                            <button onClick={() => showToast('info', 'Membuka pratinjau artikel...')} className="text-gray-500 hover:text-gray-700">Lihat</button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-[13px] text-gray-600">{a.author.name}</td>
                                                <td className="px-4 py-3"><Badge category={a.category} /></td>
                                                <td className="px-4 py-3 text-[13px] text-gray-600">{formatNumber(a.views)}</td>
                                                <td className="px-4 py-3">
                                                    <p className="text-[12px] text-gray-600">Published</p>
                                                    <p className="text-[11px] text-gray-400">{formatDate(a.publishedAt)}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════ USERS ══════════════════ */}
                    {activeTab === 'users' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="grid grid-cols-3 gap-4">
                                {[{ role: 'Admin', count: 3 }, { role: 'Editor', count: 12 }, { role: 'Writer', count: 47 }].map(({ role, count }) => (
                                    <div key={role} className="bg-white border border-gray-200 rounded-lg p-5 text-center hover:shadow-md transition-shadow">
                                        <p className="text-blue-600 font-black text-[28px]">{count}</p>
                                        <p className="text-gray-500 text-[13px] mt-1">{role}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="text-gray-900 font-semibold text-[14px] mb-4">Daftar User</h3>
                                <div className="space-y-2.5">
                                    {AUTHORS.map((a) => (
                                        <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Avatar author={a} size="md" />
                                            <div className="flex-1"><p className="text-gray-900 font-medium text-[13px]">{a.name}</p><p className="text-gray-400 text-[12px]">{a.role}</p></div>
                                            <span className="px-2.5 py-1 rounded text-blue-700 text-[11px] bg-blue-50 border border-blue-200 font-medium">Editor</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════ ANALYTICS ══════════════════ */}
                    {activeTab === 'analytics' && (
                        <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="text-gray-900 font-semibold text-[14px] mb-4">Artikel Terpopuler</h3>
                                <div className="space-y-3">
                                    {[...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5).map((a, i) => (
                                        <div key={a.id} className="flex items-center gap-3">
                                            <span className="text-gray-300 font-mono text-[13px] w-4">{i + 1}</span>
                                            <div className="flex-1 min-w-0"><p className="text-gray-900 text-[12px] truncate">{a.title}</p>
                                                <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${(a.views / 187650) * 100}%` }} /></div>
                                            </div>
                                            <span className="text-gray-400 text-[12px] flex-shrink-0">{formatNumber(a.views)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="text-gray-900 font-semibold text-[14px] mb-4">Distribusi Kategori</h3>
                                <div className="space-y-3">
                                    {CATEGORIES.slice(1).map((cat) => {
                                        const count = ARTICLES.filter((a) => a.category === cat).length;
                                        const pct = Math.round((count / ARTICLES.length) * 100);
                                        return (
                                            <div key={cat} className="flex items-center gap-3">
                                                <span className="text-gray-600 text-[12px] w-28">{cat}</span>
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-400 rounded-full" style={{ width: `${pct}%` }} /></div>
                                                <span className="text-gray-400 text-[12px]">{pct}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* ══════════════════ MEDIA LIBRARY ══════════════════ */}
                    {activeTab === 'media' && (
                        <div className="space-y-4 animate-fadeIn">
                            {perms.canManageMedia ? (
                                <button className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-4 py-2 rounded transition-colors">+ Upload Media Baru</button>
                            ) : (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[13px]">Anda hanya bisa melihat media. Untuk mengelola, hubungi editor atau admin.</div>
                            )}
                            <div className="grid grid-cols-4 gap-3">
                                {['ai', 'gadget', 'startup', 'security', 'code', 'nvidia', 'react', 'ai'].map((img, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                                        <ImagePlaceholder type={img} className="w-full h-28" />
                                        <div className="p-2 bg-white">
                                            <p className="text-[11px] text-gray-600 truncate">{img}-image-{i + 1}.jpg</p>
                                            <p className="text-[10px] text-gray-400">1200 × 800</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══════════════════ SETTINGS ══════════════════ */}
                    {activeTab === 'settings' && (
                        <div className="max-w-lg space-y-4 animate-fadeIn">
                            {[{ label: 'Nama Website', value: 'TechPulse' }, { label: 'Tagline', value: 'Berita Teknologi Terdepan Indonesia' }, { label: 'Email Admin', value: 'admin@techpulse.id' }, { label: 'Google Analytics ID', value: 'G-XXXXXXXXXX' }].map((f) => (
                                <div key={f.label} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <label className="text-gray-600 text-[12px] mb-1.5 block font-medium">{f.label}</label>
                                    <input defaultValue={f.value} className="w-full border border-gray-200 rounded px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100" />
                                </div>
                            ))}
                            <button onClick={() => showToast('success', 'Pengaturan berhasil disimpan!')} className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded transition-colors shadow-sm">Simpan Pengaturan</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
