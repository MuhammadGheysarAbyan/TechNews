// app/admin/login/page.tsx
"use client";
import { useState }   from "react";
import { signIn }     from "next-auth/react";
import { useRouter }  from "next/navigation";
import { toast }      from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email:    form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success("Login berhasil!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Email atau password salah");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xl mx-auto mb-3">T</div>
          <h1 className="text-white font-black text-2xl">TechPulse</h1>
          <p className="text-gray-500 text-sm mt-1">Masuk ke panel admin</p>
        </div>

        {/* Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@techpulse.id" required
                  className="input w-full pl-9 pr-4 py-2.5 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type={show ? "text" : "password"} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••" required
                  className="input w-full pl-9 pr-10 py-2.5 text-sm" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-2.5 text-sm mt-2">
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-emerald-400 text-xs text-center font-medium">Demo Credentials</p>
            <p className="text-gray-400 text-xs text-center mt-0.5">admin@techpulse.id / Admin@12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
