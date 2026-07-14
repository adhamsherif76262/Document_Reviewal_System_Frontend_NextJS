"use client";

import { useState } from "react";
import { useReviewCertificate } from "../app/hooks/useReviewCertificate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import ImageModalCarousel from "./docs/imageModalCarousel";
import { useParams, useRouter } from "next/navigation";

type Props = {
  Doc_Id: string;
  images: string[];
};

export default function ReviewCertificate({ Doc_Id, images }: Props) {
  const router = useRouter()
  const {lang} = useParams()
  const [comment, setComment] = useState("");
  const { reviewCertificate, loading, error, success } =
    useReviewCertificate();

  const handleApprove = async () => {
    await reviewCertificate(Doc_Id, "approve", comment);
    setTimeout(() => {
        router.push(`/${lang}/dashboard`)
    }, 3000);
  };

  const handleReject = async () => {
    // if (!comment.trim()) {
    //   alert("Comment is required when rejecting");
    //   return;
    // }
    await reviewCertificate(Doc_Id, "reject", comment);
    setTimeout(() => {
        router.push(`/${lang}/dashboard`)
    }, 3000);
  };
  
  
    const [open, setOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const plugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    )

  return (
    <div className="rounded-xl p-4 shadow-sm">
      {/* <h2 className="text-lg font-semibold">Review Certificate</h2> */}

      {/* Images Preview */}

        <div className='flex p-0 m-0 flex-row items-center justify-evenly rounded-4xl'>                                
          <Carousel
            // orientation="vertical"
            plugins={[plugin.current]}
            // opts={{
              //   align: "start",
            // }}
            className="w-full sm:max-w-[650px] xs:max-w-[300px] xxs:max-w-[250px] xxxs:max-w-[150px] py-0"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            {/* <CarouselContent className='h-[300px]'> */}
            {/* <CarouselContent className="xxxs:h-[200px] xxs:h-[325px] xs:h-[400px] sm:h-[525px] border-none shadow-none"> */}
            <CarouselContent className="border-none shadow-none">
              {images.map((img, index) => (
                // <CarouselItem key={index} className='py-0 msd:basis-1/2'>
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <div className="py-0">
                    <Card className='py-0 aspect-auto'>
                      <CardContent className="flex aspect-auto items-center justify-center p-0" 
                        onClick={() => {
                          setStartIndex(index);
                          setOpen(true);
                        }}
                      >
                        <Image 
                        loading='lazy'
                          className='font-black hover:blur-xs transition-all duration-500 hover:cursor-pointer rounded-lg object-contain max-h-[500px]' 
                        src={img}
                              // This CSS makes it behave like a standard <img> with auto-width
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '1000px'
                        }}
                        width={700} height={50} 
                        // fill
                          // sizes="(max-width: 640px) 90vw, 450px"
                          // priority={index === 0}
                        alt={`Certificate Image ${index + 1}`}></Image>
                        {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
              {
                (images?.length && images?.length > 1)  && (<><CarouselPrevious /><CarouselNext /></>)
              }
          </Carousel>
          {/* ===== MODAL (SEPARATE, DOES NOT AFFECT CAROUSEL) ===== */}
          {open && (
            <ImageModalCarousel
              images={images || []}
              startIndex={startIndex}
              onClose={() => setOpen(false)}
              />
            )}
        </div>

      {/* Comment Input */}
      <textarea
        placeholder={lang === "ar" ? "اضافة تعليق ..." : "Add a comment ..."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-md p-2 text-sm mt-8"
      />

      {/* Actions */}
      <div className="flex items-center justify-evenly gap-2 text-xl mt-4">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="flex-1 max-w-3xs bg-green-600 text-white py-2  px-0 rounded-md hover:bg-green-700 disabled:opacity-50 cursor-pointer transition-all duration-300"
        >
        {
            lang === "ar" ? (loading ? "جارٍ التحميل..." : " التصديق علي الشهادة") : ( loading ? "Processing..." : "Approve Certificate")
        }
          {/* {loading ? "Processing..." : "Approve"} */}
        </button>

        <button
          onClick={handleReject}
          disabled={loading}
          className="flex-1 max-w-3xs bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50 cursor-pointer transition-all duration-300"
          >
            {
                lang === "ar" ? (loading ? "جارٍ التحميل..." : "رفض الشهادة") : ( loading ? "Processing..." : "Reject Certificate")
            }
          {/* {loading ? "Processing..." : "Reject"} */}
        </button>
      </div>

      {/* Feedback */}
      {error && <p className="text-red-500 text-lg mt-4">{error}</p>}
      {success && <p className="text-green-600 text-lg text-center mt-4">{success}</p>}
    </div>
  );
}