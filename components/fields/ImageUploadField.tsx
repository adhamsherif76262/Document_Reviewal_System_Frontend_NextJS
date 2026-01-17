// // fields/ImageUploadField.tsx
// <Card className="relative border-dashed border-2 rounded-2xl p-4">
//   {locked && <LockedOverlay />}

//   <Label className="font-semibold text-sm">
//     {field.label[lang]}
//   </Label>

//   <p className="text-xs text-muted-foreground mt-1">
//     {globals.helpText.image[lang]}
//   </p>

//   <input
//     type="file"
//     accept={globals.constraints.image.allowedMimeTypes.join(',')}
//     className="hidden"
//     id={field.name}
//     onChange={handleImage}
//   />

//   <label
//     htmlFor={field.name}
//     className="
//       mt-4 flex flex-col items-center justify-center
//       rounded-xl border bg-background
//       hover:bg-muted transition
//       min-h-[120px]
//     "
//   >
//     <UploadCloud className="w-6 h-6 mb-2" />
//     <span className="text-xs text-center">
//       {lang === 'en' ? 'Click to upload' : 'اضغط للتحميل'}
//     </span>
//   </label>

//   {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
// </Card>


// fields/ImageUploadField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { UploadCloud } from "lucide-react";
// import { LockedOverlay } from "../../components/LockedOverlay";

// export function ImageUploadField({
//   field,
//   lang,
//   globals,
//   value = [],
//   onChange,
//   locked = false,
//   error,
// }: any) {
//   const [previews, setPreviews] = useState<string[]>([]);

//   useEffect(() => {
//     if (value && Array.isArray(value)) {
//       const urls = value.map((file: File | string) => {
//         if (typeof file === "string") return file;
//         return URL.createObjectURL(file);
//       });
//       setPreviews(urls);

//       // revoke object URLs on unmount
//       return () => urls.forEach((url) => typeof url !== "string" && URL.revokeObjectURL(url));
//     }
//   }, [value]);

//   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const files = Array.from(e.target.files);
//     onChange(files);
//   };

//   return (
//     <Card className="relative border-dashed border-2 rounded-2xl p-4">
//       {locked && <LockedOverlay />}
//       <Label className="font-semibold text-sm">{field.label[lang]}</Label>
//       <p className="text-xs text-muted-foreground mt-1">
//         {globals.helpText?.image?.[lang]}
//       </p>

//       <input
//         type="file"
//         accept={globals.constraints?.image?.allowedMimeTypes?.join(",")}
//         className="hidden"
//         id={field.name}
//         multiple
//         onChange={handleImage}
//         disabled={locked}
//       />

//       <label
//         htmlFor={field.name}
//         className="
//           mt-4 flex flex-col items-center justify-center
//           rounded-xl border border-dashed border-gray-300 bg-background
//           hover:bg-muted transition min-h-[120px] cursor-pointer
//           w-full
//         "
//       >
//         <UploadCloud className="w-6 h-6 mb-2" />
//         <span className="text-xs text-center">
//           {lang === "en" ? "Click to upload" : "اضغط للتحميل"}
//         </span>
//       </label>

//       {/* Preview */}
//       {previews.length > 0 && (
//         <div className="flex flex-wrap gap-2 mt-2">
//           {previews.map((src, i) => (
//             <img
//               alt=""
//               key={i}
//               src={src}
//               className="w-20 h-20 object-cover rounded-lg border"
//             />
//           ))}
//         </div>
//       )}

//       {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
//     </Card>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { LockedOverlay } from "../../components/LockedOverlay";

export function ImageUploadField({
  field,
  lang,
  globals,
  value = [],
  onChange,
  locked = false,
  error,
}: any) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!value || !Array.isArray(value)) return;

    // Compute new URLs without mutating state directly
    const newUrls: string[] = value.map((file: File | string) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );

    // Use functional update to avoid triggering synchronous cascades
    // setPreviews((prev) => {
    //   // Cleanup previous object URLs
    //   prev.forEach((url) => {
    //     if (!value.includes(url)) URL.revokeObjectURL(url);
    //   });
    //   return newUrls;
    // });

    // Cleanup on unmount
    return () => {
      newUrls.forEach((url) => {
        if (!value.includes(url) && typeof url !== "string") URL.revokeObjectURL(url);
      });
    };
  }, [value]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    onChange(files);
  };

  
// console.log(globals)
// console.log(field)
// console.log(lang)
// // console.log(globals)
// console.log(error)

  return (
    <Card className="relative border-dashed border-2 rounded-2xl p-4">
      {locked && <LockedOverlay lang={lang} />}
      <Label className="font-semibold text-sm">{field.label[lang]}</Label>
      <p className="text-xs text-muted-foreground mt-1">
        {/* {globals.helpText?.image?.[lang]} */}
        {globals.helpText?.image?.[lang]}
      </p>

      <input
        type="file"
        accept={globals.constraints?.image?.allowedMimeTypes?.join(",")}
        className="hidden"
        id={field.name}
        multiple
        onChange={handleImage}
        disabled={locked}
      />

      <label
        htmlFor={field.name}
        className="
          mt-4 flex flex-col items-center justify-center
          rounded-xl border border-dashed border-gray-300 bg-background
          hover:bg-muted transition min-h-[120px] cursor-pointer
          w-full
        "
      >
        <UploadCloud className="w-6 h-6 mb-2" />
        <span className="text-xs text-center">
          {lang === "en" ? "Click to upload" : "اضغط للتحميل"}
        </span>
      </label>

      {/* Preview */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((src, i) => (
            <img
              alt=""
              key={i}
              src={src}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </Card>
  );
}
