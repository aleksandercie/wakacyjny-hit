import { ImageBanner } from '@/components';
import { createMetadata } from '@/lib/seo';
import dynamic from 'next/dynamic';

const DynamicFaq = dynamic(() =>
  import('../../components/faq').then((mod) => mod.Faq),
);
const DynamicHowItWorks = dynamic(() =>
  import('../../components//howItWorks').then((mod) => mod.HowItWorks),
);

export const generateMetadata = () =>
  createMetadata({
    title: 'Jak to działa - Wakacyjny Hit',
    description:
      'Dowiedz się, jak działa Wakacyjny Hit. Oferujemy najlepsze wakacyjne oferty dla podróżników szukających przygód i relaksu.',
    ogTitle: 'Jak to działa - Wakacyjny Hit',
    ogDescription:
      'Poznaj zasady działania Wakacyjnego Hitu i odkryj jak łatwo zaplanować idealne wakacje!',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/o-nas`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/o-nas`,
    noIndex: false,
  });

export default function HowItWorksPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Poznaj nas!" />
        <div className="max-w-[1000px] mx-auto flex flex-col gap-4">
          <p className="text-base text-muted">
            Jesteśmy pasjonatami podróży, którzy na własnej skórze odkryli setki
            miejsc na całym świecie. Dzielimy się tymi doświadczeniami,
            pomagając Wam znaleźć najlepsze oferty i stworzyć niezapomniane
            wakacje. Nasze wieloletnie doświadczenie pozwala nam zapewnić Wam
            dostęp do najatrakcyjniejszych cen, a każda podróż to dla nas nowa
            przygoda, którą chcemy przeżyć razem z Wami.
          </p>
          <p className="text-base text-muted">
            Wakacyjnyhit.pl to zespół specjalistów, którzy pomagają w
            wyszukiwaniu najlepszych okazji na przeloty, hotele oraz transfery.
            Nasza rola polega na wsparciu w planowaniu podróży, pomocy w
            samodzielnym zorganizowaniu oraz zarezerwowaniu wyjazdu. Nie
            jesteśmy organizatorami wyjazdów turystycznych, a nasze propozycje
            to wyłącznie podróże na własną rękę. Pamiętajcie, że ceny mogą się
            zmieniać w każdej chwili.
          </p>
          <p className="text-base text-muted">
            Dlaczego warto z nami? Nasza wiedza i doświadczenie pozwalają Ci
            odkryć tanie wakacje, które spełniają Twoje marzenia. Z nami nie
            tylko planujesz wyjazd, ale także doświadczasz świata w sposób,
            który zostaje w pamięci na zawsze.
          </p>
        </div>
        <DynamicHowItWorks />
        <DynamicFaq />
      </main>
    </div>
  );
}
