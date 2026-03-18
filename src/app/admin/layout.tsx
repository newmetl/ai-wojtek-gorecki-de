// Auth wird via src/middleware.ts geschützt (alle /admin/* außer /admin/login)
// force-dynamic: Admin-Seiten greifen auf DB zu — kein statisches Prerendering beim Build
export const dynamic = "force-dynamic";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
