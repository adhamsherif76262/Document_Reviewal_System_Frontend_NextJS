// "use client"

// import { useState } from "react"

// interface SplitScreenWipeProps {
//   initialLanguage?: "en" | "ar"
//   onLanguageChange?: (language: "en" | "ar") => void
// }

// export default function SplitScreenWipe({ initialLanguage = "en", onLanguageChange }: SplitScreenWipeProps) {
//   const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">(initialLanguage)

//   const handleToggle = () => {
//     const newLanguage = activeLanguage === "en" ? "ar" : "en"
//     setActiveLanguage(newLanguage)
//     onLanguageChange?.(newLanguage)
//   }

//   return (
//     <button
//       onClick={handleToggle}
//       className="relative w-64 h-24 rounded-2xl overflow-hidden border-2 border-zinc-700 hover:border-emerald-500 transition-colors"
//       aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
//     >
//       <div className="relative w-full h-full">
//         {/* EN Side */}
//         <div
//           className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-3xl font-bold text-white transition-all duration-700"
//           style={{
//             clipPath:
//               activeLanguage === "en" ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 0 0, 0 100%, 0 100%)",
//           }}
//         >
//           ENGLISH
//         </div>
//         {/* AR Side */}
//         <div
//           className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-3xl font-bold text-white transition-all duration-700"
//           style={{
//             clipPath:
//               activeLanguage === "ar"
//                 ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//                 : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
//           }}
//         >
//           عربي
//         </div>
//       </div>
//     </button>
//   )
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

type Lang = "en" | "ar";

export default function SplitScreenWipe() {
  const params = useParams<{ lang: Lang }>();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ URL is the source of truth
  const currentLang: Lang = params.lang === "ar" ? "ar" : "en";
  const nextLang: Lang = currentLang === "en" ? "ar" : "en";

  // animation state only
  const [activeLanguage, setActiveLanguage] = useState<Lang>(currentLang);
  const [isSwitching, setIsSwitching] = useState(false);

  // ✅ sync state on refresh / navigation
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
    }, 700); // match animation duration
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isSwitching}
      className="relative md:w-28 md:h-10 xxxs:w-28 xxxs:h-10 rounded-2xl overflow-hidden mt-2 hover:cursor-pointer 
                 border-2 border-zinc-700 hover:border-emerald-500 transition-colors"
      aria-label={`Switch language to ${activeLanguage === "en" ? "Arabic" : "English"}`}
    >
      <div className="relative w-full h-full">
        {/* EN Side */}
        <div
          className="absolute inset-0 bg-linear-to-br from-emerald-600 to-emerald-800
                     flex items-center justify-center text-lg font-bold text-white
                     transition-all duration-700  hover:from-gray-950 hover:to-black"
          style={{
            clipPath:
              activeLanguage === "ar"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 0 0, 0 100%, 0 100%)",
          }}
        >
          ENGLISH
        </div>

        {/* AR Side */}
        <div
          className="absolute inset-0 bg-cyan-400 pb-2 
                     flex items-center justify-center text-2xl font-bold text-black
                     transition-all duration-700 hover:bg-black hover:text-white"
          style={{
            clipPath:
              activeLanguage === "en"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          }}
        >
          عربي
        </div>
      </div>
    </button>
  );
}
