import Image from 'next/image';
import React from 'react';
import { Header } from '../header';
import { textShadow } from '@/lib/styles';
type PhotoType = {
  location: string;
  country: string;
  photo: string;
  width: string;
  position: string;
};

const Photos = ({ photos }: { photos: PhotoType[] }) =>
  photos.map(async ({ location, country, photo, width, position }) => {
    return (
      <div
        key={`${location}-${country}`}
        className={`${width} text-white relative md:max-h-[320px]`}
      >
        <Image
          src={photo}
          alt={location}
          width={530}
          height={320}
          sizes="(max-width: 768px) 100vw, 530px"
          quality={75}
          loading="lazy"
          className="rounded-md object-cover w-full h-full"
        />
        <div
          className={`absolute text-white ${
            position === 'left' ? 'top-4 left-4' : 'bottom-4 right-4'
          }`}
        >
          <p className="text-lg" style={{ textShadow }}>
            {location}
          </p>
          <p className="font-bold text-base opacity-80" style={{ textShadow }}>
            {country}
          </p>
        </div>
      </div>
    );
  });

export const Gallery = () => {
  const photos = [
    {
      location: 'Kyoto',
      country: 'Japonia',
      photo: '/kyoto.jpg',
      width: 'w-full md:w-[53%]',
      position: 'left',
    },
    {
      location: '',
      country: 'Tanzania',
      photo: '/tanzania.jpg',
      width: 'w-full md:w-[44%]',
      position: 'left',
    },
    {
      location: '',
      country: 'Mauritius',
      photo: '/mauritius.jpg',
      width: 'w-full md:w-[44%]',
      position: 'right',
    },
    {
      location: 'Sydney',
      country: 'Australia',
      photo: '/sydney.jpg',
      width: 'w-full md:w-[53%]',
      position: 'right',
    },
    {
      location: 'Dubai',
      country: 'Zjednoczone Emiraty Arabskie',
      photo: '/dubai.jpg',
      width: 'w-full md:w-[53%]',
      position: 'left',
    },
    {
      location: 'Bali',
      country: 'Indonezja',
      photo: '/bali.jpg',
      width: 'w-full md:w-[44%]',
      position: 'left',
    },
  ];

  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Najpiękniejsze kierunki"
        subtitle="Odkryj niezwykłe miejsca"
        description="Najcudowniejsze miejsca na świecie to prawdziwe perły, które
          zapierają dech w piersiach."
      />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
        <Photos photos={photos} />
      </div>
    </div>
  );
};
