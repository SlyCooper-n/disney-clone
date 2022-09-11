import { CardProps } from "@core/types";
import Image from "next/image";
import Link from "next/link";

export const Card = ({
  variant = "video",
  brandData,
  videoData,
  className,
}: CardProps) => {
  if (variant === "brand" && brandData) {
    return (
      <Link href={`/brands/${brandData.slug}`}>
        <a className="group relative min-w-[50px] aspect-square sm:aspect-video flex justify-center items-center rounded-md border-2 border-zinc-700 shadow-xl bg-base-200 hover:ring-2 hover:ring-white hover:scale-105 transition-all duration-300">
          <video
            src={brandData.backgroundGif}
            autoPlay
            loop
            className="w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          />

          <Image
            src={brandData.logo}
            alt={`${brandData.name} logo`}
            layout="fill"
            className="object-contain"
          />
        </a>
      </Link>
    );
  }

  if (!videoData) return null;

  return (
    <Link href={`/${videoData.type}s/${videoData.slug}`}>
      <a
        className={`group relative min-w-[50px] max-w-[300px] max-h-[250px] aspect-[9/13] sm:aspect-video flex justify-center items-center rounded-md border-2 border-zinc-700 shadow-xl bg-base-200 hover:ring-2 hover:ring-white hover:scale-105 transition-all duration-300 ${className}`}
      >
        <Image
          src={videoData.thumbnailY}
          alt={`${videoData.slug} logo`}
          layout="fill"
          className="sm:opacity-0 sm:pointer-events-none object-cover"
        />
        <Image
          src={videoData.thumbnailX}
          alt={`${videoData.slug} logo`}
          layout="fill"
          className="opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto object-cover"
        />
      </a>
    </Link>
  );
};
