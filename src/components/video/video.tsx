'use client';

import React, { useEffect, useRef, useState } from 'react';

type VideoProps = {
  videoSrc: string;
  videoSrcMobile: string;
  poster?: string;
  fallbackImage?: string;
  className?: string;
};

export const Video = ({
  videoSrc,
  videoSrcMobile,
  poster,
  fallbackImage,
  className = '',
}: VideoProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDesktop, setIsDesktop] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [shouldShowVideo, setShouldShowVideo] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 720px)');
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);

    updateDesktop();

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return;

    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;

    const prefersReducedData = connection?.saveData === true;
    const slowConnection =
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g';

    if (prefersReducedData || slowConnection) {
      setUseFallback(true);
      return;
    }

    setShouldLoadVideo(true);

    const timeout = window.setTimeout(() => {
      setUseFallback(true);
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [isInView]);

  const currentSrc = isDesktop ? videoSrc : videoSrcMobile;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!useFallback && shouldLoadVideo ? (
        <video
          key={currentSrc}
          width={isDesktop ? 2048 : 720}
          height={isDesktop ? 988 : 1280}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="none"
          poster={poster}
          aria-hidden="true"
          onCanPlayThrough={() => setShouldShowVideo(true)}
          onLoadedData={() => setShouldShowVideo(true)}
          onError={() => setUseFallback(true)}
          className={
            isDesktop
              ? `w-full h-auto rounded-md pointer-events-none transition-opacity duration-300 ${
                  shouldShowVideo ? 'opacity-100' : 'opacity-0'
                }`
              : `w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md pointer-events-none transition-opacity duration-300 ${
                  shouldShowVideo ? 'opacity-100' : 'opacity-0'
                }`
          }
        >
          <source src={currentSrc} type="video/mp4" />
          Twoja przeglądarka nie obsługuje tagu video.
        </video>
      ) : null}

      {(useFallback || !shouldShowVideo) && (fallbackImage || poster) ? (
        <img
          src={fallbackImage || poster}
          alt=""
          aria-hidden="true"
          className={
            isDesktop
              ? 'w-full h-auto rounded-md'
              : 'w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md'
          }
        />
      ) : null}
    </div>
  );
};
