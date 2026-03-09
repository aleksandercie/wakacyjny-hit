import { ImageBanner } from '@/components/imageBanner';
import { createMetadata } from '@/lib/seo';
import dynamic from 'next/dynamic';

const DynamicHowItWorks = dynamic(() =>
  import('../../components/howItWorks').then((mod) => mod.HowItWorks),
);

export const generateMetadata = () =>
  createMetadata({
    title: 'Jak to działa - Najczęściej zadawane pytania | Wakacyjny Hit',
    description:
      'Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych ofert wakacyjnych i rezerwacji.',
    ogTitle: 'Jak to działa - Najczęściej zadawane pytania | Wakacyjny Hit',
    ogDescription:
      'Masz pytania o wakacje, rezerwacje lub oferty? Sprawdź nasze FAQ!',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/jak-to-dziala`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/jak-to-dziala`,
    noIndex: false,
  });

export default function HowItWorksPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Jak to działa?" />
        <DynamicHowItWorks />
      </main>
    </div>
  );
}
