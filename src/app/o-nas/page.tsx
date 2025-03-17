import { Faq, HowItWorks, ImageBanner } from '@/components';

export default function HowItWorksPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-16 p-2">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Poznaj nas!" />
        <div className="max-w-[1000px] mx-auto flex flex-col gap-4">
          <p className="text-base text-gray-400">
            Jesteśmy pasjonatami podróży, którzy na własnej skórze odkryli setki
            miejsc na całym świecie. Jako doradcy podróży dzielimy się tymi
            doświadczeniami, pomagając Wam znaleźć najlepsze oferty i stworzyć
            niezapomniane wakacje. Nasze wieloletnie doświadczenie pozwala nam
            zapewnić Wam dostęp do najatrakcyjniejszych cen, a każda podróż to
            dla nas nowa przygoda, którą chcemy przeżyć razem z Wami. Z nami nie
            tylko planujecie wyjazd, ale także doświadczacie świata w sposób,
            który zostaje w pamięci na zawsze.
          </p>
          <p className="text-base text-gray-400">
            Wakacyjnyhit.pl to zespół doradców, którzy pomagają w znalezieniu
            najlepszych okazji na przeloty, hotele oraz transfery. Zgodnie z
            ustawą z dnia 24 listopada 2017 roku o imprezach turystycznych i
            powiązanych usługach turystycznych, nie pełnimy roli organizatora
            wyjazdów turystycznych. Nie sprzedajemy biletów lotniczych, noclegów
            ani transferów – nasza rola polega na wsparciu w wyszukaniu
            najlepszych ofert i pomocy w samodzielnym zorganizowaniu oraz
            zarezerwowaniu podróży. Proponowane przez nas wyjazdy to wyłącznie
            podróże na własną rękę. Pamiętajcie, że ceny mogą się zmieniać w
            każdej chwili.
          </p>
        </div>

        <HowItWorks />
        <Faq />
      </main>
    </div>
  );
}
