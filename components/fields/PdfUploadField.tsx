// fields/PdfUploadField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { LockedOverlay } from "../../components/LockedOverlay";

export function PdfUploadField({
  field,
  lang,
  globals,
  value = [],
  onChange,
  locked = false,
  error,
}: any) {
  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    onChange(files);
  };

  return (
    <Card className="relative border-dashed border-2 rounded-2xl p-5 flex items-center justify-center">
      {locked && <LockedOverlay />}
      <Label className="font-black font-sans text-xl text-center">{field.label[lang]}</Label>
      <p dir={lang === "ar" ? "rtl" : "ltr"}  className="text-muted-foreground mt-1 font-black font-sans text-xl text-center">
        {globals.helpText?.pdf?.[lang]}
      </p>

      <input
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
      {value.length > 0 && (
        <div className="flex flex-col mt-2 text-muted-foreground font-black font-sans text-xl text-center">
          {value.map((file: File | string, i: number) => (
            <span key={i} className="truncate">
              {typeof file === "string" ? file : file.name}
            </span>
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
