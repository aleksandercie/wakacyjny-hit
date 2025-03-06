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
      <div className="overflow-hidden h-full rounded-md">
        <Image
          src={photo}
          alt={title}
          width={680}
          height={320}
          className="rounded-md object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300 ease-in-out shadow-[14px_17px_34px_-4px_rgba(0,_0,_0,_0.1)]"
        />
      </div>

      <p className="absolute top-2 left-2 bg-white py-1 px-2 rounded-3xl text-xs text-primary">
        {duration}
      </p>
      <div className="flex flex-col bg-white absolute w-[94%] rounded-md p-2 left-1/2 transform -translate-x-1/2 bottom-2">
        <div className="flex justify-between text-sm text-primary">
          <p>{date}</p>
          <p>od {price} zł/os</p>
        </div>
        <p className="text-primary font-bold">{title}</p>
      </div>
    </div>
  );
};
