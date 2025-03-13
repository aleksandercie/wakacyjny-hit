import Image from 'next/image';
import React from 'react';
import { Header } from '../header';

export const Gallery = () => {
  const photos = [
    {
      location: 'Bora Bora',
      country: 'Polinezja Francuska',
      photo: '/bora-bora.jpg',

      width: 'w-full md:w-[53%]'
    },
    {
      location: 'Santorini',
      country: 'Grecja',
      photo: '/santorini.jpg',
      width: 'w-full md:w-[44%]'
    },
    {
      location: 'Machu Picchu',
      country: 'Chile',
      photo: '/machu-picchu.jpg',
      width: 'w-full md:w-[44%]'
    },
    {
      location: 'Kilimandżaro',
      country: 'Tanzania',
      photo: '/kilimanjaro.jpg',
      width: 'w-full md:w-[53%]'
    }
  ];

  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Najpiekniejsze kierunki"
        subtitle="Odkryj niezwykłe miejsca na ziemi"
        description="Najcudowniejsze miejsca na świecie to prawdziwe cuda natury, które
          zapierają dech w piersiach."
      />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
        {photos.map(({ location, country, photo, width }) => (
          <div
            key={location}
            className={`${width} text-white relative md:max-h-[320px]`}
          >
            <Image
              src={photo}
              alt={location}
              width={680}
              height={320}
              className="rounded-md object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 text-dark">
              <p className="opacity-60 text-lg">{location}</p>
              <p className="font-bold text-base opacity-80">{country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
