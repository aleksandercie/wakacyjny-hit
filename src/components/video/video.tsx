import React from 'react';

export const Video = ({
  videoSrc,
  width = 640,
  height = 360
}: {
  videoSrc: string;
  width: number;
  height: number;
}) => {
  return (
    <video
      width={width}
      height={height}
      controls={false}
      autoPlay
      muted
      loop
      className="w-full h-auto rounded-md"
    >
      <source src={videoSrc} type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu video.
    </video>
  );
};
