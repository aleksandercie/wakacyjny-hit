'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnsubscribePage() {
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

    const unsubscribe = async () => {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      setStatus(res.ok ? 'success' : 'error');
    };

    unsubscribe();
  }, [params]);

  const buttonHomepage = (
    <Link href="/" className="mt-6">
      <Button>Powrót do strony głównej</Button>
    </Link>
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-[64vh] p-4 text-center">
      {status === 'loading' && (
        <p className="text-gray-500">Przetwarzanie rezygnacji...</p>
      )}
      {status === 'success' && (
        <>
          <h1 className="text-2xl font-bold text-green-500">
            Zrezygnowano z subskrypcji
          </h1>
          <p className="text-gray-500">
            Twój adres email został usunięty z naszej listy.
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
    </main>
  );
}
