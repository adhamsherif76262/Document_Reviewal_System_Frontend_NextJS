// "use client";

// import Link from "next/link";
// import { useRouter, useParams } from "next/navigation";
// import { useAuth } from "../../app/context/AuthContext";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import SplitScreenWipe from "../LangSwitchers/SplitScreenWipe";

// export default function UserNavbar() {
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const { lang } = useParams();

//   if (!user) return null;

//   const initials =
//     user.name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase() || "U";

//   const handleLogout = async () => {
//     await logout(user.email);
//     router.push(`/${lang}/login`);
//   };

//   return (
//     <header className="border-b bg-background">
//       <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        
//         {/* LEFT */}
//         <Link
//           href={`/${lang}`}
//           className="font-bold text-lg tracking-tight"
//         >
//           CLOA Docs
//         </Link>

//         {/* CENTER */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium">
//           <Link
//             href={`/${lang}/submissions`}
//             className="hover:text-primary"
//           >
//             My Documents
//           </Link>

//           <Link
//             href={`/${lang}/submit`}
//             className="hover:text-primary"
//           >
//             Submit
//           </Link>
//         </nav>

//         {/* RIGHT */}
//         <div className="flex items-center gap-4">
//           {/* Language Switch */}
//           {/* <Link
//             href={`/${lang === "en" ? "ar" : "en"}`}
//             className="text-sm font-medium hover:underline"
//           >
//             {lang === "en" ? "AR" : "EN"}
//           </Link> */}
//           <SplitScreenWipe></SplitScreenWipe>
//           {/* User Menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar className="cursor-pointer">
//                 <AvatarFallback>{initials}</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-56">
//               <div className="px-3 py-2">
//                 <p className="text-sm font-medium">{user.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {user.email}
//                 </p>
//               </div>

//               <DropdownMenuSeparator />

//               {/* Expiry */}
//               {user.expiryDate && (
//                 <DropdownMenuItem disabled>
//                   Expires:{" "}
//                   {new Date(user.expiryDate).toLocaleDateString()}
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
//         </div>
//       </div>
//     </header>
//   );
// }


"use client"

import { useRef, useState , useEffect} from "react"
import Link from "next/link"
import { Menu, X, LogOut, Calendar } from "lucide-react"
import SplitScreenWipe from "../LangSwitchers/SplitScreenWipe"
import { useAuth } from "../../app/context/AuthContext"
import { useParams, usePathname, useRouter } from "next/navigation"
import Image from "next/image"

