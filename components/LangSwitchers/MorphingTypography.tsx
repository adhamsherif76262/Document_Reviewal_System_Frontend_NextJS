// "use client"

// import { useState } from "react"

// interface MorphingTypographyProps {
//   initialLanguage?: "en" | "ar"
//   onLanguageChange?: (language: "en" | "ar") => void
// }

// export default function MorphingTypography({ initialLanguage = "en", onLanguageChange }: MorphingTypographyProps) {
//   const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">(initialLanguage)

//   const handleToggle = () => {
//     const newLanguage = activeLanguage === "en" ? "ar" : "en"
//     setActiveLanguage(newLanguage)
//     onLanguageChange?.(newLanguage)
//   }

//   return (
//     <button
//       onClick={handleToggle}
//       className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-zinc-700 hover:border-emerald-500 transition-colors flex items-center justify-center overflow-hidden"
//       aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
//     >
//       <div className="relative w-full h-full flex items-center justify-center">
//         <span
//           className={`absolute text-5xl font-bold text-emerald-400 transition-all duration-700 ${
//             activeLanguage === "en" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-180"
//           }`}
//         >
//           EN
//         </span>
//         <span
//           className={`absolute text-5xl font-bold text-blue-400 transition-all duration-700 ${
//             activeLanguage === "ar" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-180"
//           }`}
//         >
//           ع
//         </span>
//       </div>
//     </button>
//   )
// }


"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Lang = "en" | "ar";

export default function MorphingTypography() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ derive language from URL
  const currentLang = pathname.split("/")[1] as Lang;
  const nextLang: Lang = currentLang === "en" ? "ar" : "en";

  // ✅ animation state (NOT source of truth)
  const [activeLanguage, setActiveLanguage] = useState<Lang>(pathname.includes("ar") ? "ar" : "en");
  const [isSwitching, setIsSwitching] = useState(false);

  // ✅ keep UI synced with URL (refresh / navigation)
  useEffect(() => {
    setActiveLanguage(currentLang);
  }, [currentLang]);

  const handleToggle = () => {
    if (isSwitching) return;

    setIsSwitching(true);
    setActiveLanguage(nextLang);

    const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);

    // ⏳ wait for animation before navigating
    setTimeout(() => {
      router.push(newPath);
      setIsSwitching(false);
    }, 700); // MUST match animation duration
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isSwitching}
      className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900
                 border-2 border-zinc-700 hover:border-emerald-500 transition-colors
                 flex items-center justify-center overflow-hidden hover:cursor-pointer"
      aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* EN */}
        <span
          className={`absolute text-5xl font-bold text-emerald-400 transition-all duration-700 ${
            activeLanguage === "ar"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-180"
          }`}
        >
          EN
        </span>

        {/* AR */}
        <span
          className={`absolute text-5xl font-bold text-blue-400 transition-all duration-700 ${
            activeLanguage === "en"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-180"
          }`}
        >
          عربي
        </span>
      </div>
    </button>
  );
}
