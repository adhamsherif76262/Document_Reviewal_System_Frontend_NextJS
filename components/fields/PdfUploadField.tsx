// fields/PdfUploadField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { LockedOverlay } from "../../components/LockedOverlay";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Loader2, FileText } from "lucide-react";
import { compressPdf } from "../../lib/compressPdf";
import { useState } from "react";

export function PdfUploadField({
  field,
  lang,
  globals,
  value = [],
  onChange,
  locked = false,
  error,
}: any) {

  
    const fileInputRef = useRef<HTMLInputElement>(null);
  
//     const [pending, setPending] = useState<
//   { id: string; name: string; loading: boolean }[]
// >([]);
const [pending, setPending] = useState<any[]>([]);

// pending: { id: string; file: File; preview?: string; loading: boolean }


  // const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const files = Array.from(e.target.files);
  //   onChange(files);
  // };

  const handlePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || locked) return;

  const files = Array.from(e.target.files);

  // 🔥 CLEAR OLD SELECTION IMMEDIATELY
  onChange([]);
  setPending([]);

  const pendingItems = files.map(file => ({
    id: crypto.randomUUID(),
    name: file.name,
    loading: true,
  }));

  setPending(pendingItems);

  const finalFiles: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const compressed = await compressPdf(files[i]);
    finalFiles.push(compressed);

    // ✅ mark loader done
    setPending(prev =>
      prev.map(p =>
        p.name === files[i].name ? { ...p, loading: false } : p
      )
    );
  }

  setPending([]);
  onChange(finalFiles);
};

// const handlePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (!e.target.files || locked) return;

//   // Reset old selection immediately
//   onChange([]);
//   const files = Array.from(e.target.files);

//   const pendingFiles = files.map(f => ({
//     id: crypto.randomUUID(),
//     file: f,
//     loading: true,
//   }));

//   setPending(pendingFiles);

//   const compressedFiles: File[] = [];

//   for (const pf of pendingFiles) {
//     try {
//       const compressed = await compressPdf(pf.file, progress => {
//         // optional: update per-file progress
//       });

//       compressedFiles.push(compressed);

//       // Update pending state
//       setPending(prev =>
//         prev.map(p => (p.id === pf.id ? { ...p, loading: false } : p))
//       );
//     } catch (err) {
//       console.error("PDF compression error", err);
//       setPending(prev =>
//         prev.map(p => (p.id === pf.id ? { ...p, loading: false } : p))
//       );
//     }
//   }

//   // Trigger parent onChange
//   onChange(compressedFiles);
// };


  
  const resetFileInput = () => {
    if (fileInputRef.current) {
      // ✅ HARD RESET UI IMMEDIATELY
      onChange([]);
      fileInputRef.current.value = ''; // or null
      console.log('File input reset.');
    }
  };

  return (
    <Card className="relative border-dashed border-2 rounded-2xl p-5 flex items-center justify-center">
      {locked && <LockedOverlay />}
      <Label className="font-black font-sans text-xl text-center">{field.label[lang]}</Label>
      <p dir={lang === "ar" ? "rtl" : "ltr"}  className="text-muted-foreground mt-1 font-black font-sans text-xl text-center">
        {globals.helpText?.pdf?.[lang]}
      </p>

      <Button type="button" onClick={resetFileInput}
        className="
          text-xl font-black px-4 py-2 rounded-2xl shadow-2xl
          hover:bg-gray-200 hover:text-black hover:cursor-pointer transition-all duration-400
        ">
        {lang === "ar" ? "مسح جميع الملفات" : "Reset File Input"}
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        id={field.name}
        multiple
        onChange={handlePdf}
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
          {lang === "en" ? "Click to upload PDF" : "اضغط لتحميل PDF"}
        </span>
      </label>

      {/* Preview file names */}
      {/* {value.length > 0 && (
        <div className="flex flex-col mt-2 text-muted-foreground font-black font-sans text-xl text-center">
          {value.map((file: File | string, i: number) => (

            <div key={i} className="flex flex-row items-center justify-between">
              <FileText className="h-6 w-6" /><span  className="truncate">
              {typeof file === "string" ? file : file.name}
            </span></div>
          ))}
        </div>
      )} */}

      {(pending.length > 0 || value.length > 0) && (
        <div className="flex flex-col gap-2 mt-4 w-full">

          {/* 🔄 Pending PDFs */}
          {pending.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-2 p-2 border rounded-xl bg-muted"
            >
              <FileText className="w-5 h-5 opacity-50" />
              <span className="flex-1 truncate">{p.name}</span>
              {p.loading && (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              )}
            </div>
          ))}

{/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-3">
  {pending.map(p => (
    <div
      key={p.id}
      className="relative w-32 h-32 border rounded-2xl flex items-center justify-center bg-muted"
    >
      <FileText className="w-6 h-6 text-gray-500 absolute" />
      {p.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
          <Loader2 className="w-6 h-6 h-6 animate-spin text-blue-600" />
        </div>
      )}
      <span className="absolute bottom-1 text-xs truncate w-full text-center">
        {p.file.name}
      </span>
    </div>
  ))}
</div> */}

          {/* ✅ Final PDFs */}
          {value.map((file: File | string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 border rounded-xl"
            >
              <FileText className="w-5 h-5" />
              <span className="truncate">
                {typeof file === "string" ? file : file.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {
        error && (
          <ul>
            {
            error.map((err : any , index : any)=>(
              <li key={err}  className="font-black text-lg text-red-500 mt-2">{err}</li>
            ))
          }
          </ul>
        )
      }
    </Card>
  );
}
