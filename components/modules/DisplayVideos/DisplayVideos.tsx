import { VisuallyHidden } from "@components/radixUI";
import { Card } from "@components/widgets";
import { DisplayVideosProps } from "@core/types";
import { useState } from "react";

export const DisplayVideos = ({
  variant,
  title,
  brandData,
  videos,
}: DisplayVideosProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  if (variant === "brand" && brandData) {
    return (
      <main>
        <VisuallyHidden>
          <h2>{title ?? brandData.name}</h2>
        </VisuallyHidden>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandData.backgroundImage}
          alt="Background Image"
          className="fixed top-0 left-0 object-contain"
        />
        <video
          src={brandData.backgroundVideo}
          autoPlay
          // eslint-disable-next-line react/no-unknown-property
          onEnded={() => setIsVideoPlaying(false)}
          className={`${
            isVideoPlaying ? "opacity-100" : "opacity-0 -z-10"
          } fixed top-0 left-0 transition-all`}
        />
        <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-transparent to-black" />

        <div className="mt-[35vw] mb-12 grid grid-cols-4 gap-4 z-10">
          {videos.map((video) => (
            <Card key={video.id} videoData={video} className="w-full" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      <h2 className="my-8 text-4xl text-white">{title}</h2>

      <div className="grid grid-cols-4 gap-4">
        {videos.map((video) => (
          <Card key={video.id} videoData={video} />
        ))}
      </div>
    </main>
  );
};
