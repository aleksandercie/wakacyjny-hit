import { ImageBanner } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Polityka prywatności – Wakacyjny Hit',
    description:
      'Zapoznaj się z polityką prywatności serwisu Wakacyjny Hit i dowiedz się, jak chronimy Twoje dane osobowe.',
    ogTitle: 'Polityka prywatności – Wakacyjny Hit',
    ogDescription:
      'Dowiedz się, jak dbamy o Twoje dane i zapewniamy ich bezpieczeństwo w serwisie Wakacyjny Hit.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/polityka-prywatnosci`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/polityka-prywatnosci`,
    noIndex: false
  });

export default function PrivacyPolicyPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner
          image="/banner.jpg"
          alt="Polityka prywatności"
          title="Polityka prywatności"
        />

        <div className="max-w-[1000px] mx-auto flex flex-col gap-6 text-base text-gray-700">
          <h2 className="text-center text-xl font-bold">
            Polityka prywatności serwisu wakacyjnyhit.pl
          </h2>

          <section>
            <h3 className="text-center font-bold">§ 1 Informacje ogólne</h3>
            <ol className="list-decimal pl-5">
              <li>
                Niniejsza polityka prywatności określa zasady przetwarzania i
                ochrony danych osobowych użytkowników serwisu wakacyjnyhit.pl.
              </li>
              <li>
                Administratorem danych osobowych jest właściciel serwisu,
                działający pod nazwą handlową Wakacyjny Hit.
              </li>
              <li>
                Dane osobowe użytkowników są przetwarzane zgodnie z
                obowiązującymi przepisami prawa, w szczególności z
                Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679
                (RODO).
              </li>
              <li>
                Użytkownik ma prawo do wglądu w swoje dane, ich poprawiania,
                usunięcia oraz ograniczenia przetwarzania.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-center font-bold">
              § 2 Zakres i cel przetwarzania danych
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Dane osobowe zbierane są w celu realizacji usług świadczonych
                przez serwis, kontaktu z użytkownikiem, przesyłania ofert oraz
                prowadzenia newslettera.
              </li>
              <li>
                Podanie danych jest dobrowolne, ale niezbędne do realizacji
                usług.
              </li>
              <li>
                Dane mogą być przekazywane podmiotom współpracującym z
                administratorem jedynie w zakresie niezbędnym do świadczenia
                usług.
              </li>
              <li>
                Dane nie są przekazywane do państw trzecich ani organizacji
                międzynarodowych.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-center font-bold">§ 3 Pliki cookies</h3>
            <ol className="list-decimal pl-5">
              <li>
                Serwis wykorzystuje pliki cookies w celu poprawnego działania
                strony oraz analizy ruchu.
              </li>
              <li>
                Użytkownik może samodzielnie zarządzać plikami cookies poprzez
                ustawienia swojej przeglądarki internetowej.
              </li>
              <li>
                Ograniczenie stosowania plików cookies może wpłynąć na niektóre
                funkcjonalności serwisu.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-center font-bold">§ 4 Bezpieczeństwo danych</h3>
            <ol className="list-decimal pl-5">
              <li>
                Administrator stosuje odpowiednie środki techniczne i
                organizacyjne w celu zapewnienia ochrony danych osobowych.
              </li>
              <li>
                Dostęp do danych mają jedynie osoby upoważnione, które zostały
                przeszkolone z zakresu przetwarzania danych osobowych.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-center font-bold">§ 5 Kontakt</h3>
            <p>
              W sprawach dotyczących przetwarzania danych osobowych, użytkownik
              może kontaktować się z administratorem za pośrednictwem adresu
              e-mail: kontakt@wakacyjnyhit.pl
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
