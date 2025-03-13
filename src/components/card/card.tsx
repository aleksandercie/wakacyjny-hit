import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Card = ({
  title,
  price,
  duration,
  date,
  photo,
  description
}: {
  title: string;
  price: number;
  duration: string;
  date: string;
  photo: string;
  description?: string;
}) => {
  return (
    <div className="relative w-full">
      <Link href="#" className="w-full">
        <div className="overflow-hidden rounded-md">
          <Image
            src={photo}
            alt={title}
            width={600}
            height={600}
            className="rounded-md object-cover w-full h-full"
          />
        </div>
        <p className="absolute top-3 left-3 bg-white py-1 px-2 rounded-3xl text-sm text-primary bg-secondary">
          {duration}
        </p>
        <div className="flex flex-col bg-white w-full p-2 bottom-2 text-base gap-1">
          <p className="text-primary text-base">{title}</p>
          <p className="opacity-60 text-sm">{date}</p>
          <p className="opacity-60 text-sm">od {price} zł/os</p>
          {description && <p className="opacity-60 text-sm">{description}</p>}
        </div>
      </Link>
    </div>
  );
};
