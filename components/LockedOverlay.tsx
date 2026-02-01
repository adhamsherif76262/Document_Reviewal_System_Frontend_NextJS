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


/* eslint-disable @typescript-eslint/no-explicit-any */

// components/LockedOverlay.tsx
"use client";

import { Lock } from "lucide-react";
import { TemplateField } from "../types/template";

interface LockedOverlayProps {
  lang?: "en" | "ar",
  fieldState: string;
  doc: any;
  field: TemplateField;
}

export function LockedOverlay({ lang, fieldState , doc , field}: LockedOverlayProps) {
  return (
    <div
      className="
        font-black text-2xl absolute inset-0
        bg-white/70 backdrop-blur-sm
        flex flex-col items-center justify-center
        rounded-xl z-10
      "
    >
      <div className="absolute top-15 p-6 text-center">
      {/* {doc.fields[field.label[lang === "ar" ? "ar" : "en"]]} */}
      {field.label[lang === "ar" ? "ar" : "en"]}
      </div>
      <div className="flex items-center justify-center bg-black rounded-2xl p-4">

      <Lock className="w-6 h-6 mx-4 font-black text-white " />
      <span className={`text-2xl font-black ${fieldState === "approved" ? "text-green-700" : fieldState === "pending" ? "text-yellow-500" : "text-black"}`}>
        {/* {fieldState} */}
        {lang === "en" ? 
            fieldState === "approved" ?
            "This Field Has Been Approved" :
            fieldState === "pending" ? "This Field Is Currently Pending Approval" 
            : "This Field Is Neither Approved Nor Pending Approval"
        :lang === "ar" ? 
            fieldState === "approved" ?
            "تمت الموافقة علي هذا الحقل" :
            fieldState === "pending" ? "هذا الحقل قيد الموافقة حاليًا" 
            : "هذا الحقل غير معتمد ولا ينتظر الموافقة."
        :""
        }
      </span>
      </div>
    </div>
  );
}
