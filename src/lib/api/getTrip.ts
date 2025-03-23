import { Trip } from '@/types/trip';

export const getTripById = async (id: string): Promise<Trip> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/trip?id=${id}`,
    {
      cache: 'no-store'
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch trip with id ${id}`);
  }

  const trip = await res.json();
  return trip;
};
