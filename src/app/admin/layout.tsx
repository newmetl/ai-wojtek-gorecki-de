// Admin Layout mit Auth-Guard — Wird in Schritt 4 implementiert
// Hier wird Session-Check via NextAuth eingebaut

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO Schritt 4: Session check via getServerSession(authOptions) + redirect
  return (
    <div className="flex min-h-screen bg-background">
      {/* AdminSidebar wird in Schritt 4 eingebunden */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
