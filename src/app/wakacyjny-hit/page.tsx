import { Card, ImageBanner } from '@/components';
import { Button } from '@/components/ui/button';
import { offers } from '@/lib/offers';
import Link from 'next/link';

export default function OffersPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-16">
        <ImageBanner
          image="/banner.jpg"
          alt="Plaza"
          title="Twoje wymarzone wakacje czekają!"
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
