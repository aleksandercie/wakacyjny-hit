import React from 'react';
import Image from 'next/image';

export const Card = ({
  title,
  price,
  duration,
  date,
  photo
}: {
  title: string;
  price: number;
  duration: string;
  date: string;
  photo: string;
}) => {
  return (
    <div className="relative w-1/3 h-[480px] group">
      <Image
        src={photo}
        alt={title}
        width={680}
        height={320}
        className="rounded-md object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
      />

      <p className="absolute top-2 left-2 bg-black/10 backdrop-blur-lg py-1 px-2 rounded-3xl text-xs text-white">
        {duration}
      </p>
      <div className="flex flex-col bg-black/10 backdrop-blur-lg absolute bottom-2 w-[94%] rounded-md p-2 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-between text-sm text-white">
          <p>{date}</p>
          <p>od {price} zł/os</p>
        </div>
        <p className="text-white font-semibold">{title}</p>
      </div>
    </div>
  );
};
