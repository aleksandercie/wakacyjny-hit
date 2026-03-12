'use client';

import React, { useEffect, useState } from 'react';

export const Video = ({
  videoSrc,
  videoSrcMobile,
}: {
  videoSrc: string;
  videoSrcMobile: string;
}) => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 720px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 720px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isDesktop) {
    return (
      <video
        width={2048}
        height={988}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="w-full h-auto rounded-md pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
        Twoja przeglądarka nie obsługuje tagu video.
      </video>
    );
  }

  return (
    <video
      width={720}
      height={1280}
      controls={false}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md pointer-events-none"
    >
      <source src={videoSrcMobile} type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu video.
    </video>
  );
};
