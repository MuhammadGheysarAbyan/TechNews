// components/article/CommentSection.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { formatRelative } from "@/lib/utils";
import { Heart, Reply, ChevronDown } from "lucide-react";

interface CommentUser {
  id: string; name: string; avatar: string | null;
}
interface Comment {
  id: string; content: string; createdAt: string;
  author: CommentUser; parentId: string | null;
  replies?: Comment[]; _count?: { likes: number };
}

interface Props {
  articleId: string;
  initialComments: Comment[];
}

export function CommentSection({ articleId, initialComments }: Props) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent]   = useState("");
  const [replyTo, setReplyTo]   = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const submitComment = async (parentId?: string) => {
    if (!content.trim()) return;
    if (!session) { toast.error("Login untuk berkomentar"); return; }

    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      });
      const data = await res.json();
      if (data.success) {
        if (!parentId) {
          setComments([data.data, ...comments]);
        } else {
          setComments(comments.map((c) =>
            c.id === parentId ? { ...c, replies: [...(c.replies ?? []), data.data] } : c
          ));
        }
        setContent("");
        setReplyTo(null);
        toast.success("Komentar berhasil dikirim");
      }
    } catch {
      toast.error("Gagal mengirim komentar");
    } finally {
      setLoading(false);
    }
  };

  const totalCount = comments.reduce((a, c) => a + 1 + (c.replies?.length ?? 0), 0);

  return (
    <section className="mt-12">
      <h2 className="text-white font-bold text-xl mb-6">
        💬 {totalCount} Komentar
      </h2>

      {/* Input */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
        {session ? (
          <>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {(session.user?.name ?? "U").slice(0, 2).toUpperCase()}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis komentar Anda..."
                rows={3}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button onClick={() => submitComment()} disabled={loading || !content.trim()}
                className="btn-primary px-5 py-2 text-sm disabled:opacity-50">
                {loading ? "Mengirim..." : "Kirim Komentar"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm text-center py-2">
            <a href="/admin/login" className="text-emerald-400 hover:underline">Login</a> untuk berkomentar
          </p>
        )}
      </div>

      {/* Comment list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={() => setReplyTo(comment.id)} />
        ))}
      </div>
    </section>
  );
}

function CommentItem({ comment, onReply, depth = 0 }: { comment: any; onReply: () => void; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className={depth > 0 ? "ml-10 border-l border-white/10 pl-4" : ""}>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {comment.author.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="bg-white/5 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-semibold text-sm">{comment.author.name}</span>
              <span className="text-gray-600 text-xs">{formatRelative(comment.createdAt)}</span>
            </div>
            <p className="text-gray-300 text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1.5 ml-2">
            <button onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-red-400" : "text-gray-600 hover:text-red-400"}`}>
              <Heart size={12} fill={liked ? "currentColor" : "none"} />
              {(comment._count?.likes ?? 0) + (liked ? 1 : 0)}
            </button>
            <button onClick={onReply} className="flex items-center gap-1 text-xs text-gray-600 hover:text-emerald-400 transition-colors">
              <Reply size={12} /> Balas
            </button>
          </div>
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-3 ml-12">
          <button onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-white mb-2 transition-colors">
            <ChevronDown size={12} className={showReplies ? "rotate-180" : ""} />
            {comment.replies.length} balasan
          </button>
          {showReplies && (
            <div className="space-y-4">
              {comment.replies.map((r: any) => (
                <CommentItem key={r.id} comment={r} onReply={onReply} depth={1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
