'use client';

import React from 'react';

export const Video = ({
  videoSrc,
  videoSrcMobile
}: {
  videoSrc: string;
  videoSrcMobile: string;
}) => {
  return (
    <>
      <video
        width={2048}
        height={988}
        controls={false}
        autoPlay
        muted
        loop
        className="w-full h-auto rounded-md hidden min-[720px]:block"
      >
        <source src={videoSrc} type="video/mp4" />
        Twoja przeglądarka nie obsługuje tagu video.
      </video>
      <video
        width={720}
        height={1280}
        controls={false}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover object-top min-[500px]:object-bottom rounded-md  min-[720px]:hidden"
      >
        <source src={videoSrcMobile} type="video/mp4" />
        Twoja przeglądarka nie obsługuje tagu video.
      </video>
    </>
  );
};
