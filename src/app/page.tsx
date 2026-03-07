import { Banner, Offers } from '@/components';
import { getTrips } from '@/lib/api/getTrips';
import { createMetadata } from '@/lib/seo';
import dynamic from 'next/dynamic';

const DynamicGallery = dynamic(() =>
  import('../components/gallery').then((mod) => mod.Gallery),
);
const DynamicHowItWorks = dynamic(() =>
  import('../components/howItWorks').then((mod) => mod.HowItWorks),
);

export const generateMetadata = () =>
  createMetadata({
    title: 'Wakacyjny Hit - Najlepsze oferty wakacji',
    description:
      'Znajdź wymarzone wakacje w najlepszych cenach! Sprawdź nasze oferty podróży do najpiękniejszych miejsc świata.',
    ogTitle: 'Wakacyjny Hit - Najlepsze oferty wakacji',
    ogDescription:
      'Wakacyjne oferty dla każdego! Relaks, przygoda i niezapomniane wspomnienia.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    noIndex: false,
  });

export default async function Home() {
  const { trips = [] } = await getTrips({
    limit: 8,
    offset: 0,
    expired: false,
  });

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <Banner
          videoMobile="/mobile-banner.mp4"
          video="/desktop-banner.mp4"
          title="Planujesz wymarzone wakacje?"
          description="Znajdź najlepsze oferty wyjazdów w najniższych cenach! Wiele destynacji na całym świecie - idealne miejsca na relaks, przygody i niezapomniane wspomnienia."
        />
        <Offers trips={trips} />
        <DynamicGallery />
        <DynamicHowItWorks />
      </main>
    </div>
  );
}
