import { Card, DatePickerWithRange, ImageBanner } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { offers } from '@/lib/offers';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-16 items-center">
        <ImageBanner
          image="/banner.jpg"
          alt="Plaza"
          title="Twoje wymarzone wakacje czekają!"
        />
        <div className="md:max-w-[700px] w-full flex flex-col md:flex-row md:p-2 md:border rounded-md md:rounded-full gap-2 md:gap-4 justify-between items-center">
          <div className="pl-2 md:pl-0 flex items-center w-[260px]">
            <MapPin />
            <Input
              placeholder="Wyszukaj hit"
              className="border-0 p-2 shadow-none outline-none ring-0 focus:ring-0 focus:outline-none focus:shadow-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:border-0"
            />
          </div>
          <DatePickerWithRange className="border-0 px-0 md:px-4 max-w-[260px]" />
          <Button
            variant="secondary"
            className="rounded-full max-w-[260px] md:max-w-none w-full md:w-auto"
          >
            Szukaj
          </Button>
        </div>
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
