'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {Download} from "lucide-react"
type Props = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

export default function ImageModalCarousel({
  images,
  startIndex,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);

  const handleDownload = async () => {
  const imageUrl = images[index];

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = imageUrl.split('/').pop() || 'image';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to download image', err);
  }
};

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl w-full px-6">
        {/* CLOSE + DOWNLOAD */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <button
            disabled={!images[index]}
            onClick={handleDownload}
            className="text-white text-3xl cursor-pointer hover:text-green-500 font-black transition-all duration-300"
            title="Download image"
          >
            {/* ⬇ */}
            <Download className='w-7 h-7'></Download>
          </button>

          <button
            onClick={onClose}
            className="text-white text-3xl cursor-pointer hover:text-red-600 font-black transition-all duration-300"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[70vh]">
          <Image
            src={images[index]}
            alt="Preview"
            fill
            className="object-contain rounded-xl"
          />
        </div>

        {/* CONTROLS */}
        {images.length > 1 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() =>
                setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className="text-white text-xl cursor-pointer hover:text-red-600 font-black transition-all duration-300"
            >
              ‹ Previous
            </button>

            <button
              onClick={() =>
                setIndex((prev) => (prev + 1) % images.length)
              }
              className="text-white text-xl cursor-pointer hover:text-red-600 font-black transition-all duration-300"
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
