// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu } from 'lucide-react';
// import SlidingDualFaceCard from '../LangSwitchers/SlidingDualFaceCard';
// import SplitScreenWipe from '../LangSwitchers/SplitScreenWipe';
// import MorphingTypography from '../LangSwitchers/MorphingTypography';
// import LayeredDepthCards from '../LangSwitchers/LayeredDepthCards';

// export default function PublicNavbar() {
//   const pathname = usePathname();

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Login', href: '/login' },
//     { name: 'Register', href: '/register' },
//   ];

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <Link href="/" className="text-2xl font-bold">
//           Document Review
//         </Link>
//         {/* <SlidingDualFaceCard></SlidingDualFaceCard> */}
//         {/* <SplitScreenWipe></SplitScreenWipe> */}
//         {/* <MorphingTypography></MorphingTypography> */}
//         <LayeredDepthCards></LayeredDepthCards>
//         {/* Desktop Links */}
//         <nav className="hidden md:flex space-x-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`px-3 py-1 rounded hover:bg-gray-100 transition ${
//                 pathname === link.href ? 'font-semibold underline' : ''
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Hamburger */}
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="ghost" className="md:hidden">
//               <Menu />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-64">
//             <div className="flex flex-col space-y-4 mt-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`px-3 py-2 rounded hover:bg-gray-100 ${
//                     pathname === link.href ? 'font-semibold underline' : ''
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// }

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LayeredDepthCards from "../LangSwitchers/LayeredDepthCards"
import { usePathname } from "next/navigation"
import Image  from "next/image"
// import { LayeredDepthCards } from "../LangSwitchers/LayeredDepthCards"

export default function ClassicDepthNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname();

  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ar">(pathname.includes("ar") ? "ar" : "en")
  const isRTL = currentLanguage === "ar"

  //  useEffect(() => {
  //   if (mobileMenuOpen) {
  //     // Lock scroll
  //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); 
  //     document.body.style.overflow = "hidden"
  //     document.body.style.touchAction = "none" // mobile Safari fix
  //   } else {
  //     // Restore scroll
  //     document.body.style.overflow = ""
  //     document.body.style.touchAction = ""
  //   }
  
  //   return () => {
  //     // Cleanup on unmount
  //     document.body.style.overflow = ""
  //     document.body.style.touchAction = ""
  //   }
  // }, [mobileMenuOpen])


  const navContent = {
    en: {
      home: "Home",
      about: "Account Mangement",
      // about: "Login",
      // contact: "Register",
      brand: "CLOA",
      tagline: "Growing Innovation",
    },
    ar: {
      home: "الرئيسية",
      about: "ادارة الحساب",
      // about: "تسجيل الدخول",
      // contact: "انشاء حساب",
      brand: "CLOA",
      tagline: "ننمي الابتكار",
    },
  }

  
  const content = navContent[currentLanguage]

  return (
    <nav
      className="sticky top-0 z-50 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-b border-emerald-500/20 shadow-xl shadow-black/50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-8xl mx-auto px-4 xxxs:px-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-36 sm:h-36">
          {/* Logo */}
          <Link href={`/${currentLanguage}`} className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 xxxs:w-44 xxxs:h-28 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                <Image
                  src="/Images/Logo.jpeg"
                  alt="CLOA Logo"
                  className="w-full h-full object-cover animate-logo-pulse group-hover:animate-logo-spin"
                  width={200}
                  height={100}
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <div className="hidden xxs:block">
              <div className="text-white font-bold text-xl sm:text-2xl group-hover:text-emerald-400 transition-colors duration-300">
                {content.brand}
              </div>
              <div className="text-emerald-500/70 text-xs mt-1">{content.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-8 lg:min-w-md sm:min-w-[250px]">
            <DepthNavLink href={`/${currentLanguage}`}>{content.home}</DepthNavLink>
            <DepthNavLink href={`/${currentLanguage}/login`}>{content.about}</DepthNavLink>
            {/* <DepthNavLink href={`/${currentLanguage}/login`}>{content.about}</DepthNavLink>
            <DepthNavLink href={`/${currentLanguage}/register`}>{content.contact}</DepthNavLink> */}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block">
            {/* <LayeredDepthCards
              initialLanguage={currentLanguage}
              onLanguageChange={(lang) => setCurrentLanguage(lang)}
            /> */}
            <LayeredDepthCards></LayeredDepthCards>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-emerald-400 transition-colors hover:bg-white/5 rounded-lg hover:cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-4 mt-2"> */}
          <div
            className={`
              md:hidden
              absolute top-full left-0 right-0
              bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950
              pb-4 border-white/10 pt-4 mt-0
              transform transition-all duration-900 ease-out
              origin-top 
              ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto blur-0"
                  : "-translate-y-6 opacity-0 pointer-events-none blur-md"
              }
            `}
          >
            <div className="xxxs:grid xxxs:grid-cols-2  xxs:flex xxs:flex-row xxs:items-center xxs:justify-between xxs:gap-3">
              <div className="flex xxxs:flex-col xxs:flex-row xxs:items-center gap-2 flex-1">
                <MobileDepthNavLink href={`/${currentLanguage}`} onClick={() => setMobileMenuOpen(false)}>
                  {content.home}
                </MobileDepthNavLink>
                <MobileDepthNavLink href={`/${currentLanguage}/login`} onClick={() => setMobileMenuOpen(false)}>
                  {content.about}
                </MobileDepthNavLink>
                {/* <MobileDepthNavLink href={`/${currentLanguage}/login`} onClick={() => setMobileMenuOpen(false)}>
                  {content.about}
                </MobileDepthNavLink>
                <MobileDepthNavLink href={`/${currentLanguage}/register`} onClick={() => setMobileMenuOpen(false)}>
                  {content.contact}
                </MobileDepthNavLink> */}
              </div>
              <div className={`xxxs:m-auto xxs:flex xs:justify-center xxs:justify-end xxs:shrink-0 ${isRTL ? "xxs:pl-3" : "xxs:pr-3"}`}>
                {/* <LayeredDepthCards
                  initialLanguage={currentLanguage}
                  onLanguageChange={(lang) => setCurrentLanguage(lang)}
                /> */}
                <LayeredDepthCards></LayeredDepthCards>
              </div>
            </div>
          </div>
         {/* )} */}
      </div>
    </nav>
  )
}

function DepthNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 lg:px-6 py-2.5 text-sm lg:text-base text-white/90 hover:text-white transition-all duration-300 group"
    >
      {/* 3D depth shadow */}
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-emerald-500/0 group-hover:shadow-emerald-500/30" />

      {/* Animated underline with glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-300 rounded-full shadow-lg shadow-emerald-500/0 group-hover:shadow-emerald-500/50" />

      <span className="relative z-10 font-medium">{children}</span>
    </Link>
  )
}

function MobileDepthNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-white/90 hover:text-white hover:bg-linear-to-r hover:from-emerald-500/10 hover:to-transparent rounded-lg transition-all duration-300 border-x-3 border-transparent hover:border-emerald-500"
    >
      {children}
    </Link>
  )
}
