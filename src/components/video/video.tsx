'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

export const Video = ({
  videoSrc,
  videoSrcMobile,
}: {
  videoSrc: string;
  videoSrcMobile: string;
}) => {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    const desktopEl = desktopRef.current;
    const mobileEl = mobileRef.current;
    if (desktopEl) observer.observe(desktopEl);
    if (mobileEl) observer.observe(mobileEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const video =
      window.innerWidth >= 720 ? desktopRef.current : mobileRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }, [isVisible]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card rounded-md animate-pulse opacity-50">
          <Loader2 className="size-8 text-muted-foreground animate-spin absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-2/3" />
        </div>
      )}
      <video
        ref={desktopRef}
        width={2048}
        height={988}
        controls={false}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onCanPlay={handleCanPlay}
        className={`w-full h-auto rounded-md hidden min-[720px]:block pointer-events-none transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isVisible && <source src={videoSrc} type="video/mp4" />}
      </video>
      <video
        ref={mobileRef}
        width={720}
        height={1280}
        controls={false}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onCanPlay={handleCanPlay}
        className={`w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md min-[720px]:hidden pointer-events-none transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isVisible && <source src={videoSrcMobile} type="video/mp4" />}
      </video>
    </div>
  );
};
