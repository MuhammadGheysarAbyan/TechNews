// components/admin/AdminSidebar.tsx
"use client";
import Link         from "next/link";
import { usePathname } from "next/navigation";
import { signOut }   from "next-auth/react";
import { cn }        from "@/lib/utils";
import {
  LayoutDashboard, FileText, Users, Tag, Mail,
  Settings, LogOut, BarChart2, ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin",             label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/articles",    label: "Artikel",    icon: FileText },
  { href: "/admin/users",       label: "Users",      icon: Users },
  { href: "/admin/tags",        label: "Tags",       icon: Tag },
  { href: "/admin/newsletter",  label: "Newsletter", icon: Mail },
  { href: "/admin/analytics",   label: "Analytics",  icon: BarChart2 },
  { href: "/admin/settings",    label: "Settings",   icon: Settings },
];

interface Props {
  user: { name?: string | null; email?: string | null; role: string };
}

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-gray-950 border-r border-white/10 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">T</div>
          <div>
            <p className="text-white font-bold text-sm">TechPulse</p>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all",
                active
                  ? "bg-emerald-500/20 text-emerald-400 font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all">
          <ExternalLink size={14} /> Lihat Website
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={14} /> Keluar
        </button>
        <div className="px-3 py-2 mt-1">
          <p className="text-white text-xs font-medium truncate">{user.name}</p>
          <p className="text-gray-600 text-xs">{user.role}</p>
        </div>
      </div>
    </aside>
  );
}
