import React from 'react';
import { Video } from '../video';

export const Banner = ({
  video,
  videoMobile,
  title,
  description
}: {
  video: string;
  videoMobile: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full m-auto">
      <div className="relative">
        <div className="absolute top-[90px] min-[500px]:top-3/5 min-[720px]:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[700px] z-1 w-full px-4">
          <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 w-full mx-auto">
            {title}
          </h1>
          <p className="text-s xs:text-m sm:text-l md:text-xl">{description}</p>
        </div>
        <div className="w-full h-[600px] md:h-auto rounded-md overflow-hidden">
          <Video videoSrc={video} videoSrcMobile={videoMobile} />
        </div>
      </div>
    </div>
  );
};
