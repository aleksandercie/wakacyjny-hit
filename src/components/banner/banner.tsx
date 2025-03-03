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
    <div className="w-full  m-auto p-2">
      <div className="relative">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[500px] z-1">
          <h1 className="text-4xl font-semibold mb-6 max-w-[380px] mx-auto">
            {title}
          </h1>
          <p className="text-l">{description}</p>
        </div>
        {/* <div className="bg-black opacity-25 absolute w-full h-full p-2 rounded-md" /> */}
        {/* <Image
          src={image}
          width={1920}
          height={1329}
          alt={title}
          className="w-full h-auto rounded-md"
        /> */}
        <div className="w-full h-auto rounded-md">
          <Video videoSrc={video} width={2048} height={988} />
        </div>
      </div>
    </div>
  );
};
