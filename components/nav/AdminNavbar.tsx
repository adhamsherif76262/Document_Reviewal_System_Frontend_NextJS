// "use client";

// import Link from "next/link";
// import { useAuth } from "../../app/context/AuthContext";
// import { useParams, useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import MorphingTypography from "../LangSwitchers/MorphingTypography";

// export default function AdminNavbar() {
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const { lang } = useParams();

//   if (!user) return null;

//     const initials =
//     user.name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase() || "U";
  
//     const handleLogout = async () => {
//     await logout(user.email);
//     router.push(`/${lang}/login`);
//   };
//   const isSuperAdmin = user.adminLevel === "super";

//   return (
//     <nav className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
//       <MorphingTypography></MorphingTypography>
//       {/* LEFT */}
//       <div className="flex items-center gap-6">
//         <Link href={`/${lang}`} className="font-bold text-lg">
//           Admin Panel
//         </Link>

//         <Link href={`/${lang}/dashboard`} className="nav-link">
//           Dashboard
//         </Link>

//         {/* DOCUMENTS */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost">Documents</Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem asChild>
//               <Link href={`/${lang}/documents`}>All Documents</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href="/documents/pending">Pending Reviews</Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* USERS */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost">Users</Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem asChild>
//               <Link href={`/${lang}/users`}>All Users</Link>
//             </DropdownMenuItem>

//             {isSuperAdmin && (
//               <DropdownMenuItem asChild>
//                 <Link href={`/${lang}/admins`}>All Admins</Link>
//               </DropdownMenuItem>
//             )}

//             <DropdownMenuItem asChild>
//               <Link href={`/${lang}/generateInviteCode`}>Generate Invite Code</Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* LOGS */}
//         {isSuperAdmin && (
//           <Link href={`/${lang}/logs`} className="nav-link">
//             Logs
//           </Link>
//         )}
//       </div>

//       {/* RIGHT */}
//       {/* <div className="flex items-center gap-4">
//         <span className="text-sm text-muted-foreground">
//           {user.name}
//         </span>

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={async () => {
//             await logout(user.email);
//             router.replace("/login");
//           }}
//         >
//           Logout
//         </Button>
//       </div> */}
//                 <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar className="cursor-pointer">
//                 <AvatarFallback>{initials}</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-auto">
//               <div className="px-3 py-2">
//                 <p className="text-sm font-medium">{user.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {user.email}
//                 </p>
//               </div>

//               <DropdownMenuSeparator />

//               {/* Expiry */}
//               {user.adminLevel && (
//                 <DropdownMenuItem disabled>
//                   Admin Level : {user.adminLevel}
//                   {/* Expires:{" "}
//                   {new Date(user.expiryDate).toLocaleDateString()} */}
//                 </DropdownMenuItem>
//               )}

//               <DropdownMenuSeparator />

//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="text-red-600 focus:text-red-600"
//               >
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//     </nav>
//   );
// }


"use client"

import { useState , useEffect, useRef} from "react"
import { Menu, X, ChevronDown, LogOut, Clock } from "lucide-react"
import MorphingTypography from "../../components/LangSwitchers/MorphingTypography"
import Link from "next/link"
import { useAuth } from "../../app/context/AuthContext"
import { useParams ,usePathname,useRouter } from "next/navigation"
import Image from "next/image"
import { ParamValue } from "next/dist/server/request/params"

// interface MagneticCardNavbarProps {
//   userName?: string
//   userEmail?: string
//   userAvatar?: string
//   expiryDate?: string
//   onLogout?: () => void
// }

export default function MagneticCardNavbar() {
    const { user, logout , loading } = useAuth();
  const router = useRouter();
  const { lang } = useParams();
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentLanguage,] = useState<ParamValue>(lang)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if(pathname.includes("userAccountMangement")){
        document.body.getElementsByTagName("nav").item(0)?.classList.add("fixed")
      }
  if (isMenuOpen) {
    // Lock scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); 
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none" // mobile Safari fix
  } else {
    // Restore scroll
    // if(pathname.includes("userAccountMangement")){
    //   document.body.getElementsByTagName("nav").item(0)?.classList.add("fixed")
    // }
    document.body.style.overflow = "visible"
    document.body.style.touchAction = "auto"
  }
  
  return () => {
    // Cleanup on unmount
    if(pathname.includes("userAccountMangement")){

      document.body.getElementsByTagName("nav").item(0)?.classList.add("relative")
    }
    // else{
    //   document.body.getElementsByTagName("nav").item(0)?.classList.add("relative")
    // }
    // document.body.getElementsByTagName("nav").item(0)?.classList.add("mb-10")
    document.body.style.overflow = "visible"
    document.body.style.touchAction = "auto"
  }
}, [isMenuOpen , pathname])

