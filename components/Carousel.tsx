"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export const CarouselBox = () => {
  const images = [
    "https://i.ytimg.com/vi/OXHTlMPbX7o/hq720.jpg",
    "https://img.studioflicks.com/wp-content/uploads/2025/04/22121941/God-Bless-U-Video-Song-Good-Bad-Ugly.jpg",
    "https://i.ytimg.com/vi/V0rJw2sC2_E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC3rFwkAainhzPAZbRORKUQgx4EpQ",
    "https://i.ytimg.com/vi/TAP53O3uQuo/maxresdefault.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={src} alt={`slide-${i}`} fill className="object-cover" />
        </div>
      ))}

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`btn btn-xs ${i === index ? "btn-primary" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
