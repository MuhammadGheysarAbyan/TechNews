// app/admin/page.tsx
import { db }            from "@/lib/db";
import { formatNumber }  from "@/lib/utils";
import { AdminChart }    from "@/components/admin/AdminChart";
import { FileText, Users, Eye, MessageCircle, TrendingUp, Mail } from "lucide-react";

async function getDashboardStats() {
  const [articles, users, comments, newsletters] = await Promise.all([
    db.article.count({ where: { status: "PUBLISHED" } }),
    db.user.count(),
    db.comment.count(),
    db.newsletter.count({ where: { isVerified: true } }),
  ]);

  const totalViews = await db.article.aggregate({ _sum: { views: true } });

  const topArticles = await db.article.findMany({
    where:   { status: "PUBLISHED" },
    select:  { id: true, title: true, views: true, slug: true, category: true },
    orderBy: { views: "desc" },
    take: 5,
  });

  const categoryDist = await db.article.groupBy({
    by:      ["category"],
    where:   { status: "PUBLISHED" },
    _count:  { category: true },
  });

  return { articles, users, comments, newsletters, totalViews: totalViews._sum.views ?? 0, topArticles, categoryDist };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Total Artikel",   value: formatNumber(stats.articles),              icon: FileText,      color: "emerald" },
    { label: "Total Users",     value: formatNumber(stats.users),                  icon: Users,         color: "blue" },
    { label: "Total Views",     value: formatNumber(stats.totalViews),             icon: Eye,           color: "purple" },
    { label: "Komentar",        value: formatNumber(stats.comments),               icon: MessageCircle, color: "orange" },
    { label: "Newsletter",      value: formatNumber(stats.newsletters),            icon: Mail,          color: "pink" },
    { label: "Trending Today",  value: "↑ 23%",                                    icon: TrendingUp,    color: "red" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
    orange:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
    pink:    "bg-pink-500/10 text-pink-400 border-pink-500/20",
    red:     "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-white font-bold text-2xl">Dashboard</h1>
        <p className="text-gray-500 text-sm">Selamat datang di panel admin TechPulse</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`card p-4 border ${colorMap[s.color]}`}>
              <Icon size={20} className="mb-3 opacity-80" />
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs opacity-70 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="card p-5">
        <h2 className="text-white font-semibold mb-4">Pageviews 12 Bulan Terakhir</h2>
        <AdminChart />
      </div>

      {/* Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">Artikel Terpopuler</h2>
          <div className="space-y-3">
            {stats.topArticles.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3">
                <span className="text-gray-700 font-mono text-sm w-5 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{a.title}</p>
                  <div className="mt-1 h-1.5 bg-white/10 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(a.views / (stats.topArticles[0]?.views || 1)) * 100}%` }} />
                  </div>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0">{formatNumber(a.views)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">Distribusi Kategori</h2>
          <div className="space-y-3">
            {stats.categoryDist.map((c) => {
              const pct = Math.round((c._count.category / stats.articles) * 100);
              return (
                <div key={c.category} className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs w-28 capitalize">{c.category.replace("_", " ")}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-gray-500 text-xs">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
