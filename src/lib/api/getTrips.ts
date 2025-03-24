import { Trip } from '@/types/trip';

export const getTrips = async (filters?: {
  priceRange?: number[];
  date?: { from?: Date; to?: Date };
  departures?: string[];
  food?: string[];
  search?: string;
}): Promise<Trip[]> => {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set('search', filters.search);
  }

  if (filters?.priceRange) {
    params.set('minPrice', String(filters.priceRange[0]));
    params.set('maxPrice', String(filters.priceRange[1]));
  }

  if (filters?.date?.from) {
    params.set('from', filters.date.from.toISOString());
  }

  if (filters?.date?.to) {
    params.set('to', filters.date.to.toISOString());
  }

  filters?.departures?.forEach((a) => params.append('departures', a));
  filters?.food?.forEach((e) => params.append('food', e));

  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/api/trips?${params.toString()}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch trips: ${res.status}`);
  }

  return res.json();
};
