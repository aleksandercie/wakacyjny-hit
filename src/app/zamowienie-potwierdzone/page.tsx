import { Success } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Dziękujemy za zamówienie - Wakacyjny Hit',
    description:
      'Twoje zamówienie zostało przyjęte! Sprawdź szczegóły i odkrywaj kolejne wakacyjne oferty.',
    ogTitle: 'Dziękujemy za zamówienie - Wakacyjny Hit',
    ogDescription: 'Dziękujemy za zaufanie! Zaplanuj kolejne wakacje z nami.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/zamowienie-potwierdzone`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/zamowienie-potwierdzone`,
    noIndex: true,
  });

export default function SuccessPage() {
  return (
    <main className="flex w-full justify-center min-h-[60vh] items-center flex-col gap-4 p-4">
      <Success />
    </main>
  );
}
