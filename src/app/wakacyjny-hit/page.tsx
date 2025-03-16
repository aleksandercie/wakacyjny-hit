'use client';

import { Card, ImageBanner, Filters } from '@/components';
import { Button } from '@/components/ui/button';
import { offers } from '@/lib/offers';
import Link from 'next/link';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function OffersPage() {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
  const [selectedEatingOptions, setSelectedEatingOptions] = useState<string[]>(
    []
  );

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-16 items-center">
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
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map(
            ({ title, price, duration, date, photo, description }, index) => (
              <Card
                key={index}
                title={title}
                price={price}
                duration={duration}
                date={date}
                photo={photo}
                description={description}
              />
            )
          )}
        </div>
        <div className="flex justify-center my-8">
          <Link href="/wakacyjny-hit">
            <Button>Zobacz więcej</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
