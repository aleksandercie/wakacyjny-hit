'use client';

import React, { useRef, useEffect, useState } from 'react';

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

  return (
    <>
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
        className="w-full h-auto rounded-md hidden min-[720px]:block pointer-events-none"
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
        className="w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md min-[720px]:hidden pointer-events-none"
      >
        {isVisible && <source src={videoSrcMobile} type="video/mp4" />}
      </video>
    </>
  );
};
