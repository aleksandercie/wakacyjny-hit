import React from 'react';
import { Video } from '../video';

export const Banner = ({
  video,
  title,
  description
}: {
  video: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full m-auto">
      <div className="relative">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[600px] z-1">
          <h1 className="text-6xl font-bold mb-6 w-full mx-auto">{title}</h1>
          <p className="text-xl">{description}</p>
        </div>
        <div className="w-full h-auto rounded-md">
          <Video videoSrc={video} width={2048} height={988} />
        </div>
      </div>
    </div>
  );
};
