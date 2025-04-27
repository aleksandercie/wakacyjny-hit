import { Faq, ImageBanner } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'FAQ – Najczęściej zadawane pytania | Wakacyjny Hit',
    description:
      'Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych ofert wakacyjnych i rezerwacji.',
    ogTitle: 'FAQ – Najczęściej zadawane pytania | Wakacyjny Hit',
    ogDescription:
      'Masz pytania o wakacje, rezerwacje lub oferty? Sprawdź nasze FAQ!',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
    noIndex: false
  });

export default function FaqPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Masz pytania?" />
        <Faq />
      </main>
    </div>
  );
}
