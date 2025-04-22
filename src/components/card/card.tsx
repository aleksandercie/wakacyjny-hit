import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dynamicBlurDataUrl } from '@/lib/blurImage';

export const Card = async ({
  id,
  title,
  price,
  duration,
  date,
  photo,
  description
}: {
  id: string | number;
  title: string;
  price: number;
  duration: string;
  date: string;
  photo: string;
  description?: string;
}) => {
  const blurImage = await dynamicBlurDataUrl(photo, 600);

  return (
    <div className="relative w-full">
      <Link href={`/oferty/${id}`} className="w-full">
        <div className="overflow-hidden rounded-md">
          <Image
            src={photo}
            alt={title}
            width={600}
            height={600}
            className="rounded-md object-cover w-full"
            placeholder="blur"
            blurDataURL={blurImage}
          />
        </div>
        <p className="absolute top-3 left-3 bg-white py-1 px-2 rounded-3xl text-sm">
          {duration}
        </p>
        <div className="flex flex-col bg-white w-full p-2 bottom-2 text-base gap-1">
          <p className="text-base">{title}</p>
          <p className="text-gray-500 text-sm">{date}</p>
          <p className="text-gray-500 text-sm">od {price} zł/os</p>
          {description && (
            <p className="text-gray-500 text-sm w-4/5">{description}</p>
          )}
        </div>
      </Link>
    </div>
  );
};
