// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious
// } from "@/components/ui/carousel"
// import Image from "next/image"

// export function ImageFieldCarousel({ images }: { images: string[] }) {
//   return (
//     <Carousel className="w-full max-w-full">
//       <CarouselContent className="h-[260px]">
//         {images.map((src, i) => (
//           <CarouselItem
//             key={i}
//             className="basis-full flex items-center justify-center"
//           >
//             <div className="relative h-full w-full">
//               <Image
//                 src={src}
//                 alt={`image-${i}`}
//                 fill
//                 sizes="(max-width: 768px) 90vw, 400px"
//                 className="object-contain rounded-lg"
//                 priority={i === 0}
//               />
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       {images.length > 1 && (
//         <>
//           <CarouselPrevious />
//           <CarouselNext />
//         </>
//       )}
//     </Carousel>
//   )
// }


// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import ImageModalCarousel from './imageModalCarousel';

// type Props = {
//   images: string[];
// };

// export default function ImageFieldCarousel({ images }: { images: string[] }) {
//   const [open, setOpen] = useState(false);
//   const [startIndex, setStartIndex] = useState(0);

//   return (
//     <>
//       {/* INLINE CAROUSEL */}
//       <div className="relative group w-full overflow-hidden rounded-xl">
//         <Image
//           src={images[0]}
//           alt="Document image"
//           width={600}
//           height={400}
//           className="
//             w-full h-56 object-cover rounded-xl
//             transition-all duration-300
//             group-hover:blur-sm
//           "
//         />

//         {/* HOVER OVERLAY */}
//         <div
//           onClick={() => {
//             setStartIndex(0);
//             setOpen(true);
//           }}
//           className="
//             absolute inset-0
//             bg-black/40
//             opacity-0
//             group-hover:opacity-100
//             transition-opacity
//             flex items-center justify-center
//             cursor-pointer
//           "
//         >
//           <span className="text-white font-bold text-lg tracking-wide">
//             View images separately
//           </span>
//         </div>
//       </div>

//       {/* MODAL */}
//       {open && (
//         <ImageModalCarousel
//           images={images}
//           startIndex={startIndex}
//           onClose={() => setOpen(false)}
//         />
//       )}
//     </>
//   );
// }


'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ImageModalCarousel from './imageModalCarousel';

export default function ImageFieldCarousel({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      {/* ===== INLINE CAROUSEL (UNCHANGED STRUCTURE) ===== */}
      <Carousel className="w-full max-w-full">
        <CarouselContent className="h-[260px]">
          {images.map((src, i) => (
            <CarouselItem
              key={i}
              className="basis-full flex items-center justify-center"
            >
              {/* 🔹 ONLY ADDITION: wrapper + overlay */}
              <div
                className="relative h-full w-full group cursor-pointer"
                onClick={() => {
                  setStartIndex(i);
                  setOpen(true);
                }}
              >
                <Image
                  src={src}
                  alt={`image-${i}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="
                    object-contain rounded-lg
                    transition-all duration-300
                    group-hover:blur-sm
                    "
                  priority={i === 0}
                  // onError={(e) => {
                  //   e.currentTarget.src = "/placeholder.png";
                  // }}
                />

                {/* 🔹 HOVER OVERLAY */}
                <div
                  className="
                    duration-700
                    absolute inset-0
                    bg-black/40
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    flex items-center justify-center
                  "
                >
                  <span className="text-white font-bold text-sm text-center px-3">
                    View images separately
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* ===== MODAL (SEPARATE, DOES NOT AFFECT CAROUSEL) ===== */}
      {open && (
        <ImageModalCarousel
          images={images}
          startIndex={startIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
