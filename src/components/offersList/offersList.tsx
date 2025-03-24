'use client';

import { Trip } from '@/types/trip';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Filters } from '../filters';
import { ImageBanner } from '../imageBanner';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card } from '../card';
import { getTrips } from '@/lib/api/getTrips';

export const OffersList = ({ trips: initialTrips }: { trips: Trip[] }) => {
  const defaultPriceRange = [0, 10000];
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
  const [selectedfoodOptions, setSelectedfoodOptions] = useState<string[]>([]);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filteredTrips = await getTrips({
        priceRange,
        date,
        departures: selectedAirports,
        food: selectedfoodOptions,
        search
      });
      setTrips(filteredTrips);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <ImageBanner
        image="/banner.jpg"
        alt="Plaza"
        title="Twoje wymarzone wakacje czekają!"
      />
      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        date={date}
        setDate={setDate}
        selectedAirports={selectedAirports}
        setSelectedAirports={setSelectedAirports}
        selectedfoodOptions={selectedfoodOptions}
        setSelectedfoodOptions={setSelectedfoodOptions}
        defaultPriceRange={defaultPriceRange}
        onSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <p className="text-center py-10">Ładowanie ofert...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <Card
              id={trip.id}
              key={trip.id}
              title={trip.title}
              price={trip.price}
              duration={trip.duration}
              date={`${trip.startDate} - ${trip.endDate}`}
              photo={trip.mobileImage}
              description={trip.shortDescription}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center my-8">
        <Link href="/oferty">
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </>
  );
};
