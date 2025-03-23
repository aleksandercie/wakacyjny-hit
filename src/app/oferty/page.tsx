import { OffersList } from '@/components';
import { getTrips } from '@/lib/api/getTrips';

export default async function OffersPage() {
  const trips = await getTrips();

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-16 items-center">
        <OffersList trips={trips} />
      </main>
    </div>
  );
}