export default function NeonCyberpunkNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { lang } = useParams();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [language, setLanguage] = useState(pathname.includes("ar") ? "ar" : "en")
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  if (isMenuOpen) {
    // Lock scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); 
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none" // mobile Safari fix
  } else {
    // Restore scroll
    document.body.style.overflow = "visible"
    document.body.style.touchAction = "auto"
  }

  return () => {
    // Cleanup on unmount
    document.body.style.overflow = "visible"
    document.body.style.touchAction = "auto"
  }
}, [isMenuOpen])


  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserDropdownOpen(false)
    }
  }

  if (isUserDropdownOpen) {
    document.addEventListener("mousedown", handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [isUserDropdownOpen])


    if (!user) return null;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await logout(user?.email);
    router.push(`/${lang}/login`);
  };


  const isRTL = language === "ar"

  // const initials =
  //   user.name
  //     ?.split(" ")
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase() || "U"

  const navLinks = [
    { en: "My submissions", ar: "تقديماتي", href: `/${language}/submissions` },
    // { en: "New submission", ar: "تقديم جديد", href: `/${language}/submit` },
  ]

  

  return (
    <header className="relative bg-black border-b-2 border-cyan-500" dir={isRTL ? "rtl" : "ltr"}>
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-cyberpunk-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-cyan-500/5 via-transparent to-pink-500/5" />

      <div className="mx-auto max-w-8xl px-4 relative z-10">
        <div className={`flex h-36 items-center justify-between ${isRTL ? "flex-row" : ""}`}>
          {/* Logo with Neon Glow */}
          {/* <Link href={`/${language}`} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="xxxs:w-44 xxxs:h-28 rounded border-2 border-cyan-500 bg-cyan-500/10 animate-neon-pulse" />
              <div className="absolute inset-0 w-10 h-10 rounded border-2 border-cyan-500 blur-lg animate-neon-pulse" ></div>
              <Image  className="absolute inset-0 w-10 h-10 rounded border-2 border-cyan-500 blur-lg animate-neon-pulse"  src="/Images/LOGO.jpeg" alt="CLOA Logo" width={40} height={40}/>
            </div>
            <span className="text-xl font-bold text-cyan-400 tracking-wider uppercase animate-neon-text-glow font-mono">
              CLOA Docs
            </span>
          </Link> */}

          <Link href={`/${language}`} className="flex items-center gap-3 group">
            <div className="relative  hover:scale-105 transition-all duration-300">
    {/* <div className="xxxs:w-44 xxxs:h-28 rounded border-2 border-cyan-500 bg-cyan-500/10 animate-neon-pulse" /> */}
    <Image
      src="/Images/LOGO.jpeg"
      alt="CLOA Logo"
      width={170}
      height={10}
      className="
        
        rounded 
        wS-44 hS-32
        border-2 border-cyan-500
        bg-cyan-500/10
        animate-neon-pulse
        shadow-[0_0_8px_rgba(34,211,238,0.6),0_0_20px_rgba(34,211,238,0.4)]
        group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8),0_0_28px_rgba(34,211,238,0.6)]
        transition-shadow
      "
      priority
    />
            </div>
            <span className="text-xl font-bold text-cyan-400 tracking-wider uppercase animate-neon-text-glow font-mono hidden xxs:block">
              CLOA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 ${isRTL ? "text-xl" : "text-sm"} font-bold text-cyan-300 hover:text-pink-400 transition-all duration-300 group uppercase tracking-wide font-mono`}
              >
                <span className="relative z-10">{isRTL ? link.ar : link.en}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-lg shadow-cyan-500/50" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row" : ""}`}>
            {/* Language Switcher - Compact */}
            <div className="hidden md:block origin-center">
              {/* <SplitScreenWipe initialLanguage={language} onLanguageChange={setLanguage} /> */}
              <SplitScreenWipe />
            </div>

            {/* User Avatar with Neon Border */}
            <div ref={dropdownRef}  className="hidden md:block relative">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="relative group hover:scale-110 duration-500 hover:cursor-pointer">
                <div className="w-10 h-10 rounded border-2 border-pink-500 bg-black flex items-center justify-center text-pink-400 font-bold text-sm font-mono animate-neon-pulse-avatar">
                  <span className="relative z-10">{initials}</span>
                </div>
                <div className="absolute inset-0 w-10 h-10 rounded border-2 border-pink-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className={`absolute ${isRTL ? "left-0" : "right-0"} mt-2 w-56 bg-black border-2 border-cyan-500 shadow-2xl shadow-cyan-500/50 overflow-hidden z-50`}>
                  <div className="p-4 border-b-2 border-cyan-500/50 bg-linear-to-r from-cyan-500/10 to-pink-500/10 text-center">
                    <p className="text-xl font-bold text-cyan-400 font-mono">{user.name}</p>
                    <p className="text-sm text-pink-400 mt-1 font-mono">{user.email}</p>
                  </div>
                  {user.expiryDate && (
                    <div className="px-4 py-3 border-b-2 border-cyan-500/50 flex items-center gap-2 text-cyan-400 text-center">
                      <Calendar className="w-4 h-4" />
                      <span className="text-md font-mono text-center font-black mx-auto">
                        {isRTL ? "ينتهي في:" : "EXP:"} {new Date(user.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 hover:cursor-pointer justify-center flex items-center gap-2 text-red-500 hover:bg-red-500/10 transition-colors font-mono uppercase text-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500 transition-colors hover:cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* {isMenuOpen && ( */}
          {/* <div className="md:hidden py-4 border-t-2 border-cyan-500"> */}
          <div
            className={`
              md:hidden
              bg-black
              absolute left-0 right-0 top-full
              border-t-2 border-cyan-500
              transform transition-all duration-900 ease-out
              origin-top min-h-screen z-40
              ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto blur-0"
                  : "-translate-y-6 opacity-0 pointer-events-none blur-md"
              }
            `}
          >
            <div className="flex flex-col gap-3 ">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-6 text-xl font-bold text-cyan-300 hover:text-pink-400 hover:bg-cyan-500/10 border-x-2 border-transparent hover:border-pink-500 transition-colors font-mono uppercase text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isRTL ? link.ar : link.en}
                </Link>
              ))}
              <div className="px-4 py-2 mx-auto">
                <div className="origin-center">
                  {/* <SplitScreenWipe initialLanguage={language} onLanguageChange={setLanguage} /> */}
                  <SplitScreenWipe/>
                </div>
              </div>
              <div className="px-4 py-2 border-t-2 border-cyan-500/50 mt-2 pt-4 text-center">
                <p className="text-xl font-bold text-cyan-400 font-mono">{user.name}</p>
                <p className="text-lg text-pink-400 mt-1 font-mono">{user.email}</p>
                {user.expiryDate && (
                  <p className="text-xl text-cyan-400 mt-2 font-mono">
                    {isRTL ? "ينتهي في:" : "EXP:"} {new Date(user.expiryDate).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full px-4 py-2 flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 border border-red-500 transition-colors font-mono uppercase text-sm hover:cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                </button>
              </div>
            </div>
          </div>
         {/* )} */}
      </div>
    </header>
  )
}
