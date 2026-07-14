// components/SubmitFinalCertificate.tsx
"use client";

import { useState } from "react";
import { useSubmitCertificate } from "../app/hooks/useSubmitCertificate";
import { useParams, useRouter } from "next/navigation";
import { compressImageIfNeeded } from "../lib/compressImage";

type Props = {
  docId: string;
};

export default function SubmitFinalCertificate({ docId }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const { submitCertificate, loading, error, success } = useSubmitCertificate();
    const [fileTypeError , setFileTypeError] = useState<string>("");

    const router = useRouter()
    const {lang} = useParams()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    
      // Filter out any file that doesn't start with 'image/'
  const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));

  if (validImages.length !== selectedFiles.length) {
    if(lang === "ar"){
      setFileTypeError("غير مسموح برفع أي نوع ملفات غير الصور");
    }else{
      setFileTypeError("Only image files are allowed!");
    }
    // Optional: Clear the input if invalid files were found
    e.target.value = ""; 
    return;
  }
    setFileTypeError("")
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
        const result: File[] = [];
        for (let i = 0; i < files.length; i++) {
          const compressed = await compressImageIfNeeded(files[i]);
          result.push(compressed);
        }
    await submitCertificate(docId, result);
    setTimeout(() => {
        router.push(`/${lang}/dashboard`)
    }, 3000);
  };

  return (
    <div className="w-full max-w-full text-center space-y-4 border rounded-2xl p-4 shadow-2xl mt-6">
      <h2 className="text-lg font-semibold">{lang === "ar" ? "تقديم الشهادة النهائية" : "Submit Final Certificate"}</h2>

      <label htmlFor="Upload_Image_Input"  
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 inline-block">
        {lang === "ar" ? "اختيار ملفات الصور" : "Choose Certificate file(s)"}
      </label>

      {/* File Input */}
      <input
        id="Upload_Image_Input"
        placeholder=""
        title="Upload Final Certificate"
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="w-md border rounded-md p-2 text-md hidden"
      />

      {/* File Preview */}
      {files.length > 0 && (
        <div className="text-sm text-gray-600">
        {lang === "ar" ? `تم تحديد ${files.length} ملف` : `${files.length} file(s) selected}`}
          {/* {files.map((f , i)==>{<div></div>})} */}
          {files.map((f,i) => (<div key={i}>{f.name}</div>))}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || files.length === 0}
        className="w-3xs bg-black text-white py-2 rounded-md hover:bg-white hover:text-black hover:cursor-pointer transition-all duration-300 disabled:opacity-50 block mx-auto"
      >
        {
            lang === "ar" ? (loading ? "جارٍ التحميل..." : "رفع الشهادة") : ( loading ? "Uploading..." : "Submit Certificate")
        }
      </button>

      {/* Feedback */}
      {fileTypeError && <p className="text-red-500 text-lg">{fileTypeError}</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {success && <p className="text-green-600 text-lg">{success}</p>}
    </div>
  );
}