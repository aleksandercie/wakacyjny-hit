'use client';
import { useParams } from 'next/navigation';
import { Offer } from '@/components';

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col p-2 gap-8 items-center max-w-[1000px] mx-auto">
        <Offer id={id} />
      </main>
    </div>
  );
}
