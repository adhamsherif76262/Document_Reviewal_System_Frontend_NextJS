"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { LockedOverlay } from "../../components/LockedOverlay";
import Image from "next/image"
import ImageModalCarousel from "../docs/imageModalCarousel";
import { compressImageIfNeeded } from "../../lib/compressImage";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// type PendingImage = {
//   id: string;
//   preview: string;
//   loading: boolean;
// };

export function ImageUploadField({
  field,
  form,
  doc,
  mode,
  lang,
  globals,
  value = [],
  onChange,
  locked = false,
  onClear,
  error,
}: any) {

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  // const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [localFiles, setLocalFiles] = useState<File[]>(value);
  const [pending, setPending] = useState<any[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const compressAbortRef = useRef({ cancelled: false });

const resetFileInput = () => {
  if (fileInputRef.current) {
    fileInputRef.current.value = ''; // reset the native input
  }
  
  // 1️⃣ Clear internal state for UI
  setLocalFiles([]);
  setPending([]);
  setRawFiles([]);
    // compressAbortRef.current.cancelled = true;

  // 2️⃣ Clear the value in the form
  // if (onChange) 
    onChange([]); // very important!

  // 3️⃣ Clear errors for this field
  // if (onClear) 
    // onClear(); // optional callback to clear field errors

  // 4️⃣ Re-validate form immediately to disable submit & show required errors
  // if(form?.validate)

  /*** Commented Recently To Solve The Error Of The Resubmission Form ****/

  // if(mode === "resubmission" && form.isFormValid())
  //   {
  //     alert("validate Called From Butotn")
  //     form.validate(false); 
  //   }
};



  const previews = useMemo(() => {
    if (!Array.isArray(value)) return [];

    return localFiles.map((file: File | string) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );
  }, [localFiles]);

useEffect(() => {
  if (rawFiles.length === 0) return;

  compressAbortRef.current.cancelled = false;
  // const cancelled = false;

  async function compress() {
    const result: File[] = [];
    for (let i = 0; i < rawFiles.length; i++) {
      const compressed = await compressImageIfNeeded(rawFiles[i]);
      if (compressAbortRef.current.cancelled) return;
      result.push(compressed);
      setPending(p =>
        p.map((x, idx) => (idx === i ? { ...x, loading: false } : x))
      );
    }

    if (!compressAbortRef.current.cancelled) {
      setPending([]);
      setLocalFiles(result);
      onChange(result);
    }
  }

  compress();

  return () => {
    compressAbortRef.current.cancelled = true;
  };
}, [rawFiles]);


const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || locked) return;

  const files = Array.from(e.target.files);

  // ✅ HARD RESET UI IMMEDIATELY
  // value = []
  setLocalFiles([]);
  setPending([]);
  setRawFiles([]);

  const placeholders = files.map(file => ({
    id: crypto.randomUUID(),
    preview: URL.createObjectURL(file),
    loading: true,
  }));

  setPending(placeholders);

  // 🚨 DEFER compression to next tick
  setTimeout(() => {
    setRawFiles(files);
  }, 0);

  e.target.value = "";
};



  return (

    <Card className="relative border-dashed border-2 rounded-2xl p-5 flex items-center justify-center" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* {doc.fields[field.name].review.status} */}
      {/* {field.name} */}
      {locked && <LockedOverlay lang={lang} fieldState={doc.fields[field.name].review.status} field={field} doc={doc}/>}
      {/* <LockedOverlay lang={lang} /> */}

      <Label className="font-black font-sans text-xl text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
        {field.label[lang]}
      </Label>

      <p dir={lang === "ar" ? "rtl" : "ltr"}  className="text-muted-foreground mt-1 font-black font-sans text-xl text-center">
        {globals.helpText?.image?.[lang]}
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
        id={field.name}
        multiple
        disabled={locked}
        accept={globals.constraints?.image?.allowedMimeTypes?.join(",")}
        className="hidden"
        onChange={handleImage}
      />

      <label
        htmlFor={field.name}
        className="
          mt-4 flex flex-col items-center justify-center
          rounded-xl border border-dashed border-gray-300
          bg-background hover:bg-muted transition
          min-h-[120px] cursor-pointer w-full
        "
      >
        <UploadCloud className="w-6 h-6 mb-2" />
        <span className="text-xs text-center">
          {lang === "en" ? "Click to upload" : "اضغط للتحميل"}
        </span>
      </label>


      {/* 🖼 Preview */}
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2 gap-2 mt-3 mx-auto">
          {/* 🔄 Pending images */}
          {pending.map(p => (
            <div
              key={p.id}
              className="relative w-24 h-24 rounded-2xl border flex items-center justify-center bg-muted"
            >
              <Image
                src={p.preview}
                alt=""
                width={100}
                height={100}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40"
              />

              {p.loading && (
                <Loader2 className="w-6 h-6 animate-spin text-primary z-10" />
              )}
            </div>
          ))}

          {/* ✅ Final images */}
           {previews.map((src :any, i:any) => (
             <Image
             onClick={() => {
               setStartIndex(i);
               setOpen(true);
             }}
             width={100}
             height={100}
               key={src}
               src={src}
               alt=""
               className="w-50 h-50 object-cover rounded-2xl border hover:blur-xs transition-all duration-500 hover:cursor-pointer"
             >
             </Image>
           ))}
           {open && (
             <ImageModalCarousel
               images={previews || []}
               startIndex={startIndex}
               onClose={() => setOpen(false)}
             />
           )}
        </div>

      {
        error && (
          <ul className="p-5 list-disc list-inside space-y-1">
            {
            error.map((err : any , index : any)=>(
              <li key={index}  className="text-center font-black text-lg text-red-500 mt-2">{err}</li>
            ))
          }
          </ul>
        )
      }
    </Card>
  );
}
