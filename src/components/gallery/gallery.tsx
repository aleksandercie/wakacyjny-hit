import Image from 'next/image';
import React from 'react';
import { Header } from '../header';

export const Gallery = () => {
  const photos = [
    {
      location: 'Bora Bora',
      country: 'Polinezja Francuska',
      photo: '/bora-bora.jpg',
      width: 'basis-[58%]'
    },
    {
      location: 'Santorini',
      country: 'Grecja',
      photo: '/santorini.jpg',
      width: 'basis-[40%]'
    },
    {
      location: 'Machu Picchu',
      country: 'Chile',
      photo: '/machu-picchu.jpg',
      width: 'basis-[40%]'
    },
    {
      location: 'Kilimandżaro',
      country: 'Tanzania',
      photo: '/kilimanjaro.jpg',
      width: 'basis-[58%]'
    }
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <Header
        title="Najpiekniejsze kierunki"
        subtitle="Odkryj niezwykłe miejsca na ziemi"
        description="Najcudowniejsze miejsca na świecie to prawdziwe cuda natury, które
          zapierają dech w piersiach."
      />
      <div className="flex flex-wrap gap-4">
        {photos.map(({ location, country, photo, width }) => (
          <div
            key={location}
            className={`${width} text-white relative max-h-[320px]`}
          >
            <Image
              src={photo}
              alt={location}
              width={680}
              height={320}
              className="rounded-md object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 text-dark">
              <p className="opacity-60">{location}</p>
              <p className="font-bold text-sm opacity-80">{country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
