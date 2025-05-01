'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function NewsletterConfirmPage() {
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

  return (
    <main className="flex flex-col items-center justify-center min-h-[64vh] p-4 text-center">
      {status === 'loading' && (
        <p className="text-gray-500">Potwierdzanie subskrypcji...</p>
      )}
      {status === 'success' && (
        <>
          <h1 className="text-2xl font-bold text-green-500">Dziękujemy!</h1>
          <p className="text-gray-500">
            Twoja subskrypcja została potwierdzona.
          </p>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="text-2xl font-bold text-red-500">Ups!</h1>
          <p className="text-gray-500">Link jest nieprawidłowy lub wygasł.</p>
        </>
      )}
    </main>
  );
}
