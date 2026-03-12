import { getTrips } from '@/lib/api/getTrips';
import { OffersCards } from './offersCards';

export const OffersWrapper = async () => {
  const { trips = [] } = await getTrips({
    limit: 6,
    offset: 0,
    expired: false,
  });

  return <OffersCards trips={trips} />;
};
