// // components/LockedOverlay.tsx

// export default function LockedOverlay() {
//   return (
//     <div className="
//       absolute inset-0
//       bg-white/70 backdrop-blur-sm
//       flex items-center justify-center
//       rounded-xl z-10
//     ">
//       <Lock className="w-5 h-5 mr-2" />
//       <span className="text-sm">
//         {lang === 'en' ? 'Approved' : 'تمت الموافقة'}
//       </span>
//     </div>

//   )
// }


// components/LockedOverlay.tsx
"use client";

import { Lock } from "lucide-react";

interface LockedOverlayProps {
  lang?: "en" | "ar";
}

export function LockedOverlay({ lang = "en" }: LockedOverlayProps) {
  return (
    <div
      className="
        absolute inset-0
        bg-white/70 backdrop-blur-sm
        flex items-center justify-center
        rounded-xl z-10
      "
    >
      <Lock className="w-5 h-5 mr-2" />
      <span className="text-sm font-semibold">
        {lang === "en" ? "Approved" : "تمت الموافقة"}
      </span>
    </div>
  );
}
