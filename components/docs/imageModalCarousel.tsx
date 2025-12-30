'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl cursor-pointer hover:text-red-600 font-black transition-all duration-300"
        >
          ✕
        </button>

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
