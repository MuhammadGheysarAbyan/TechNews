// app/admin/layout.tsx
import { redirect }       from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { AdminSidebar }   from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — TechPulse" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  if (!session?.user) redirect("/admin/login");

  const role = (session.user as any).role;
  if (!["ADMIN", "EDITOR", "WRITER"].includes(role)) redirect("/");

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <AdminSidebar user={session.user as any} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
