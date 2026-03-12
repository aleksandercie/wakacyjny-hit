import React, { Suspense } from 'react';
import { Header } from '../header';
import { CardSkeleton } from '../card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { OffersWrapper } from './offersWrapper';

export const Offers = () => {
  const { OFFERS } = ROUTES;

  return (
    <div className={`w-full max-w-[1000px] mx-auto`}>
      <Header
        title="Pakiety podróżne"
        subtitle="Nasze kierunki"
        description="Odkryj z nami najciekawsze miejsca na świecie. Znajdź ofertę, która spełni Twoje oczekiwania!"
      />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <OffersWrapper />
      </Suspense>
      <div className="flex justify-center my-8">
        <Link href={OFFERS}>
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </div>
  );
};
