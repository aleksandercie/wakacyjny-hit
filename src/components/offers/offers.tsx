import React from 'react';
import { Header } from '../header';
import { Card } from '../card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Trip } from '@/types/trip';

export const Offers = ({ trips }: { trips: Trip[] }) => {
  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Pakiety podrózne"
        subtitle="Nasze kierunki"
        description="Najcudowniejsze miejsca na świecie to prawdziwe cuda natury, które
          zapierają dech w piersiach."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips
          ?.slice(0, 6)
          .map(
            ({
              title,
              price,
              duration,
              shortDescription,
              mobileImage,
              id,
              startDate,
              endDate
            }) => (
              <Card
                id={id}
                key={id}
                title={title}
                price={price}
                duration={duration}
                date={`${startDate} - ${endDate}`}
                photo={mobileImage}
                description={shortDescription}
              />
            )
          )}
      </div>
      <div className="flex justify-center my-8">
        <Link href="/oferty">
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </div>
  );
};
