import { NewsletterConfirm } from '@/components';
import { Suspense } from 'react';

export default function NewsletterConfirmPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[64vh] p-4 text-center">
      <Suspense fallback={<p className="text-gray-500">Ładowanie...</p>}>
        <NewsletterConfirm />
      </Suspense>
    </main>
  );
}
