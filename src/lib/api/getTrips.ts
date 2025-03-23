import { Trip } from '@/types/trip';

export const getTrips = async (): Promise<Trip[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trips: ${res.status}`);
  }

  const trips = await res.json();

  return trips;
};
