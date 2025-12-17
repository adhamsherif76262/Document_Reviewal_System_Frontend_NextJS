// "use client"

// import { useState } from "react"
// import { usePathname, useRouter } from "next/navigation";

// interface LayeredDepthCardsProps {
//   initialLanguage?: "en" | "ar"
//   onLanguageChange?: (language: "en" | "ar") => void
// }

// export default function LayeredDepthCards({ initialLanguage = "en", onLanguageChange }: LayeredDepthCardsProps) {
//   const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">(initialLanguage)
//   const pathname = usePathname();
//   const router = useRouter();

//   const currentLang = pathname.split("/")[1];
//   const nextLang = currentLang === "en" ? "ar" : "en";

//   const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
//   const handleToggle = () => {
//     const newLanguage = activeLanguage === "en" ? "ar" : "en"
//     setActiveLanguage(newLanguage)
//     onLanguageChange?.(newLanguage)
//     router.push(newPath)
//   }

//   return (
//     <button
//       onClick={handleToggle}
//       className="relative w-64 h-40 perspective-1000"
//       aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
//     >
//       <div className="relative w-full h-full preserve-3d">
//         {/* EN Card */}
//         <div
//           className={`absolute inset-0 transition-all duration-700 ${activeLanguage === "en" ? "z-20" : "z-10"}`}
//           style={{
//             transform: activeLanguage === "en" ? "translateZ(40px) scale(1.1)" : "translateZ(-40px) scale(0.9)",
//           }}
//         >
//           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-2 border-emerald-300">
//             ENGLISH
//           </div>
//         </div>
//         {/* AR Card */}
//         <div
//           className={`absolute inset-0 transition-all duration-700 ${activeLanguage === "ar" ? "z-20" : "z-10"}`}
//           style={{
//             transform: activeLanguage === "ar" ? "translateZ(40px) scale(1.1)" : "translateZ(-40px) scale(0.9)",
//           }}
//         >
//           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-2 border-blue-300">
//             عربي
//           </div>
//         </div>
//       </div>
//     </button>
//   )
// }

// // "use client";

// // import { usePathname, useRouter } from "next/navigation";

// // export default function LanguageSwitcher() {
// //   const pathname = usePathname();
// //   const router = useRouter();

// //   const currentLang = pathname.split("/")[1];
// //   const nextLang = currentLang === "en" ? "ar" : "en";

// //   const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);

// //   return (
// //     <button
// //       onClick={() => router.push(newPath)}
// //       className="px-4 py-2 rounded-lg border hover:bg-muted transition"
// //     >
// //       {nextLang === "ar" ? "عربي" : "English"}
// //     </button>
// //   );
// // }

"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// interface LayeredDepthCardsProps {
//   initialLanguage?: "en" | "ar";
//   onLanguageChange?: (language: "en" | "ar") => void;
// }

export default function LayeredDepthCards() {
  
  const pathname = usePathname();
  const router = useRouter();
  
  const currentLang = pathname.split("/")[1] as "en" | "ar";
  const nextLang = currentLang === "en" ? "ar" : "en";
  
  const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">(currentLang);
  const [isSwitching, setIsSwitching] = useState(false);

    // ✅ Sync state with URL on navigation / refresh
  useEffect(() => {
    setActiveLanguage(currentLang);
  }, [currentLang]);
  
   const handleToggle = () => {
    if (isSwitching) return;

    setIsSwitching(true);

    // Trigger animation FIRST
    setActiveLanguage(nextLang);

    // Wait for animation → then navigate
    timeoutRef.current = setTimeout(() => {
      router.push(newPath);
      setIsSwitching(false);
    }, 750);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isSwitching}
      className="relative w-28 h-10 perspective-1000 disabled:cursor-not-allowed hover:cursor-pointer"
      aria-label={`Switch language to ${activeLanguage === "en" ? "ar" : "en"}`}
    >
      <div className="relative w-full h-full preserve-3d">
        {/* EN Card */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            activeLanguage === "ar" ? "z-20" : "z-10"
          }`}
          style={{
            transform:
              activeLanguage === "ar"
                ? "translateZ(40px) scale(1.1)"
                : "translateZ(-40px) scale(0.9)",
          }}
        >
          <div className="w-full h-full rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 hover:from-gray-900 hover:to-black  flex items-center justify-center text-xl font-bold text-white shadow-2xl border-2 border-emerald-300 duration-500 transition-all">
            ENGLISH
          </div>
        </div>

        {/* AR Card */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            activeLanguage === "en" ? "z-20" : "z-10"
          }`}
          style={{
            transform:
              activeLanguage === "en"
                ? "translateZ(40px) scale(1.1)"
                : "translateZ(-40px) scale(0.9)",
          }}
        >
          <div className="w-full h-full rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 hover:from-black hover:to-black flex items-center justify-center text-2xl font-bold text-white shadow-2xl border-2 border-blue-300">
            عربي
          </div>
        </div>
      </div>
    </button>
  );
}
