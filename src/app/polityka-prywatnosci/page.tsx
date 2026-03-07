import { ImageBanner } from '@/components';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Polityka prywatności - Wakacyjny Hit',
    description:
      'Zapoznaj się z polityką prywatności serwisu Wakacyjny Hit i dowiedz się, jak chronimy Twoje dane osobowe.',
    ogTitle: 'Polityka prywatności - Wakacyjny Hit',
    ogDescription:
      'Dowiedz się, jak dbamy o Twoje dane i zapewniamy ich bezpieczeństwo w serwisie Wakacyjny Hit.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/polityka-prywatnosci`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/polityka-prywatnosci`,
    noIndex: false,
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

        <div className="max-w-[1000px] mx-auto flex flex-col gap-4 text-base text-muted">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-bold">
              Polityka prywatności serwisu wakacyjnyhit.com
            </h2>
            <p className="text-center font-bold">wakacyjnyhit.com</p>
            <p className="text-center font-bold">(&quot;Serwis&quot;)</p>
          </div>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">Drogi Użytkowniku!</h3>
            <p>
              Dbamy o Twoją prywatność i chcemy, abyś w czasie korzystania z
              naszych usług czuł się komfortowo. Dlatego też poniżej
              prezentujemy Ci najważniejsze informacje o zasadach przetwarzania
              przez nas Twoich danych osobowych oraz plikach cookies, które są
              wykorzystywane przez nasz Serwis. Informacje te zostały
              przygotowane z uwzględnieniem RODO, czyli ogólnego rozporządzenia
              o ochronie danych.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">ADMINISTRATOR DANYCH OSOBOWYCH</h3>
            <h3>-----------------------------------------</h3>
            <p>
              Jeśli chcesz skontaktować się z nami w związku z przetwarzaniem
              przez nas Twoich danych osobowych, napisz do nas na adres e-mail:
              -----------------------------------------
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">TWOJE UPRAWNIENIA</h3>
            <p className="mb-4">Przysługuje Ci prawo żądania:</p>
            <ol className="list-disc pl-5">
              <li>
                dostępu do Twoich danych osobowych, w tym uzyskania kopii Twoich
                danych (art. 15 RODO lub - jeśli ma to zastosowanie - art. 13
                ust. 1 lit. f RODO),
              </li>
              <li>ich sprostowania (art. 16 RODO),</li>
              <li>usunięcia (art. 17 RODO),</li>
              <li>ograniczenia przetwarzania (art. 18 RODO),</li>
              <li>
                przeniesienia danych do innego administratora (art. 20 RODO).
              </li>
            </ol>
            <p className="my-4">A także prawo:</p>
            <ol className="list-disc pl-5">
              <li>
                wniesienia w dowolnym momencie sprzeciwu wobec przetwarzania
                Twoich danych:
                <ol className="list-disc pl-5">
                  <li>
                    z przyczyn związanych z Twoją szczególną sytuacją - wobec
                    przetwarzania dotyczących Ciebie danych osobowych, opartego
                    na art. 6 ust. 1 lit. f RODO (tj. na realizowanych przez nas
                    prawnie uzasadnionych interesach), w tym profilowania (art.
                    21 ust. 1 RODO);
                  </li>
                  <li>
                    jeżeli dane osobowe są przetwarzane na potrzeby marketingu
                    bezpośredniego, w tym profilowania, w zakresie, w jakim
                    przetwarzanie jest związane z takim marketingiem
                    bezpośrednim (art. 21 ust. 2 RODO).
                  </li>
                </ol>
              </li>
            </ol>
            <p className="my-4">
              Skontaktuj się z nami, jeśli chcesz skorzystać ze swoich praw.
              Sprzeciw w odniesieniu do wykorzystywania przez nas plików cookies
              (o których przeczytasz poniżej) możesz wyrazić zwłaszcza za pomocą
              dostępnego na stronie Serwisu dedykowanego narzędzia lub
              odpowiednich ustawień przeglądarki.
            </p>
            <p>
              Jeśli uznasz, że Twoje dane są przetwarzane niezgodnie z prawem,
              możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">DANE OSOBOWE I PRYWATNOŚĆ</h3>
            <p className="">
              Poniżej znajdziesz szczegółowe informacje na temat przetwarzania
              Twoich danych w zależności od podejmowanych przez Ciebie działań.
            </p>
            {/* 1. Skorzystanie z bezpłatnych usług oferowanych w Serwisie */}
            <h4 className="mt-8 mb-4 font-bold">
              1. Skorzystanie z bezpłatnych usług oferowanych w Serwisie
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    realizacja umowy o świadczenie usług oferowanych w Serwisie
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    umowa o świadczenie usług (art. 6 ust. 1 lit. b RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    przez okres obowiązywania umowy <br /> <br />
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br />
                    (więcej informacji na ten temat znajdziesz w ostatniej
                    tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz mieć możliwości skorzystania z naszych usługź
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 2. Skorzystanie z płatnych usług oferowanych w Serwisie */}
            <h4 className="mt-8 mb-4 font-bold">
              2. Skorzystanie z płatnych usług oferowanych w Serwisie
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    realizacja umowy o świadczenie usług oferowanych w Serwisie
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td>umowa o świadczenie usług (art. 6 ust. 1 lit. b RODO)</td>
                  <td>
                    obowiązek prawny, w szczególności związany z rachunkowością,
                    zobowiązujący nas do przetwarzania Twoich danych osobowych
                    (art. 6 ust. 1 lit. c RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td>przez okres obowiązywania umowy</td>
                  <td>
                    do momentu wygaśnięcia ciążących na nas obowiązków prawnych
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br />
                    (więcej informacji na ten temat znajdziesz w ostatniej
                    tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz mieć możliwości skorzystania z naszych usług
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 3. Nawiązanie z nami kontaktu */}
            <h4 className="mt-8 mb-4 font-bold">
              3. Nawiązanie z nami kontaktu (np. w celu zadania pytania)
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>obsługa Twoich zapytań lub zgłoszeń</td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td>
                    umowa lub działania podejmowane na Twoje żądanie,
                    zmierzające do jej zawarcia (art. 6 ust. 1 lit. b RODO) - w
                    przypadku gdy Twoje zapytanie lub zgłoszenie dotyczy umowy,
                    której jesteśmy lub możemy być stroną
                  </td>
                  <td>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu Twoich danych w celu prowadzenia z Tobą
                    komunikacji (art. 6 ust. 1 lit. f RODO) - jeżeli Twoje
                    zapytanie lub zgłoszenie nie ma związku z umową
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td>
                    przez czas trwania wiążącej nas umowy lub - jeśli umowa nie
                    zostanie zawarta - do upływu okresu dochodzenia roszczeń -
                    zobacz ostatnią tabelę tej sekcji*
                  </td>
                  <td>
                    do upływu okresu dochodzenia roszczeń - zobacz ostatnią
                    tabelę tej sekcji - lub do momentu, w którym uwzględnimy
                    Twój sprzeciw wobec przetwarzania*
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br />
                    (więcej informacji na ten temat znajdziesz w ostatniej
                    tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziemy mieli możliwości udzielenia odpowiedzi na Twoje
                    zapytanie lub zgłoszenie
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              * w zależności od tego, które ma zastosowanie w danym przypadku
            </p>

            {/* 4. Założenie konta w Serwisie */}
            <h4 className="mt-8 mb-4 font-bold">
              4. Założenie konta w Serwisie
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    realizacja umowy o świadczenie usługi prowadzenia konta w
                    Sklepie
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td>umowa o świadczenie usług (art. 6 ust. 1 lit. b RODO)</td>
                  <td>
                    obowiązek prawny, wynikający w szczególności z wymogów
                    nakładanych w związku ze świadczeniem usług cyfrowych,
                    zobowiązujący nas do przetwarzania Twoich danych osobowych
                    (art. 6 ust. 1 lit. c RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td>przez okres obowiązywania wyżej wymienionej umowy</td>
                  <td>
                    do momentu wygaśnięcia ciążących na nas obowiązków prawnych
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br />
                    (więcej informacji na ten temat znajdziesz w ostatniej
                    tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz mieć możliwości założenia konta i korzystania z
                    jego funkcji
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              * w zależności od tego, które ma zastosowanie w danym przypadku
            </p>

            {/* 5. Ustawienia marketingowe */}
            <h4 className="mt-8 mb-4 font-bold">
              5. Ustawienia przeglądarki lub inne zbliżone działanie zezwalające
              na prowadzenie działań marketingowych
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    marketing bezpośredni, polegający na wyświetlaniu
                    spersonalizowanych reklam <br /> <br />
                    (więcej na ten temat przeczytasz w sekcji „Profilowanie” i
                    „Pliki cookies” Polityki prywatności)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu danych w podanym wyżej celu (art. 6 ust. 1
                    lit. f RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    do momentu wygaśnięcia ważności lub usunięcia przez Ciebie
                    plików cookies, wykorzystywanych do celów marketingowych*
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz otrzymywać sugestii produktów lub usług,
                    którymi możesz być zainteresowany
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              * w zależności od tego, które ma zastosowanie w danym przypadku
            </p>

            {/* 6. Ustawienia analityczne */}
            <h4 className="mt-8 mb-4 font-bold">
              6. Ustawienia przeglądarki lub inne zbliżone działanie zezwalające
              na prowadzenie działań analitycznych
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    analiza sposobu korzystania i poruszania się przez Ciebie po
                    stronie internetowej Serwisu, celem polepszenia jej
                    funkcjonalności <br /> <br /> (więcej na ten temat
                    przeczytasz w sekcji „Działania analityczne” i „Pliki
                    cookies” Polityki prywatności)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu danych w podanym wyżej celu (art. 6 ust. 1
                    lit. f RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    do momentu wygaśnięcia ważności lub usunięcia przez Ciebie
                    plików e, wykorzystywanych do celów analitycznych*
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie uwzględnimy sposobu korzystania i poruszania się przez
                    Ciebie po stronie internetowej Serwisu w pracach nad jej
                    rozwojem
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              * w zależności od tego, które ma zastosowanie w danym przypadku
            </p>

            {/* 7. Zgoda na otrzymywanie treści marketingowych */}
            <h4 className="mt-8 mb-4 font-bold">
              7. Wyrażenie przez Ciebie zgody na otrzymywanie od nas treści
              marketingowych (np. informacji o ofertach specjalnych)
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td>
                    wysyłka informacji marketingowych, zwłaszcza ofert
                    specjalnych
                  </td>
                  <td>
                    analiza efektywności wysłanych przez nas wiadomości, celem
                    ustalenia ogólnych zasad dotyczących skutecznej wysyłki
                    wiadomości w naszej działalności <br /> <br />
                    (więcej na ten temat przeczytasz w sekcji „Działania
                    analityczne” Polityki prywatności)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td>
                    Twoja zgoda na nasze działania marketingowe (art. 6 ust. 1
                    lit. a RODO)
                  </td>
                  <td>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu danych w podanym wyżej celu (art. 6 ust. 1
                    lit. f RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td>
                    do momentu wycofania przez Ciebie zgody - pamiętaj, w każdej
                    chwili możesz wycofać zgodę. Przetwarzanie danych do momentu
                    cofnięcia przez Ciebie zgody pozostaje zgodne z prawem.
                  </td>
                  <td>
                    do momentu, w którym uwzględnimy Twój sprzeciw wobec
                    przetwarzania
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br />
                    (więcej informacji na ten temat znajdziesz w ostatniej
                    tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz otrzymywać naszych materiałów marketingowych, w
                    tym informacji o naszych ofertach specjalnych
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 8. Newsletter */}
            <h4 className="mt-8 mb-4 font-bold">
              8. Zapisanie się na newsletter
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td>wysyłanie newslettera</td>
                  <td>
                    analiza efektywności wysłanych przez nas treści, celem
                    ustalenia ogólnych zasad dotyczących skutecznej wysyłki
                    wiadomości w naszej działalności <br /> <br /> (więcej na
                    ten temat przeczytasz w sekcji „Działania analityczne”
                    Polityki prywatności)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td>
                    umowa o świadczenie usługi wysyłki newslettera (art. 6 ust.
                    1 lit. b RODO)
                  </td>
                  <td>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu danych w podanym wyżej celu (art. 6 ust. 1
                    lit. f RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td>
                    do momentu, w którym wypiszesz się z naszego newslettera
                  </td>
                  <td>
                    do momentu, w którym uwzględnimy Twój sprzeciw wobec
                    przetwarzania
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ponadto, Twoje dane będą przetwarzane do upływu okresu, w
                    którym możliwe jest dochodzenie roszczeń - przez Ciebie lub
                    przez nas <br /> <br /> (więcej informacji na ten temat
                    znajdziesz w ostatniej tabeli tej sekcji)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nie będziesz mieć możliwości otrzymywania informacji
                    dotyczących Serwisu i naszych usług
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 9. Roszczenia */}
            <h4 className="mt-8 mb-4 font-bold">
              9. Podjęcie działania lub zaniechanie mogące powodować powstanie
              roszczeń związanych z Serwisem lub naszymi usługami
            </h4>
            <table className="policy-table">
              <tbody>
                <tr>
                  <th colSpan={2}>W jakim celu?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    ustalenie, dochodzenie lub obrona ewentualnych roszczeń,
                    związanych z zawartą umową lub świadczonymi usługami
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Na jakiej podstawie?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    nasz prawnie uzasadniony interes, polegający na
                    przetwarzaniu danych osobowych we wskazanym powyżej celu
                    (art. 6 ust. 1 lit. f RODO)
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Jak długo?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    do upływu okresu przedawnienia roszczeń lub do momentu, w
                    którym uwzględnimy Twój sprzeciw wobec przetwarzania*
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Co się stanie, jeśli nie podasz danych?</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    brak możliwości ustalenia, dochodzenia lub obrony roszczeń
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              * w zależności od tego, które ma zastosowanie w danym przypadku
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">PROFILOWANIE</h3>
            <p className="mb-4">
              W ramach Serwisu dokonujemy profilowania - w odniesieniu do Ciebie
              będzie to miało miejsce, jeśli zezwolisz na takie działania.
              Profilowanie to polega na automatycznej ocenie, jakimi produktami
              lub usługami możesz być zainteresowany, wykorzystując do tego
              informacje o wyświetlanych przez Ciebie treściach. Dzięki temu,
              reklamy produktów lub usług wyświetlane w ramach usług
              internetowych, z których korzystasz, będą bardziej dostosowane do
              Ciebie i Twoich potrzeb.
            </p>
            <p className="mb-4">
              Profilowanie, którego dokonujemy, nie skutkuje podejmowaniem
              decyzji wywołujących wobec Ciebie skutki prawne lub wpływających
              na Ciebie w podobnie istotny sposób.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">DZIAŁANIA ANALITYCZNE</h3>
            <p className="mb-4">
              W ramach strony internetowej Serwisu prowadzimy działania
              analityczne, mające na celu zwiększenie jej intuicyjności i
              przystępności - w odniesieniu do Ciebie będzie to miało miejsce,
              jeśli zezwolisz na takie działania. W ramach analizy będziemy brać
              pod uwagę sposób, w jaki poruszasz się po Serwisie - a więc np.
              to, ile czasu spędzasz na danej podstronie, czy w które miejsca w
              Serwisie klikasz. Dzięki temu podczas prac nad rozwojem Serwisu
              będziemy mogli zoptymalizować jego układ, wygląd oraz zamieszczane
              w nim treści, tak aby polepszyć jego funkcjonalność.
            </p>
            <p className="mb-4">
              Ponadto, jeśli wyrazisz wolę otrzymywania od nas wiadomości
              marketingowych lub newslettera, możemy dokonywać analizy
              efektywności przeprowadzonej przez nas wysyłki. Przykładowo,
              możemy sprawdzić, czy i w jaki sposób wpłynęła ona na aktywność w
              naszym Serwisie. Takie działania pomogą nam ustalić ogólne zasady
              dotyczące wysyłki tego typu wiadomości w naszej działalności - np.
              w zakresie optymalnych godzin wysyłki czy sposobu formułowania
              skutecznych treści.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">BEZPIECZEŃSTWO DANYCH</h3>
            <p className="mb-4">
              Przetwarzając Twoje dane osobowe stosujemy środki organizacyjne i
              techniczne zgodne z właściwymi przepisami prawa, w tym stosujemy
              szyfrowanie połączenia za pomocą certyfikatu SSL/TLS.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">PLIKI COOKIES</h3>
            <p className="mb-4">
              Nasz Serwis, jak większość witryn internetowych, korzysta z tzw.
              plików cookies (ciasteczek). Pliki te:
            </p>
            <ol className="list-disc pl-5">
              <li>
                są zapisywane w pamięci Twojego urządzenia (komputera, telefonu,
                itd.);
              </li>
              <li>nie powodują zmian w ustawieniach Twojego urządzenia.</li>
            </ol>
            <p className="my-4">
              W tym Serwisie ciasteczka wykorzystywane są w celach:
            </p>
            <ol className="list-disc pl-5">
              <li>zapamiętywania Twojej sesji</li>
              <li>statystycznych</li>
              <li>marketingowych</li>
            </ol>
            <p className="my-4">
              Aby dowiedzieć się, jak zarządzać plikami cookies, w tym jak
              wyłączyć ich obsługę w Twojej przeglądarce, możesz skorzystać z
              pliku pomocy Twojej przeglądarki. Z informacjami na ten temat
              możesz zapoznać się wciskając klawisz F1 w przeglądarce. Ponadto
              odpowiednie wskazówki znajdziesz na następujących podstronach, w
              zależności od przeglądarki, której używasz:
            </p>
            <ol className="list-disc pl-5">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari</li>
              <li>Opera</li>
            </ol>
            <p className="my-4">
              Szczegóły dotyczące wykorzystywanych przez Serwis plików cookies
              znajdziesz w komunikacie dot. plików cookies lub klikając właściwą
              opcję/widżet dostępny w stopce strony/lewym dolnym rogu strony
              Serwisu.
            </p>
            <p className="mb-4">
              Pliki cookies nie będą przetwarzane przez nas dłużej niż 6 minut
              od ostatniej wizyty
            </p>
            <p className="mb-4">
              Korzystając z odpowiednich opcji Twojej przeglądarki, w każdej
              chwili możesz:
            </p>
            <ol className="list-disc pl-5">
              <li>usunąć pliki cookies,</li>
              <li>blokować wykorzystanie plików cookies w przyszłości.</li>
            </ol>
            <p className="my-4">
              W takich przypadkach nie będziemy ich już dłużej przetwarzać.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">
              USŁUGI ZEWNĘTRZNE / ODBIORCY DANYCH
            </h3>
            <p className="mb-4">
              Korzystamy z usług podmiotów zewnętrznych, które wspierają nas w
              prowadzeniu działalności. Powierzamy im do przetwarzania Twoje
              dane - podmioty te przetwarzają dane wyłącznie na nasze
              udokumentowane polecenie.
            </p>
            <p className="mb-4">
              Poniżej znajdziesz listę odbiorców Twoich danych:
            </p>
            <div className="overflow-x-auto">
              <table className="policy-table policy-table--3cols">
                <thead>
                  <tr>
                    <th>DZIAŁANIE</th>
                    <th>ODBIORCY DANYCH</th>
                    <th>PRZEKAZANIE DANYCH POZA UNIĘ EUROPEJSKĄ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      przebywanie na stronie Serwisu z ustawieniami
                      zezwalającymi na prowadzenie działań marketingowych
                    </td>
                    <td>podmiot zapewniający usługi marketingowe</td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td>
                      przebywanie na stronie Serwisu z ustawieniami
                      zezwalającymi na prowadzenie działań analitycznych
                    </td>
                    <td>
                      podmiot umożliwiający działania analityczne na stronie
                    </td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>
                      skorzystanie z płatnych usług dostępnych w Serwisie
                    </td>
                    <td>biuro rachunkowe</td>
                    <td>nie ma miejsca</td>
                  </tr>
                  <tr>
                    <td>dostawca płatności</td>
                    <td>nie ma miejsca</td>
                  </tr>
                  <tr>
                    <td>
                      dostawca standardowego oprogramowania biurowego (w tym
                      skrzynki poczty elektronicznej)
                    </td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td>
                      skorzystanie z bezpłatnych usług dostępnych w Serwisie
                    </td>
                    <td>
                      dostawca standardowego oprogramowania biurowego (w tym
                      skrzynki poczty elektronicznej)
                    </td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td>
                      skorzystanie przez Ciebie z usług dostarczanych nam w
                      związku z Serwisem przez portale społecznościowe
                    </td>
                    <td>portale społecznościowe</td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td>nawiązanie z nami kontaktu (np. zadanie pytania)</td>
                    <td>
                      dostawca standardowego oprogramowania biurowego (w tym
                      skrzynki poczty elektronicznej)
                    </td>
                    <td>tak - Stany Zjednoczone Ameryki **</td>
                  </tr>
                  <tr>
                    <td>
                      hotele lub inne obiekty turystyczne - jeśli zdecydujesz
                      się skorzystać z ich usług za pośrednictwem naszego
                      Serwisu
                    </td>
                    <td>hotele lub inne obiekty turystyczne</td>
                    <td>
                      w zależności od oferty - zgodnie z siedzibą usługodawcy
                      świadczącego usługę hotelową oraz lokalizacją obiektu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 mb-4 font-bold">A ponadto:</p>
            <p className="mb-4">
              odpowiednie organy publiczne w zakresie, w jakim jesteśmy
              zobowiązani do udostępnienia im danych.
            </p>
          </section>
          <section className="mb-4 text-sm md:text-base">
            <h3 className="font-bold mb-4">
              PRZEKAZYWANIE DANYCH OSOBOWYCH DO PAŃSTW SPOZA UNII EUROPEJSKIEJ
            </h3>
            <p className="mb-4">
              ** W związku z powyższym, Twoje dane osobowe mogą być przetwarzane
              również przez podmioty spoza Unii Europejskiej - do Stanów
              Zjednoczonych Ameryki. Właściwy poziom ochrony Twoich danych, w
              tym poprzez stosowanie odpowiednich zabezpieczeń, zapewnia
              uczestnictwo tych podmiotów w tzw. Data Privacy Framework, a więc
              programie ustanowionym decyzją wykonawczą Komisji Europejskiej
              jako zbiór zasad gwarantujących odpowiednią ochronę Twojej
              prywatności.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
