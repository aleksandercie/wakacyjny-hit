import React from 'react';
import Image from 'next/image';

export const ImageBanner = ({
  title,
  image,
  alt
}: {
  title?: string;
  image: string;
  alt: string;
}) => {
  return (
    <div className="w-full m-auto">
      <div className="relative">
        {title && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[800px] z-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 mx-auto">
              {title}
            </h1>
          </div>
        )}

        {/* <div className="bg-black opacity-25 absolute w-full h-full p-2 rounded-md" /> */}
        <div className="w-full max-h-[500px] overflow-hidden rounded-md ">
          <Image
            src={image}
            width={1920}
            height={1329}
            alt={alt}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
