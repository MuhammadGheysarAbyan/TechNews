// components/admin/DeleteArticleButton.tsx
"use client";
import { useState }  from "react";
import { useRouter } from "next/navigation";
import { toast }     from "react-hot-toast";
import { Trash2 }    from "lucide-react";

export function DeleteArticleButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Yakin hapus artikel ini?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Artikel dihapus");
        router.refresh();
      } else {
        toast.error("Gagal menghapus");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}
      className="text-gray-500 hover:text-red-400 transition-colors disabled:opacity-50" title="Hapus">
      <Trash2 size={15} />
    </button>
  );
}
