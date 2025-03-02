import React from 'react';
import Image from 'next/image';

export const Banner = ({
  image,
  title,
  description
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full  m-auto p-2">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center max-w-[600px] z-1">
          <h1 className="text-5xl font-semibold mb-6">{title}</h1>
          <p className="text-xl">{description}</p>
        </div>
        <div className="bg-black opacity-25 absolute w-full h-full p-2 rounded-md" />
        <Image
          src={image}
          width={1920}
          height={1329}
          alt={title}
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
};
