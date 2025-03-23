'use client';
import { Trip } from '@/types/trip';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Filters } from '../filters';
import { ImageBanner } from '../imageBanner';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card } from '../card';

export const OffersList = ({ trips }: { trips: Trip[] }) => {
  const defaultPriceRange = [0, 10000];
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
  const [selectedEatingOptions, setSelectedEatingOptions] = useState<string[]>(
    []
  );

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
        selectedEatingOptions={selectedEatingOptions}
        setSelectedEatingOptions={setSelectedEatingOptions}
        defaultPriceRange={defaultPriceRange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map(
          ({
            title,
            price,
            duration,
            id,
            shortDescription,
            mobileImage,
            startDate,
            endDate
          }) => (
            <Card
              id={id}
              key={id}
              title={title}
              price={price}
              duration={duration}
              date={`${startDate} - ${endDate}`}
              photo={mobileImage}
              description={shortDescription}
            />
          )
        )}
      </div>
      <div className="flex justify-center my-8">
        <Link href="/oferty">
          <Button>Zobacz więcej</Button>
        </Link>
      </div>
    </>
  );
};
