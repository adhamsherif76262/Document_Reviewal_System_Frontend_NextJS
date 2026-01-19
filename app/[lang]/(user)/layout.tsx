"use client";

import { useAuth } from "../../context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import UserNavbar from "../../../components/nav/UserNavbar";
import Footer from "../../../components/Footer";
import ScrollToTop from "../../../components/ScrollToTop";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { lang } = useParams();

  // useEffect(() => {
  //   if (!loading && (!user || user.role !== "user")) {
  //     router.replace("/login");
  //   }
  // }, [user, loading, router]);

  // if (loading || !user) return null;

      // 🔒 Redirect unauthorized users
    useEffect(() => {
      if (!loading && (!user || user.role !== "user")) {
        router.replace(`/${lang}/login`);
      }
    }, [user, loading, router, lang]);
  
    // 🛑 BLOCK render until auth is resolved
    if (loading || !user || user.role !== "user") {
      return <div className="min-h-screen bg-white" />;
    }

  return (
    <>
      <UserNavbar />  
      <main className="min-h-screen px-4 py-6">{children}</main>
      <ScrollToTop></ScrollToTop>
      {/* <Footer /> */}
    </>
  );
}