const closeMenu = () => {
  setIsMenuOpen(false)
}

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserMenuOpen(false)
    }
  }

  if (isUserMenuOpen) {
    document.addEventListener("mousedown", handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [isUserMenuOpen])

  // if (loading ) return null;
  // if (!user) return null;


if (loading) {
  return (
    <nav className="h-24 bg-zinc-950 border-b border-zinc-800" />
  );
}

if (!user) {
  return null;
}


    // const initials =
    // user.name
    //   ?.split(" ")
    //   .map((n) => n[0])
    //   .join("")
    //   .toUpperCase() || "U";
  
    const handleLogout = async () => {
    await logout(user.email);
    router.push(`/${lang}/login`);
  };
  const isSuperAdmin = user.adminLevel === "super";
  
  const isRTL = currentLanguage === "ar"

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const navLinks = 
  isSuperAdmin ? [
    { label: currentLanguage === "en" ? "Dashboard" : "لوحة القيادة", href: `/${currentLanguage}/dashboard` },
    { label: currentLanguage === "en" ? "Users" : "المستخدمون", href: `/${currentLanguage}/users` },
    { label: currentLanguage === "en" ? "Admins" : "المديرون", href: `/${currentLanguage}/admins` },
    { label: currentLanguage === "en" ? "Logs" : "السجلات", href: `/${currentLanguage}/logs` },
  ]
  :[
    { label: currentLanguage === "en" ? "Dashboard" : "لوحة القيادة", href: `/${currentLanguage}/dashboard` },
    { label: currentLanguage === "en" ? "Users" : "المستخدمون", href: `/${currentLanguage}/users` },
  ]

  return (
    <nav  className={`w-full bg-zinc-950 border-b border-zinc-800 ${isRTL ? "rtl" : "ltr"} inset-0 z-100 ${isMenuOpen ? "top-0" : "max-h-fit"}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop View */}
        <div className="hidden xxxlg:flex items-center justify-between gap-4">
          {/* Logo Card */}
          {/* <a
            href="/"
            className="magnetic-card group bg-linear-to-br from-zinc-900 to-zinc-800 hover:from-emerald-900 hover:to-emerald-800 border border-zinc-700 hover:border-emerald-500 rounded-2xl px-6 py-3 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1"
          > */}
          <Link href={`/${lang}`} className="magnetic-card group bg-linear-to-br from-zinc-900 to-zinc-800 hover:from-emerald-900 hover:to-emerald-800 border border-zinc-700 hover:border-emerald-500 rounded-2xl px-6 py-3 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
          
            <div className="flex items-center gap-3">
              {/* <img
                src="/agricultural-leaf-logo.jpg"
                alt="CLOA Logo"
                className="w-8 h-8 rounded-lg object-cover animate-logo-pulse-spin"
              /> */}
              <Image height={100} width={100} src="/Images/Logo.jpeg" alt="CLOA Logo" className="w-44 h-28 rounded-lg object-cover animate-logo-pulse-spin" />
              <span className="text-xl font-bold bg-linear-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                CLOA
              </span>
            </div>
          </Link>
          {/* </a> */}

          {/* Nav Links Card */}
          <div className="magnetic-card flex items-center gap-2 bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 shadow-lg">
            {navLinks.map((link, index) => (
              // <a
              //   key={index}
              //   href={link.href}
              //   className="group relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 perspective-1000"
              // >
              <Link
                key={index}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 perspective-1000"
              >

                {/* Background glow effect */}
                <span className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm animate-nav-glow" />

                {/* Particle effect */}
                <span className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-20 blur animate-nav-particle" />

                {/* 3D border effect */}
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-lg group-hover:rotate-x-12 transition-all duration-300" />

                {/* Text content */}
                <span className="relative z-10 block group-hover:animate-nav-text-pop">{link.label}</span>

                {/* Bottom accent line */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-emerald-500 to-cyan-500 group-hover:w-full transition-all duration-300 rounded-full group-hover:shadow-lg group-hover:shadow-emerald-500/50" />
              </Link>
              // </a>
            ))}
          </div>


          {/* User Card */}
          <div className="magnetic-card relative flex flex-row items-center justify-between gap-5">
          {/* Language Switcher Card */}
            <div className="max-w-min magnetic-card bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-2 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="scale-[0.4] -m-10">
                {/* <MorphingTypography initialLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} /> */}
                <MorphingTypography />
              </div>
            </div>

            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="hover:cursor-pointer flex items-center gap-3 bg-linear-to-br from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 border border-zinc-700 hover:border-emerald-500 rounded-2xl px-4 py-3 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-ring">
                  {getUserInitials(user.name)}
                </div>
                {/* Animated ring around avatar */}
                <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-avatar-ring-pulse" />
                <span className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-avatar-ring-pulse-delayed" />
              </div>
              <div className="hidden xl:block text-center">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </div>
              <ChevronDown
                className={`hidden xl:block w-4 h-4 text-zinc-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isUserMenuOpen && (
              <div ref={dropdownRef}  className={`absolute top-full ${lang === "ar" ? "left-0" : "right-0"} mt-4 w-64 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-50 user-menu-slide-down text-center`}>
                <div className="p-4 border-b border-zinc-700">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-zinc-400 mt-1">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                    <Clock className="w-3 h-3" />
                    <span>
                      {user.expiryDate && currentLanguage === "en" ? "Expires At :" : user.expiryDate && currentLanguage === "ar" ? ": ينتهي في" : ""} {user.expiryDate? new Date(user.expiryDate).toLocaleDateString() : !(user.expiryDate) && currentLanguage === "en" ? "Admin Accounts Does Not Expire" : !(user.expiryDate) && currentLanguage === "ar" ? "حسابات المديرون صلاحيتها لا تنتهي" : ""}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-red-600 hover:bg-zinc-800 transition-colors hover:cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  {currentLanguage === "en" ? "Logout" : "تسجيل خروج"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="xxxlg:hidden">
          <div className="flex items-center justify-between">
            {/* <a href="/" className="flex items-center gap-2"> */}
            <Link href={"/"} className="flex items-center gap-2">
              <Image height={100} width={100} src="/Images/Logo.jpeg" alt="CLOA Logo" className="w-48 h-32 rounded-lg object-cover animate-logo-pulse-spin" />
              {/* <img
                src="/agricultural-leaf-logo.jpg"
                alt="CLOA Logo"
                className="w-6 h-6 rounded-lg object-cover animate-logo-pulse-spin"
              /> */}
              <span className="hidden xxs:block text-xl font-bold bg-linear-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                CLOA
              </span>
            </Link>
            {/* </a> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* {isMenuOpen && ( */}
            {/* <div className="mt-4 space-y-3 animate-magnetic-slide-down animate-magnetic-slide-up block xxxlg:hidden"> */}
            <div
                      className={`
                        bg-black mt-4 space-y-3

                        transform transition-all duration-900 ease-out
                        origin-top z-40
                        ${
                          isMenuOpen
                            ? "translate-y-0 opacity-100 pointer-events-auto blur-0 min-h-screen"
                            : "-translate-y-6 opacity-0 pointer-events-none blur-md max-h-0"
                        }
                      `}
                    >
                      {navLinks.map((link, index) => (
                        // <a
                        //   key={index}
                        //   href={link.href}
                        //   className="group relative block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-linear-to-r hover:from-emerald-900 hover:to-zinc-800 rounded-lg transition-all duration-300 border border-zinc-700 hover:border-emerald-500 hover:scale-105 overflow-hidden text-center"
                        // >
                        <Link onClick={closeMenu} key={index} href={link.href} className="group relative block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-linear-to-r hover:from-emerald-900 hover:to-zinc-800 rounded-lg transition-all duration-300 border border-zinc-700 hover:border-emerald-500 hover:scale-105 overflow-hidden text-center">
                          {/* Shimmer effect on hover */}
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
                      
                          {/* Glow effect */}
                          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-emerald-500/10 to-cyan-500/10 blur-xl" />
                      
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                        // </a>
                      ))}
                      <div className="flex items-center justify-center pt-2">
                        <div className="scale-[0.5] -m-9">
                          {/* <MorphingTypography initialLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} /> */}
                          <MorphingTypography />
                        </div>
                      </div>
                      <div className="pt-2 border-t border-zinc-700 ">
                        <div className="flex items-center gap-3 px-4 py-2">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white animate-avatar-pulse-ring">
                              {getUserInitials(user.name)}
                            </div>
                            <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-avatar-ring-pulse" />
                            <span className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-avatar-ring-pulse-delayed" />
                          </div>
                          <div className="flex-1 text-center">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-zinc-400">{user.email}</p>
                            <p className="text-xs text-emerald-400 mt-1">
                              {user.expiryDate && currentLanguage === "en" ? "Expires At :" : user.expiryDate && currentLanguage === "ar" ? ": ينتهي في" : ""} {user.expiryDate? new Date(user.expiryDate).toLocaleDateString() : !(user.expiryDate) && currentLanguage === "en" ? "Admin Accounts Does Not Expire" : !(user.expiryDate) && currentLanguage === "ar" ? "حسابات المديرون صلاحيتها لا تنتهي" : ""}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="hover:text-red-600 w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 text-sm text-zinc-300 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-700 hover:cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          {currentLanguage === "en" ? "Logout" : "تسجيل خروج"}
                        </button>
                      </div>
            </div>                 
          {/* )} */}
        </div>
      </div>
    </nav>
  )
}
