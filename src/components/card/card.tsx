import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export const Card = ({
  id,
  title,
  price,
  duration,
  date,
  photo,
  description,
  variant,
  expired,
}: {
  id: string | number;
  title: string;
  price: number;
  duration: string;
  date: string;
  photo: string;
  description?: string;
  variant: 'small' | 'large';
  expired?: boolean;
}) => {
  const { OFFERS } = ROUTES;
  const isLarge = variant === 'large';

  return (
    <div className="relative w-full">
      <Link href={`${OFFERS}/${encodeURIComponent(id)}`} className="w-full">
        <div className={`overflow-hidden rounded-md aspect-[3/2]`}>
          <Image
            src={photo}
            alt={title}
            width={isLarge ? 600 : 492}
            height={isLarge ? 400 : 328}
            className={`rounded-md object-cover w-full h-full ${
              expired ? 'opacity-40' : ''
            }`}
          />
        </div>
        <p className="absolute top-3 left-3 bg-background py-1 px-2 rounded-3xl text-sm">
          {duration}
        </p>
        {expired && (
          <span className="absolute top-3 right-3 bg-destructive/70 text-background text-sm px-2 py-1 rounded-full">
            Zakończona
          </span>
        )}
        <div className="flex flex-col bg-background w-full p-2 bottom-2 text-base gap-1">
          <p className="text-base">{title}</p>
          <p className="text-muted text-sm">{date}</p>
          <p className="text-muted text-sm">od {price} zł/os</p>
          {description && (
            <p className="text-muted text-sm w-4/5">{description}</p>
          )}
        </div>
      </Link>
    </div>
  );
};
