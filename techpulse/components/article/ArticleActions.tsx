// components/article/ArticleActions.tsx
"use client";
import { useState }  from "react";
import { useSession }from "next-auth/react";
import { toast }     from "react-hot-toast";
import { Heart, Bookmark, Share2, Twitter, Link2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  article: { id: string; likes: number; bookmarked: boolean };
}

export function ArticleActions({ article }: Props) {
  const { data: session } = useSession();
  const [liked,      setLiked]      = useState(false);
  const [bookmarked, setBookmarked] = useState(article.bookmarked);
  const [likeCount,  setLikeCount]  = useState(article.likes);
  const [shareOpen,  setShareOpen]  = useState(false);

  const toggleLike = async () => {
    if (!session) { toast.error("Login untuk menyukai artikel"); return; }
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    await fetch(`/api/articles/${article.id}/like`, { method: liked ? "DELETE" : "POST" }).catch(() => {});
  };

  const toggleBookmark = async () => {
    if (!session) { toast.error("Login untuk menyimpan artikel"); return; }
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Dihapus dari bookmark" : "Disimpan ke bookmark");
    await fetch(`/api/articles/${article.id}/bookmark`, { method: bookmarked ? "DELETE" : "POST" }).catch(() => {});
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link disalin!");
    setShareOpen(false);
  };

  return (
    <div className="flex items-center gap-3 mb-8 relative">
      <button onClick={toggleLike}
        className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
          liked ? "bg-red-500/20 border-red-500/40 text-red-400" : "border-white/20 text-gray-400 hover:border-red-500/40 hover:text-red-400")}>
        <Heart size={15} fill={liked ? "currentColor" : "none"} />
        {formatNumber(likeCount)} Suka
      </button>

      <button onClick={toggleBookmark}
        className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
          bookmarked ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "border-white/20 text-gray-400 hover:border-emerald-500/40 hover:text-emerald-400")}>
        <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />
        {bookmarked ? "Tersimpan" : "Simpan"}
      </button>

      <div className="ml-auto relative">
        <button onClick={() => setShareOpen(!shareOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 text-sm transition-all">
          <Share2 size={15} /> Bagikan
        </button>
        {shareOpen && (
          <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-white/10 rounded-xl p-2 space-y-1 min-w-[160px] z-10 shadow-xl">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-all">
              <Twitter size={14} /> Twitter / X
            </a>
            <button onClick={copyLink}
              className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-all">
              <Link2 size={14} /> Salin Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
