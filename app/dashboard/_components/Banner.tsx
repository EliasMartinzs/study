"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const backgrounds = [
  "background-1.webp",
  "background-2.webp",
  "background-3.webp",
  "background-4.webp",
] as const;

export function Banner() {
  const [countImg, setCountImg] = useState<number>(1);

  useEffect(() => {
    const intervalImg = setInterval(() => {
      setCountImg((prevState) => (prevState + 1) % backgrounds.length);
    }, 300000);

    return () => clearInterval(intervalImg);
  }, []);

  return (
    <div className="relative h-48">
      <Image
        src={`/${backgrounds[countImg]}`}
        alt={backgrounds[countImg]}
        className="object-cover object-center"
        fill
        priority
      />
    </div>
  );
}
