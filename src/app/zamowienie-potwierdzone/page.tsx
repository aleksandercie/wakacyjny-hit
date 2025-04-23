'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export default function SuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const { OFFERS } = ROUTES;

  useEffect(() => {
    const successFlag = localStorage.getItem('orderSuccess');
    const storedOrderId = localStorage.getItem('orderId');
    const storedEmail = localStorage.getItem('orderEmail');

    if (successFlag !== 'true' || !storedOrderId || !storedEmail) {
      router.replace('/');
    } else {
      setOrderId(storedOrderId);
      setEmail(storedEmail);
      localStorage.removeItem('orderSuccess');
      localStorage.removeItem('orderId');
      localStorage.removeItem('orderEmail');
    }
  }, [router]);

  if (!orderId || !email) return null;

  return (
    <main className="flex w-full justify-center min-h-[60vh] items-center flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold text-center">
        Dziękujemy za złożenie zamówienia!
      </h1>
      <p className="text-center">
        Numer zamówienia: <span className="font-mono">{orderId}</span>
      </p>
      <p className="text-center">
        Potwierdzenie zostało wysłane na adres:{' '}
        <span className="font-medium">{email}</span>
      </p>
      <Link href={OFFERS}>
        <Button className="mt-4">Przeglądaj kolejne oferty</Button>
      </Link>
    </main>
  );
}
