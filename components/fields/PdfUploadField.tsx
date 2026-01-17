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
    <Card className="relative border-dashed border-2 rounded-2xl p-4">
      {locked && <LockedOverlay />}
      <Label className="font-semibold text-sm">{field.label[lang]}</Label>
      <p className="text-xs text-muted-foreground mt-1">
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
        <div className="flex flex-col mt-2 text-xs text-muted-foreground">
          {value.map((file: File | string, i: number) => (
            <span key={i} className="truncate">
              {typeof file === "string" ? file : file.name}
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </Card>
  );
}
