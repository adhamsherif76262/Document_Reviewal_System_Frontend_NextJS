"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserNavbar from "../../../components/nav/UserNavbar";
import Footer from "../../../components/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "user")) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <UserNavbar />  
      <main className="min-h-screen px-4 py-6">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
