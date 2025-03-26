import { OffersList } from '@/components';
import { getTrips } from '@/lib/api/getTrips';

export default async function OffersPage() {
  const trips = await getTrips({ limit: 6, offset: 0 });

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-8 md:gap-16 items-center">
        <OffersList initialTrips={trips} />
      </main>
    </div>
  );
}
