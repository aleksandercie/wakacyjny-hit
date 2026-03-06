import { OfferDetails } from '@/components';
import { getTripById } from '@/lib/api/getTrip';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/seo';

type OfferPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: OfferPageProps) {
  const { id } = await params;
  try {
    const trip = await getTripById(id);

    if (!trip) return {};

    return createMetadata({
      title: `${trip.title} - Wakacyjny Hit`,
      description:
        trip.shortDescription?.slice(0, 150) ||
        'Najlepsze oferty podróży dostępne na Wakacyjny Hit!',
      ogTitle: `${trip.title} - Wakacyjny Hit`,
      ogDescription:
        trip.shortDescription?.slice(0, 150) ||
        'Odkryj niesamowite miejsca na świecie razem z nami!',
      ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty/${trip.id}`,
      ogImage: trip.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
      canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/oferty/${trip.id}`,
      noIndex: false,
    });
  } catch {
    return {};
  }
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { id } = await params;

  let trip;
  try {
    trip = await getTripById(id);
  } catch {
    return notFound();
  }

  if (!trip) return notFound();

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-8 items-center max-w-[1000px] mx-auto mb-12">
        <OfferDetails trip={trip} />
      </main>
    </div>
  );
}
