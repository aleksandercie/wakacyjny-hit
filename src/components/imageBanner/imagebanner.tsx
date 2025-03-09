import React from 'react';
import Image from 'next/image';

export const ImageBanner = ({
  title,
  description,
  image,
  alt
}: {
  title?: string;
  description?: string;
  image: string;
  alt: string;
}) => {
  return (
    <div className="w-full m-auto">
      <div className="relative">
        {title ||
          (description && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[500px] z-1">
              {title && (
                <h1 className="text-4xl font-bold mb-6 max-w-[380px] mx-auto">
                  {title}
                </h1>
              )}
              {description && <p className="text-l">{description}</p>}
            </div>
          ))}

        {/* <div className="bg-black opacity-25 absolute w-full h-full p-2 rounded-md" /> */}
        <div className="w-full max-h-[500px] overflow-hidden rounded-md ">
          {' '}
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
