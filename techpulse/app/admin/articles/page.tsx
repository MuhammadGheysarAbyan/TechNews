// app/admin/articles/page.tsx
import Link  from "next/link";
import { db } from "@/lib/db";
import { formatDate, formatNumber } from "@/lib/utils";
import { Badge }  from "@/components/ui/Badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    include: { author: { select: { name: true } }, _count: { select: { comments: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-2xl">Artikel</h1>
          <p className="text-gray-500 text-sm">{articles.length} artikel total</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
          <Plus size={16} /> Artikel Baru
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Judul", "Kategori", "Penulis", "Status", "Views", "Komentar", "Tanggal", "Aksi"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-white text-sm font-medium truncate">{a.title}</p>
                    <p className="text-gray-600 text-xs truncate">/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3"><Badge category={a.category} /></td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">{a.author.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.status === "PUBLISHED"  ? "bg-emerald-500/20 text-emerald-400" :
                      a.status === "DRAFT"      ? "bg-yellow-500/20 text-yellow-400"  :
                      "bg-gray-500/20 text-gray-400"
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatNumber(a.views)}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{a._count.comments}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {a.publishedAt ? formatDate(a.publishedAt) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {a.status === "PUBLISHED" && (
                        <Link href={`/${a.slug}`} target="_blank"
                          className="text-gray-500 hover:text-blue-400 transition-colors" title="Lihat">
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link href={`/admin/articles/${a.id}/edit`}
                        className="text-gray-500 hover:text-emerald-400 transition-colors" title="Edit">
                        <Edit size={15} />
                      </Link>
                      <DeleteArticleButton id={a.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
