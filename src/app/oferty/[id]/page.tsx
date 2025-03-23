import { OfferDetails } from '@/components';
import { getTripById } from '@/lib/api/getTrip';
import { notFound } from 'next/navigation';

type OfferPageProps = {
  params: { id: string };
};

export default async function OfferPage({ params }: OfferPageProps) {
  const { id } = await params;
  try {
    const trip = await getTripById(id);

    if (!trip) return notFound();

    return (
      <div className="font-[family-name:var(--font-nunito-sans)]">
        <main className="flex flex-col p-2 gap-8 items-center max-w-[1000px] mx-auto">
          <OfferDetails trip={trip} />
        </main>
      </div>
    );
  } catch (err) {
    console.error('Error loading trip:', err);
    return notFound();
  }
}
