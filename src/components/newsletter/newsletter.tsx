'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Newsletter = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    const confirmSubscription = async () => {
      const res = await fetch('/api/newsletter/confirm', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
      });

      setStatus(res.ok ? 'success' : 'error');
    };

    confirmSubscription();
  }, [params]);

  const buttonHomepage = (
    <Link href="/" className="mt-6">
      <Button>Powrót do strony głównej</Button>
    </Link>
  );

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {status === 'loading' && (
        <p className="text-gray-500">Potwierdzanie subskrypcji...</p>
      )}
      {status === 'success' && (
        <>
          <h1 className="text-2xl font-bold text-green-500">Dziękujemy!</h1>
          <p className="text-gray-500">
            Twoja subskrypcja została potwierdzona.
          </p>
          {buttonHomepage}
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="text-2xl font-bold text-red-500">Ups!</h1>
          <p className="text-gray-500">Link jest nieprawidłowy lub wygasł.</p>
          {buttonHomepage}
        </>
      )}
    </div>
  );
};
