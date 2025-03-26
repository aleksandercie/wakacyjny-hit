'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';

export const Video = ({
  videoSrc,
  videoSrcMobile
}: {
  videoSrc: string;
  videoSrcMobile: string;
}) => {
  const isMobile = useIsMobile();

  const selectedSrc = isMobile ? videoSrcMobile : videoSrc;
  const width = isMobile ? 960 : 2048;
  const height = isMobile ? 540 : 988;

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
      <source src={selectedSrc} type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu video.
    </video>
  );
};
