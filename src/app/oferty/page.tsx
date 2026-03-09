import { Suspense } from 'react';
import { OffersList } from '@/components/offersList';
import { getTrips } from '@/lib/api/getTrips';
import { createMetadata } from '@/lib/seo';
import { CardSkeleton } from '@/components/card';

export const generateMetadata = () =>
  createMetadata({
    title: 'Oferty wakacji - Wakacyjny Hit',
    description:
      'Przeglądaj najlepsze oferty wakacyjne! Tanie loty, hotele i pakiety podróży w jednym miejscu.',
    ogTitle: 'Oferty wakacji - Wakacyjny Hit',
    ogDescription:
      'Zarezerwuj wymarzone wakacje dzięki najlepszym ofertom przygotowanym specjalnie dla Ciebie.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty`,
    noIndex: false,
  });

export default async function OffersPagee() {
  const { trips = [] } = await getTrips({
    limit: 8,
    offset: 0,
    expired: false,
  });

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-8 md:gap-12 items-center mb-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch w-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <OffersList initialTrips={trips} />
        </Suspense>
      </main>
    </div>
  );
}
