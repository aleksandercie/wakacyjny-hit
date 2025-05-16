import { OffersList } from '@/components';
import { getTrips } from '@/lib/api/getTrips';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Oferty wakacji – Wakacyjny Hit',
    description:
      'Przeglądaj najlepsze oferty wakacyjne! Tanie loty, hotele i pakiety podróży w jednym miejscu.',
    ogTitle: 'Oferty wakacji – Wakacyjny Hit',
    ogDescription:
      'Zarezerwuj wymarzone wakacje dzięki najlepszym ofertom przygotowanym specjalnie dla Ciebie.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty`,
    noIndex: false
  });

export default async function OffersPage() {
  const trips = await getTrips({ limit: 6, offset: 0 });

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-8 md:gap-12 items-center mb-12">
        <OffersList initialTrips={trips} />
      </main>
    </div>
  );
}
