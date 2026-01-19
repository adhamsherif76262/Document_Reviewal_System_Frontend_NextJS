// import imageCompression from "browser-image-compression";

// export async function compressImageIfNeeded(file: File): Promise<File> {
//   // Skip small files
//   if (file.size <= 300 * 1024) return file;

//   const options = {
//     maxSizeMB: 0.3,
//     maxWidthOrHeight: 1280,
//     useWebWorker: true,
//     maxIteration: 30,       // More attempts to hit the 0.3MB target
//     fileType: 'image/webp', // Highly recommended for 2026 standards
//   };

//   return await imageCompression(file, options);
// }


import imageCompression from 'browser-image-compression';

/**
 * Compresses an image if it exceeds 500KB.
 * Ensures the output does not exceed ~300KB or 1920px.
 */
export async function compressImageIfNeeded(file: File): Promise<File> {
    // 1. Validation: Skip if not an image or already small enough
    if (!file.type.startsWith('image/') || file.size <= 300 * 1024) {
        return file;
    }
    
    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        initialQuality: 0.5, // Optional: Start with high quality
        maxIteration: 50,       // More attempts to hit the 0.3MB target
        fileType: 'image/webp', // Highly recommended for 2026 standards
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    
    // alert("Compression Succeeded")
    // 2. Wrap the Blob back into a File to maintain original metadata
    return new File([compressedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Image compression failed:", error);
    // Return original file as fallback if compression fails
    return file;
  }
}
