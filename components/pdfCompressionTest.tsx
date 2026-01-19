"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Download } from "lucide-react";
import { compressPdf } from "../lib/compressPdf";

export default function PDFUploadFieldTester() {
  const [pending, setPending] = useState<
    { id: string; name: string; sizeBefore: number; sizeAfter?: number; loading: boolean; file?: File }[]
  >([]);
  
  const handlePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // 🔄 Reset
    setPending([]);

    const pendingItems = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      sizeBefore: file.size,
      loading: true,
    }));

    setPending(pendingItems);

    for (let i = 0; i < files.length; i++) {
      const compressed = await compressPdf(files[i]);

      setPending(prev =>
        prev.map(p =>
          p.name === files[i].name
            ? {
                ...p,
                loading: false,
                sizeAfter: compressed.size,
                file: compressed,
              }
            : p
        )
      );
    }
  };

  const downloadFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">PDF Compression Tester</h2>

      <input
        title="s"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handlePdf}
        className="mb-4"
      />

      <div className="flex flex-col gap-3">
        {pending.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 border rounded-xl bg-muted"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="truncate">{p.name}</span>
            </div>

            <div className="flex items-center gap-4">
              {p.loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <span className="text-sm">
                  {p.sizeAfter
                    ? `Before: ${(p.sizeBefore / 1024).toFixed(
                        1
                      )} KB | After: ${(p.sizeAfter / 1024).toFixed(1)} KB`
                    : `${(p.sizeBefore / 1024).toFixed(1)} KB`}
                </span>
              )}

              {!p.loading && p.file && (
                <Button
                  size="sm"
                  onClick={() => downloadFile(p.file)}
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" /> Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
