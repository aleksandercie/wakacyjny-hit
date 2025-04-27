import { ImageBanner } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Regulamin – Wakacyjny Hit',
    description:
      'Zapoznaj się z regulaminem korzystania z serwisu Wakacyjny Hit. Dowiedz się więcej o zasadach i warunkach świadczenia usług.',
    ogTitle: 'Regulamin – Wakacyjny Hit',
    ogDescription:
      'Sprawdź regulamin serwisu Wakacyjny Hit i poznaj zasady korzystania z naszych usług.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/regulamin`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/regulamin`,
    noIndex: false
  });

export default function TermsPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Regulamin" title="Regulamin" />

        <div className="max-w-[1000px] mx-auto flex flex-col gap-6 text-base text-gray-700">
          <h2 className="text-center text-xl font-bold">
            Regulamin sklepu internetowego
          </h2>

          <section>
            <h3 className="text-center font-bold">§ 1 Postanowienia ogólne</h3>
            <ol className="list-decimal pl-5">
              <li>
                Niniejszy regulamin określa zasady korzystania z serwisu
                internetowego wakacyjnyhit.pl.
              </li>
              <li>
                Serwis umożliwia użytkownikom wyszukiwanie i rezerwację ofert
                indywidualnych podróży.
              </li>
              <li>
                Każda osoba korzystająca z serwisu zobowiązana jest do
                przestrzegania niniejszego regulaminu.
              </li>
              <li>
                Wszystkie informacje zamieszczone na stronie mają charakter
                informacyjny i nie stanowią oferty handlowej w rozumieniu
                kodeksu cywilnego.
              </li>
              <li>
                Usługi świadczone przez serwis mają charakter doradczy i nie są
                usługami turystycznymi w rozumieniu przepisów o imprezach
                turystycznych.
              </li>
              <li>
                W sprawach nieuregulowanych w regulaminie mają zastosowanie
                przepisy prawa obowiązującego na terytorium Rzeczypospolitej
                Polskiej.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-center font-bold">§ 2 Definicje</h3>
            <ol className="list-decimal pl-5">
              <li>
                <strong>Regulamin</strong> – dokument określający zasady
                świadczenia usług za pośrednictwem strony internetowej.
              </li>
              <li>
                <strong>Serwis</strong> – strona internetowa dostępna pod
                adresem wakacyjnyhit.pl.
              </li>
              <li>
                <strong>Użytkownik</strong> – osoba fizyczna lub prawna
                korzystająca z funkcjonalności serwisu.
              </li>
              <li>
                <strong>Formularz kontaktowy</strong> – narzędzie online
                umożliwiające przesyłanie zapytań ofertowych.
              </li>
              <li>
                <strong>Oferta</strong> – propozycja przygotowana indywidualnie
                dla Użytkownika na podstawie jego zapytania.
              </li>
              <li>
                <strong>Usługa</strong> – działania doradcze podejmowane przez
                właściciela serwisu na rzecz Użytkownika.
              </li>
              <li>
                <strong>Administrator</strong> – osoba zarządzająca serwisem i
                odpowiedzialna za jego funkcjonowanie.
              </li>
              <li>
                <strong>Rezerwacja</strong> – wstępne zgłoszenie chęci
                skorzystania z usługi.
              </li>
              <li>
                <strong>Cena</strong> – szacunkowa wartość usługi wskazana w
                ofercie przesłanej do Użytkownika.
              </li>
              <li>
                <strong>Klient</strong> – Użytkownik, który zaakceptował ofertę
                i złożył zamówienie na usługę.
              </li>
              <li>
                <strong>Zamówienie</strong> – potwierdzenie chęci skorzystania z
                usługi na warunkach przedstawionych w ofercie.
              </li>
              <li>
                <strong>Kontakt</strong> – adres e-mail, numer telefonu lub inne
                dane kontaktowe przekazane przez Użytkownika w celu komunikacji.
              </li>
              <li>
                <strong>Dane osobowe</strong> – informacje przekazane przez
                Użytkownika, niezbędne do realizacji usługi.
              </li>
              <li>
                <strong>Newsletter</strong> – wiadomości przesyłane
                Użytkownikowi na podstawie dobrowolnie wyrażonej zgody.
              </li>
              <li>
                <strong>Polityka prywatności</strong> – dokument określający
                sposób przetwarzania danych osobowych.
              </li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
