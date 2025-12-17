"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminNavbar from "../../../components/nav/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !["admin"].includes(user.role))) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen px-6 py-6 bg-muted">
        {children}
      </main>
    </>
  );
}
