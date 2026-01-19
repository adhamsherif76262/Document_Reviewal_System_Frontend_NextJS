"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";

export default function ImageCompressionTest() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);

    // 🔥 Only compress if > 500kb
    if (file.size <= 500 * 1024) {
      setCompressedFile(file);
      return;
    }

    const options = {
      maxSizeMB: 0.5, // 500kb
      maxWidthOrHeight: 1920, // safe default
      useWebWorker: true,
    };

    const compressed = await imageCompression(file, options);
    setCompressedFile(compressed);
  }

  function kb(size: number) {
    return (size / 1024).toFixed(2);
  }

  return (
    <div className="space-y-4 border p-4 rounded-xl max-w-md">
      <input title="s" type="file" accept="image/*" onChange={handleChange} />

      {originalFile && (
        <p className="text-sm">
          📸 Original size: <b>{kb(originalFile.size)} KB</b>
        </p>
      )}

      {compressedFile && (
        <>
          <p className="text-sm">
            🗜️ Compressed size: <b>{kb(compressedFile.size)} KB</b>
          </p>

          <a
            href={URL.createObjectURL(compressedFile)}
            download={compressedFile.name}
            className="text-blue-600 underline text-sm"
          >
            ⬇ Download compressed image
          </a>
        </>
      )}
    </div>
  );
}
