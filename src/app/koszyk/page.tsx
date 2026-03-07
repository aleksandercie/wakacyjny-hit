import { Cart } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Koszyk - Twoje wakacyjne rezerwacje | Wakacyjny Hit',
    description:
      'Sprawdź swoje wybrane oferty wakacyjne i sfinalizuj rezerwację szybko i wygodnie.',
    ogTitle: 'Koszyk - Twoje wakacyjne rezerwacje | Wakacyjny Hit',
    ogDescription:
      'Twoje wakacyjne marzenia są na wyciągnięcie ręki! Zobacz, co masz w koszyku i zarezerwuj już dziś.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/koszyk`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/koszyk`,
    noIndex: true,
  });

export default function CartPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 bg-surface pb-12">
        <Cart />
      </main>
    </div>
  );
}
