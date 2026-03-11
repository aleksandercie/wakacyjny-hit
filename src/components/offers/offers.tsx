import React from 'react';
import { Header } from '../header';
import { Card } from '../card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Trip } from '@/types/trip';
import { formatDate } from '@/lib/formatDate';
import { ROUTES } from '@/lib/routes';

export const Offers = ({ trips }: { trips: Trip[] }) => {
  const { OFFERS } = ROUTES;

  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Pakiety podróżne"
        subtitle="Nasze kierunki"
        description="Odkryj z nami najciekawsze miejsca na świecie. Znajdź ofertę, która spełni Twoje oczekiwania!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map(
          (
            {
              title,
              price,
              duration,
              shortDescription,
              image,
              id,
              startDate,
              endDate,
            },
            index,
          ) => (
            <Card
              id={id}
              key={id}
              title={title}
              price={price}
              duration={duration}
              date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
              photo={image}
              description={shortDescription}
              variant="small"
              priority={index < 2}
            />
          ),
        )}
      </div>
      <div className="flex justify-center my-8">
        <Link href={OFFERS}>
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </div>
  );
};
