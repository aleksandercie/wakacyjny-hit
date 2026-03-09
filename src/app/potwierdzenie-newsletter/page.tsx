import { Newsletter } from '@/components/newsletter';
import { Suspense } from 'react';

export default function NewsletterConfirmPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[64vh] p-4 text-center">
      <Suspense fallback={<p className="text-muted">Ładowanie...</p>}>
        <Newsletter />
      </Suspense>
    </main>
  );
}
