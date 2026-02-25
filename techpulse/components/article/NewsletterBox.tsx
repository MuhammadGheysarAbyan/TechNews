// components/article/NewsletterBox.tsx
"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Rss } from "lucide-react";

export function NewsletterBox() {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        toast.success("Berhasil subscribe! Cek inbox Anda.");
      } else {
        toast.error(data.error ?? "Gagal subscribe");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950/80 to-blue-950/80 border border-emerald-500/20 rounded-2xl p-8 text-center my-12">
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
        <Rss className="text-emerald-400" size={24} />
      </div>
      <h3 className="text-white font-bold text-xl mb-2">Stay Updated 📡</h3>
      <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
        Bergabung dengan 128.000+ pembaca yang mendapat ringkasan berita teknologi terbaik setiap hari.
      </p>
      {subscribed ? (
        <div className="text-emerald-400 font-semibold">✅ Terima kasih! Cek email Anda.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@anda.com" required
            className="flex-1 input px-4 py-2.5 text-sm"
          />
          <button type="submit" disabled={loading}
            className="btn-primary px-5 py-2.5 text-sm flex-shrink-0">
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      <p className="text-gray-600 text-xs mt-3">Gratis • Tanpa spam • Berhenti kapan saja</p>
    </div>
  );
}
