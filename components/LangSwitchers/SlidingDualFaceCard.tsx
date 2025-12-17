// "use client"

// import { useState } from "react"

// interface SlidingDualFaceCardProps {
//   initialLanguage?: "en" | "ar"
//   onLanguageChange?: (language: "en" | "ar") => void
// }

// export default function SlidingDualFaceCard({ initialLanguage = "en", onLanguageChange }: SlidingDualFaceCardProps) {
//   const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">(initialLanguage)

//   const handleToggle = () => {
//     const newLanguage = activeLanguage === "en" ? "ar" : "en"
//     setActiveLanguage(newLanguage)
//     onLanguageChange?.(newLanguage)
//   }

//   return (
//     <button
//       onClick={handleToggle}
//       className="relative bg-zinc-800 rounded-2xl p-2 w-64 h-20 border-2 border-zinc-700 hover:border-emerald-500 transition-colors"
//       aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
//     >
//       <div className="relative w-full h-full flex items-center justify-between px-8">
//         <span
//           className={`text-xl font-bold transition-colors ${activeLanguage === "en" ? "text-white" : "text-gray-500"}`}
//         >
//           EN
//         </span>
//         <span
//           className={`text-xl font-bold transition-colors ${activeLanguage === "ar" ? "text-white" : "text-gray-500"}`}
//         >
//           ع
//         </span>
//         {/* Glowing Slider */}
//         <div
//           className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-xl border-2 border-emerald-400 shadow-glow transition-all duration-500 ease-out"
//           style={{
//             left: activeLanguage === "en" ? "8px" : "calc(100% - 104px)",
//           }}
//         />
//       </div>
//     </button>
//   )
// }



// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// type Lang = "en" | "ar";

// export default function SlidingDualFaceCard() {
//   const pathname = usePathname();
//   const router = useRouter();

//   // ✅ language from URL
//   const currentLang = pathname.split("/")[1] as Lang;
//   const nextLang: Lang = currentLang === "en" ? "ar" : "en";

//   // ✅ animation-only state
//   const [activeLanguage, setActiveLanguage] = useState<Lang>(currentLang);
//   const [isSwitching, setIsSwitching] = useState(false);

//   // ✅ keep component synced with URL (refresh / back / forward)
//   useEffect(() => {
//     setActiveLanguage(currentLang);
//   }, [currentLang]);

//   const handleToggle = () => {
//     if (isSwitching) return;

//     setIsSwitching(true);
//     setActiveLanguage(nextLang);

//     const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);

//     // ⏳ wait for slide animation
//     setTimeout(() => {
//       router.push(newPath);
//       setIsSwitching(false);
//     }, 500); // MUST match duration below
//   };

//   return (
//     <button
//       onClick={handleToggle}
//       disabled={isSwitching}
//       className="relative bg-zinc-800 rounded-2xl p-2 w-64 h-20
//                  border-2 border-zinc-700 hover:border-emerald-500
//                  transition-colors"
//       aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
//     >
//       <div className="relative w-full h-full flex items-center justify-between px-8">
//         {/* EN */}
//         <span
//           className={`text-xl font-bold transition-colors ${
//             activeLanguage === "en" ? "text-white" : "text-gray-500"
//           }`}
//         >
//           EN
//         </span>

//         {/* AR */}
//         <span
//           className={`text-xl font-bold transition-colors ${
//             activeLanguage === "ar" ? "text-white" : "text-gray-500"
//           }`}
//         >
//           ع
//         </span>

//         {/* Sliding Glow */}
//         <div
//           className="absolute top-0 bottom-0 w-24 rounded-xl
//                      bg-gradient-to-r from-emerald-500/20 to-emerald-400/20
//                      border-2 border-emerald-400 shadow-glow
//                      transition-all duration-500 ease-out"
//           style={{
//             left: activeLanguage === "en" ? "8px" : "calc(100% - 104px)",
//           }}
//         />
//       </div>
//     </button>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

type Lang = "en" | "ar";

export default function SlidingDualFaceCard() {
  const params = useParams<{ lang: Lang }>();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ REAL source of truth
  const currentLang: Lang = params.lang ?? "en";
  const nextLang: Lang = currentLang === "en" ? "ar" : "en";

  // animation state only
  const [activeLanguage, setActiveLanguage] = useState<Lang>(currentLang);
  const [isSwitching, setIsSwitching] = useState(false);

  // ✅ sync after refresh / navigation
  useEffect(() => {
    setActiveLanguage(currentLang);
  }, [currentLang]);

  const handleToggle = () => {
    if (isSwitching) return;

    setIsSwitching(true);
    setActiveLanguage(nextLang);

    const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);

    setTimeout(() => {
      router.push(newPath);
      setIsSwitching(false);
    }, 500); // match animation duration
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isSwitching}
      className="relative bg-zinc-800 rounded-2xl p-2 w-64 h-20
                 border-2 border-zinc-700 hover:border-emerald-500 transition-colors"
      aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
    >
      <div className="relative w-full h-full flex items-center justify-between px-8">
        <span
          className={`text-xl font-bold transition-colors ${
            activeLanguage === "en" ? "text-white" : "text-gray-500"
          }`}
        >
          EN
        </span>

        <span
          className={`text-xl font-bold transition-colors ${
            activeLanguage === "ar" ? "text-white" : "text-gray-500"
          }`}
        >
          ع
        </span>

        <div
          className="absolute top-0 bottom-0 w-24 rounded-xl
                     bg-gradient-to-r from-emerald-500/20 to-emerald-400/20
                     border-2 border-emerald-400 shadow-glow
                     transition-all duration-500 ease-out"
          style={{
            left: activeLanguage === "en" ? "8px" : "calc(100% - 104px)",
          }}
        />
      </div>
    </button>
  );
}
