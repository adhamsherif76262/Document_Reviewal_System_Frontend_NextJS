/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { PDFDocument } from "pdf-lib";

const MAX_PDF_SIZE = 100 * 1024; // 500 KB
const COMPRESS_THRESHOLD = 1024 * 1024; // 1 MB

export async function compressPdf(file: File): Promise<File> {
  if (file.size <= COMPRESS_THRESHOLD) {
    return file; // ✅ no compression needed
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // 🔹 Save with compression options
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    compress: true,
  });

  // ❌ If compression didn't help, keep original
  if (compressedBytes.length >= file.size) {
    return file;
  }

  // ⚠️ Safety: do not over-compress
  if (compressedBytes.length > MAX_PDF_SIZE) {
    // still better than original, accept
  }

  return new File([compressedBytes], file.name, {
    type: "application/pdf",
    lastModified: Date.now(),
  });
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { PDFDocument } from "pdf-lib";
// import imageCompression from "browser-image-compression";

// /**
//  * Compress a PDF by recompressing its embedded images.
//  * @param file PDF file
//  * @param setProgress Optional callback for per-file loading
//  * @returns Compressed PDF file (Blob)
//  */
// export async function compressPdf(
//   file: File,
//   setProgress?: (progress: number) => void
// ): Promise<File> {
//   const fileSizeMB = file.size / 1024 / 1024;

//   // Skip small files (<1MB)
//   if (fileSizeMB < 1) return file;

//   // Load PDF
//   const arrayBuffer = await file.arrayBuffer();
//   const pdfDoc = await PDFDocument.load(arrayBuffer);

//   const pages = pdfDoc.getPages();

//   let pageIndex = 0;

//   for (const page of pages) {
//     const xObjects = page.node.Resources()?.XObject?.object || {};

//     for (const key of Object.keys(xObjects)) {
//       const xObject = xObjects[key];

//       try {
//         // Only process images
//         const img = pdfDoc.context.lookup(xObject);
//         if (!img || !img.dict) continue;
//         const subtype = img.dict.get("Subtype")?.name;
//         if (subtype !== "Image") continue;

//         const rawBytes = img.contents;

//         // Convert raw bytes to Blob
//         const blob = new Blob([rawBytes]);

//         // Compress using browser-image-compression
//         const compressedBlob = await imageCompression(blob, {
//           maxSizeMB: 0.5, // target max size per image 500kb
//           maxWidthOrHeight: 1920, // optional resize
//           useWebWorker: true,
//         });

//         const compressedArrayBuffer = await compressedBlob.arrayBuffer();

//         // Replace image in PDF
//         const newImage = await pdfDoc.embedJpg(compressedArrayBuffer).catch(async () => {
//           return pdfDoc.embedPng(compressedArrayBuffer);
//         });

//         page.node.Resources()?.XObject?.set(key, newImage.ref);

//       } catch (err) {
//         console.warn("Error compressing PDF image:", err);
//       }
//     }

//     pageIndex++;
//     // Optional progress callback (0–100)
//     if (setProgress) setProgress(Math.round((pageIndex / pages.length) * 100));
//   }

//   // Save new PDF
//   const compressedBytes = await pdfDoc.save();

//   return new File([compressedBytes], file.name, { type: "application/pdf" });
// }
