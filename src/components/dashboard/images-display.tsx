"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { imagesDisplay } from "@/constants/images";
import Image from "next/image";

export const ImagesDisplay = () => {
  const [currentImageIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const updateImage = () => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % imagesDisplay.length
      );
    };

    const interval = setInterval(updateImage, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = imagesDisplay[currentImageIndex];

  return (
    <div className="w-full h-full relative rounded-2xl">
      <Image
        fill
        alt="images"
        src={currentQuote.image}
        className="rounded-2xl object-center object-cover"
        loading="lazy"
      />
    </div>
  );
};
