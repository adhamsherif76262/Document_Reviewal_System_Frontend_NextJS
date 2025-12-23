"use client";

import { useAuth } from "../../context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AdminNavbar from "../../../components/nav/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const {lang} = useParams()

  // useEffect(() => {
  //   if (!loading && (!user || !["admin"].includes(user.role))) {
  //     router.replace("/login");
  //   }
  // }, [user, loading, router]);

  // if (loading || !user) return null;

    // 🔒 Redirect unauthorized users
  // useEffect(() => {
  //   if (!loading && (!user || user.role !== "admin")) {
  //     router.replace(`/${lang}/login`);
  //   }
  // }, [user, loading, router, lang]);

  // // 🛑 BLOCK render until auth is resolved
  // if (loading || !user || user.role !== "admin") {
  //   return <div className="min-h-screen bg-white" />;
  // }

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading) return null;
  if (!user) return null;


  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen px-6 py-6 bg-muted">
        {children}
      </main>
    </>
  );
}

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <div /> // or spinner
//   }

//   if (!user || user.role !== "admin") {
//     return <Unauthorized /> // or redirect
//   }

//   return (
//     <>
//       <AdminNavbar />
//       <main>{children}</main>
//     </>
//   )
// }


// function Unauthorized() {
//   const router = useRouter()

//   useEffect(() => {
//     router.replace("/login")
//   }, [router])

//   return null
// }