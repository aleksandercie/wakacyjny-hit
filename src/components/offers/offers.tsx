import React from 'react';
import { Header } from '../header';
import { Card } from '../card';
import { Button } from '../ui/button';
import { offers } from '@/lib/offers';
import Link from 'next/link';

export const Offers = () => {
  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Pakiety podrózne"
        subtitle="Nasze kierunki"
        description="Najcudowniejsze miejsca na świecie to prawdziwe cuda natury, które
          zapierają dech w piersiach."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers
          .slice(0, 6)
          .map(
            ({ title, price, duration, date, photo, description }, index) => (
              <Card
                key={index}
                title={title}
                price={price}
                duration={duration}
                date={date}
                photo={photo}
                description={description}
              />
            )
          )}
      </div>
      <div className="flex justify-center my-8">
        <Link href="/wakacyjny-hit">
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </div>
  );
};
