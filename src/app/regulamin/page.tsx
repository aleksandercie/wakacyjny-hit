import { ImageBanner } from '@/components/imageBanner';
import { createMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  createMetadata({
    title: 'Regulamin - Wakacyjny Hit',
    description:
      'Zapoznaj się z regulaminem korzystania z serwisu Wakacyjny Hit. Dowiedz się więcej o zasadach i warunkach świadczenia usług.',
    ogTitle: 'Regulamin - Wakacyjny Hit',
    ogDescription:
      'Sprawdź regulamin serwisu Wakacyjny Hit i poznaj zasady korzystania z naszych usług.',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/regulamin`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/regulamin`,
    noIndex: false,
  });

export default function TermsPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Regulamin" title="Regulamin" />
        <div className="max-w-[1000px] mx-auto flex flex-col gap-6 text-base text-muted">
          <div className="flex flex-col">
            <h2 className="text-center text-xl font-bold">Regulamin serwisu</h2>
            <p className="text-center">wakacyjnyhit.com</p>
          </div>
          <section>
            <h3 className="font-bold mb-4">SPIS TREŚCI</h3>
            <p>
              <a href="#1">§ 1 Definicje</a> <br />
              <a href="#2">§ 2 Kontakt z Usługodawcą</a> <br />
              <a href="#3">§ 3 Wymogi techniczne</a> <br />
              <a href="#4">§ 4 Usługi podstawowe</a> <br />
              <a href="#5">§ 5 Konto</a> <br />
              <a href="#6">§ 6 Usługa rozszerzone</a> <br />
              <a href="#7">§ 7 Gwarancja dostępności</a> <br />
              <a href="#8">§ 8 Płatności</a> <br />
              <a href="#9">§ 9 Reklamacje</a> <br />
              <a href="#10">§ 10 Prawo odstąpienia od umowy</a> <br />
              <a href="#11">§ 11 Brak prawa odstąpienia od umowy</a> <br />
              <a href="#12">§ 12 Dane osobowe</a> <br />
              <a href="#13">§ 13 Zmiana w Regulaminie lub usłudze</a> <br />
              <a href="#14">§ 14 Postanowienia końcowe</a>
            </p>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="1">
              § 1 DEFINICJE
            </h3>
            <p>
              <span className="font-bold mb-4">Konsument</span> - Usługobiorca
              będący osobą fizyczną, który zawarł na podstawie Regulaminu umowę
              w zakresie świadczenia Usług lub podejmuje czynności zmierzające
              do jej zawarcia, bez bezpośredniego związku z jego działalnością
              gospodarczą lub zawodową. <br />
              <span className="font-bold mb-4">Konto</span> - usługa cyfrowa w
              rozumieniu Ustawy o prawach konsumenta, świadczona nieodpłatnie
              drogą elektroniczną przez Usługodawcę na rzecz Usługobiorcy,
              dzięki której Usługobiorca może skorzystać z wszystkich funkcji
              Serwisu, w tym - odpłatnie, z Usługi rozszerzonej. <br />
              <span className="font-bold mb-4">Linki</span> - przekazywane przez
              Usługodawcę drogą elektroniczną (na adres e-mail przypisany do
              Konta) Usługobiorcy odnośniki do stron internetowych podmiotów
              innych niż Usługodawca, na których Usługobiorca może nabyć Usługi
              hotelowe oraz Usługi lotnicze o parametrach wskazanych w
              Podstawowej informacji. <br />{' '}
              <span className="font-bold mb-4">Usługa rozszerzona</span> -
              usługa cyfrowa w rozumieniu Ustawy o prawach konsumenta,
              świadczone odpłatnie drogą elektroniczną przez Usługodawcę na
              rzecz Usługobiorcy polegająca na udostępnieniu Usługobiorcy Pełnej
              informacji, w szczególności Linków, umożliwiających nabycie Usługi
              hotelowej oraz Usługi lotniczej o parametrach wskazanych w
              Podstawowej informacji. <br />
              <span className="font-bold mb-4">Usługa hotelowa</span> -
              świadczona przez podmiot inny niż Usługodawca usługa
              zakwaterowania w celach innych niż pobytowe, zamówiona
              bezpośrednio od tego podmiotu, na stronie internetowej, do której
              prowadzi Link. <br />
              <span className="font-bold mb-4">Usługa lotnicza</span> -
              świadczona przez podmiot inny niż Usługodawca usługa transportu
              lotniczego pasażerów, zamówiona bezpośrednio od tego podmiotu na
              stronie internetowej, do której prowadzi Link. <br />
              <span className="font-bold mb-4">Usługi podstawowe</span> - usługi
              cyfrowe w rozumieniu Ustawy o prawach konsumenta, świadczone
              nieodpłatnie drogą elektroniczną przez Usługodawcę na rzecz
              Usługobiorcy polegające na umożliwieniu Usługobiorcy korzystanie z
              Serwisu w podstawowym zakresie tj. w szczególności na przeglądanie
              Podstawowych informacji. <br />
              <span className="font-bold mb-4">
                Przedsiębiorca uprzywilejowany
              </span>{' '}
              - Usługobiorca, który jest osobą fizyczną zawierającą na podstawie
              Regulaminu umowę w zakresie Usług Usługodawcy (lub podejmującą
              czynności zmierzające do jej zawarcia), bezpośrednio związaną z
              jej działalnością gospodarczą, ale nieposiadającą dla niej
              charakteru zawodowego. <br />
              <span className="font-bold mb-4">Regulamin</span> - niniejszy
              regulamin. <br />
              <span className="font-bold mb-4">Serwis</span> - serwis
              internetowy Wakacyjny hit, prowadzony przez Usługodawcę pod
              adresem wakacyjnyhit.com w ramach, którego dostępne są informacje
              dotyczące Usług hotelowych oraz Usług lotniczych w atrakcyjnych, w
              ocenie Usługodawcy, cenach. <br />
              <span className="font-bold mb-4">Usługobiorca</span> - każdy
              podmiot, który zawarł umowę o świadczenie Usług Usługodawcy lub
              podejmuje czynności zmierzające do jej zawarcia. <br />
              <span className="font-bold mb-4">
                Usługobiorca uprzywilejowany
              </span>{' '}
              - Usługobiorca, który jest Konsumentem lub Przedsiębiorcą
              uprzywilejowanym. <br />
              <span className="font-bold mb-4">Usługodawca</span> -
              ----------------------------------------- <br />
              <span className="font-bold mb-4">
                Ustawa o prawach konsumenta
              </span>{' '}
              - polska ustawa z dnia 30 maja 2014 r. o prawach konsumenta.{' '}
              <br />
              <span className="font-bold mb-4">Pełne informacje</span> -
              szczegółowe dane dotyczące Usług hotelowych oraz Usług lotniczych
              udostępniane w ramach Usługi rozszerzonej, na które składają się
              dane zawarte w Podstawowej informacji oraz Linki umożliwiające
              nabycie Usługi lotniczej i Usługi hotelowej, a także ogólne
              wskazówki podróżne <br />
              <span className="font-bold mb-4">Podstawowa informacja</span> -
              dostępne dla wszystkich użytkowników Serwisu informacje dotyczące
              Usług hotelowych oraz Usług lotniczych, na które składają się:
              okres podróży, wskazanie hotelu objętego Usługą hotelową oraz
              miejsca wylotu oraz przylotu w ramach Usługi lotniczej. <br />
              <span className="font-bold mb-4">Umowa</span> - umowa w zakresie
              świadczenie Usług podstawowych, Konta lub Usługi rozszerzonej,
              zawierana pomiędzy Usługobiorcą a Usługodawcą.
            </p>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="2">
              § 2 KONTAKT Z USŁUGODAWCĄ
            </h3>
            <ol className="list-decimal pl-5">
              <li>Adres pocztowy -----------------------------------------</li>
              <li>Adres e-mail: -----------------------------------------</li>
              <li>Telefon: -----------------------------------------</li>
              <li>
                Koszt połączenia telefonicznego lub transmisji danych
                wykonywanych przez Usługobiorcę wynika z podstawowej taryfy
                operatora telekomunikacyjnego lub dostawcy usług internetowych,
                z którego usług korzysta Usługobiorca. Usługodawca zwraca uwagę,
                że koszt połączenia międzynarodowego lub międzynarodowej
                transmisji danych może być wyższy niż koszt połączenia lub
                transmisji krajowej - w zależności od taryfy przyjętej przez
                operatora telekomunikacyjnego lub dostawcę usług internetowych,
                z usług którego korzysta Usługobiorca.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="3">
              § 3 WYMOGI TECHNICZNE
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Dla prawidłowego korzystania z Usług podstawowych potrzebne
                jest:
                <ul className="list-disc pl-5">
                  <li>urządzenie z dostępem do Internetu,</li>
                  <li>
                    przeglądarka internetowa obsługująca JavaScript i pliki
                    cookies.
                  </li>
                </ul>
              </li>
              <li>
                Dla prawidłowego korzystania z Konta oraz Usługi rozszerzonej
                dodatkowo niezbędne jest aktywne konto e-mail.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="4">
              § 4 USŁUGI PODSTAWOWE
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Korzystanie z Usług podstawowych w Serwisie jest bezpłatne. W
                celu skorzystania z Usług podstawowych należy skorzystać z
                odpowiednich funkcji Serwisu.
              </li>
              <li>
                Rozpoczęcie świadczenia Usługi podstawowej następuje w momencie
                rozpoczęcia korzystania z niej przez Usługobiorcę.
              </li>
              <li>
                Usługobiorca może bez ponoszenia jakichkolwiek kosztów w każdym
                czasie zrezygnować ze świadczenia Usługi podstawowej, poprzez
                zakończenie korzystania z tej usługi.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="5">
              § 5 KONTO
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Założenie Konta jest całkowicie dobrowolne i zależne od woli
                Usługobiorcy, nie jest konieczne do korzystania z Serwisu,
                natomiast bez Konta Usługobiorca ma dostęp jedynie do Usług
                podstawowych świadczonych w ramach Serwisu.
              </li>
              <li>
                Konto daje Usługobiorcy dodatkowe możliwości, takie jak: dostęp
                do Usługi rozszerzonej, przeglądanie historii zamówień złożonych
                przez Usługobiorcę w Serwisie czy samodzielna edycja danych
                Usługobiorcy.
              </li>
              <li>
                W celu założenia Konta należy wypełnić właściwy formularz w
                Serwisie.
              </li>
              <li>
                W momencie założenia Konta zawierana jest na czas nieoznaczony
                pomiędzy Usługobiorcą a Usługodawcą umowa o prowadzenie Konta na
                zasadach wskazanych w Regulaminie.
              </li>
              <li>
                Usługodawca rozpocznie świadczenie usługi prowadzenia Konta na
                zasadach określonych w Regulaminie niezwłocznie po zawarciu
                umowy o prowadzenie Konta.
              </li>
              <li>
                Usługobiorca może bez ponoszenia jakichkolwiek kosztów w każdym
                czasie zrezygnować z Konta - co nie ma wpływu na złożone
                wcześniej zamówienie na Usługę rozszerzoną
              </li>
              <li>
                Usunięcie Konta skutkuje rozwiązaniem umowy o prowadzenie Konta.
                W celu usunięcia Konta przez Usługodawcę należy wysłać swoją
                rezygnację z Konta na adres e-mail Usługodawcy podany w § 2
                Regulaminu, czego skutkiem będzie niezwłoczne usunięcie Konta
                oraz rozwiązanie umowy o prowadzenie Konta.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="6">
              § 6 USŁUGA ROZSZERZONA
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Skorzystanie z Usługi rozszerzonej jest dobrowolne i zależne od
                woli Usługobiorcy, ale też jest niezbędne do uzyskania Pełnych
                informacji.
              </li>
              <li>
                Całkowity koszt skorzystania z Usługi rozszerzonej jest wskazany
                w Serwisie.
              </li>
              <li>
                Usługa rozszerzona polega na odblokowaniu dla Usługobiorcy
                Pełnych informacji o wybranej przez Usługobiorcę podróży, która
                daje Usługobiorcy możliwość nabycia Usługi hotelowej oraz Usługi
                lotniczej w kwotach wskazanych w Podstawowych informacjach.
              </li>
              <li>
                W celu zakupienia Usługi rozszerzonej należy skorzystać z
                funkcji zamówienia tej usługi, dostępnej w Serwisie.
              </li>
              <li>
                W momencie zamówienia Usługi rozszerzonej zawierana jest umowa
                pomiędzy Usługobiorcą a Usługodawcą, która obowiązuje do momentu
                przekazania Linków (tj. do odblokowania jednej, wybranej Pełnej
                informacji) lub upływu czasu, o którym mowa w ust. 6, na
                zasadach wskazanych w Regulaminie.
              </li>
              <li>
                Prawo do skorzystania z zakupionej Usługi rozszerzonej (tj. do
                odblokowania jednej, wybranej Pełnej informacji) wygasa po 12
                miesiącach od dnia zakupu lub w momencie jej wykorzystania - w
                zależności od tego, które zdarzenie nastąpi wcześniej.
              </li>
              <li>
                Usługobiorca samodzielnie decyduje, które Pełne informacje mają
                zostać odblokowane w ramach Usługi rozszerzonej. W ramach jednej
                Usługi rozszerzonej odblokowywane są Pełne informacje o jednej
                Usłudze hotelowej oraz o jednej Usłudze lotniczej,
                przeznaczonych dla jednej podróży.
              </li>
              <li>
                Usługobiorca zostanie poinformowany o aktywowaniu Usługi
                rozszerzonej drogą elektroniczną tj. przez wysłanie przez
                Usługodawcę wiadomości e-mail do Usługobiorcy, na adres e-mail
                podany przez niego w Koncie. W wiadomości będą się znajdować
                Linki - niezbędne dla zakupienia Usługi hotelowej oraz Usługi
                lotniczej, a także inne przydatne wskazówki podróżne
                przygotowane przez Usługodawcę.
              </li>
              <li>
                Usługa rozszerzona jest świadczona przez Usługodawcę
                niezwłocznie od momentu jej opłacenia, a w każdym przypadku nie
                później niż 24 godziny od tego momentu.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="7">
              § 7 GWARANCJA DOSTĘPNOŚCI
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Usługodawca udziela Usługobiorcy gwarancji dostępności w ramach,
                której Usługobiorcy przysługuje zwrot środków za Usługę
                rozszerzoną w przypadku gdy cena Usługi hotelowej lub Usługi
                lotniczej w momencie próby rezerwacji jest wyższa niż cena
                prezentowana w Podstawowych informacjach - pod warunkiem
                wskazanym w ust. 2.
              </li>
              <li>
                Z uwagi na charakter usług tj. dynamiczne zmiany w zakresie
                zasobów hotelowych oraz lotniczych oraz to, że Usługi hotelowe
                oraz Usługi lotnicze są świadczone przez podmioty trzecie
                gwarancja, o której mowa w niniejszym paragrafie , obowiązuje w
                czasie od [...] od momentu odblokowania Pełnych informacji dla
                Usługobiorcy.
              </li>
              <li>
                W każdym przypadku wzrostu cen Usługobiorca może zdecydować o
                wymianie środków na uzyskanie dostępu do innych Pełnych
                informacji.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="8">
              § 8 PŁATNOŚCI
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                W Serwisie są dostępne następujące metody płatności za Usługi
                rozszerzone:
                <ul className="list-disc pl-5">
                  <li>zwykły przelew na rachunek bankowy Usługodawcy;</li>
                  <li>za pomocą karty płatniczej:</li>
                  <ul className="list-disc pl-5">
                    <li>Visa</li>
                    <li>Visa Electron</li>
                    <li>MasterCard</li>
                    <li>MasterCard Electronic</li>
                    <li>Maestro</li>
                  </ul>
                  <li>
                    za pośrednictwem platformy płatniczej:{' '}
                    <ul className="list-disc pl-5">
                      <li>PayPal</li>
                      <li>[...]</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Za zamówienie należy zapłacić bezpośrednio po złożeniu
                zamówienia.
              </li>
              <li>
                Dokonując zamówień w Serwisie, Usługobiorca akceptuje stosowanie
                faktur elektronicznych przez Usługodawcę. Usługobiorca ma prawo
                wycofać swoją akceptację.
              </li>
              <li>
                Usługodawca zwraca uwagę, że dostępne metody płatności dla
                Usługi lotniczej oraz Usługi hotelowej wskazane powinny być
                przez dostawców tych usług lub odpowiednie serwisy, na których
                jest prowadzona sprzedaż tych usług, na ich stronach
                internetowych.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="9">
              § 9 REKLAMACJE
            </h3>
            <h4 className="font-bold mb-4">I POSTANOWIENIA OGÓLNE</h4>
            <ol className="list-decimal pl-5">
              <li>
                Usługodawca prosi o składanie reklamacji mających związek z
                Serwisem oraz Umowami na adres pocztowy lub elektroniczny
                wskazany w § 2 Regulaminu. Dotyczy to w szczególności reklamacji
                dotyczących działania Serwisu, świadczonych przez Usługodawcę
                usług (Usług Rozszerzonych, a także usługi Konta oraz Usług
                Podstawowych).
              </li>
              <li>
                Usługodawca ustosunkuje się do reklamacji w terminie 14 dni od
                otrzymania zgłoszenia reklamacyjnego.
              </li>
              <li>
                Usługodawca zwraca uwagę, że reklamacje dotyczące realizacji
                Usługi lotniczej lub Usługi hotelowej należy składać
                bezpośrednio do podmiotu świadczącego lub oferującego tę usługę,
                z którym Usługobiorca zawarł umowę.
              </li>
              <li>
                Usługodawca ponosi wobec Usługobiorcy uprzywilejowanego
                odpowiedzialność za zgodność świadczenia z umową, przewidzianą
                przez powszechnie obowiązujące przepisy prawa, w tym zwłaszcza
                przez przepisy Ustawy o prawach konsumenta.
              </li>
            </ol>
          </section>
          <section>
            <h4 className="font-bold mb-4">II USŁUGOBIORCY UPRZYWILEJOWANI</h4>
            <ol className="list-decimal pl-5">
              <li>
                W przypadku niewłaściwej realizacji przez Usługodawcę umowy o
                prowadzenie Konta, w zakresie Usług rozszerzonych lub Usług
                podstawowych Usługobiorca uprzywilejowany ma możliwość
                skorzystania z uprawnień uregulowanych w rozdziale 5b Ustawy o
                prawach konsumenta, o których mowa również poniżej.
              </li>
              <li>
                Jeżeli Usługodawca nie dostarczył usługi cyfrowej, Usługobiorca
                uprzywilejowany może wezwać go do jej dostarczenia. Jeżeli mimo
                to Usługodawca nie dostarczy usługi cyfrowej niezwłocznie lub w
                dodatkowym, wyraźnie uzgodnionym przez Usługodawcę i
                Usługobiorcę uprzywilejowanego terminie, Usługobiorca
                uprzywilejowany może odstąpić od umowy o prowadzenie Konta.
              </li>
              <li>
                Usługobiorca uprzywilejowany może odstąpić od umowy o
                świadczenie usług wskazanych w ust. 3 bez wzywania do
                dostarczenia usługi cyfrowej, jeżeli:
                <ul className="list-decimal pl-5">
                  <li>
                    z oświadczenia Usługodawcy lub okoliczności wyraźnie wynika,
                    że nie dostarczy usługi cyfrowej lub
                  </li>
                  <li>
                    Usługobiorca uprzywilejowany i Usługodawca uzgodnili lub z
                    okoliczności zawarcia umowy wyraźnie wynika, że określony
                    termin dostarczenia usługi cyfrowej miał istotne znaczenie
                    dla Usługobiorcy uprzywilejowanego, a Usługodawca nie
                    dostarczył jej w tym terminie.
                  </li>
                </ul>
              </li>
              <li>
                Usługodawca ponosi odpowiedzialność za brak zgodności z umową
                usługi cyfrowej dostarczanej w sposób ciągły, który wystąpił lub
                ujawnił się w czasie, w którym zgodnie z tą umową usługa miała
                być dostarczana.
              </li>
              <li>
                Jeśli usługa cyfrowa jest niezgodna z umową, Usługobiorca
                uprzywilejowany może żądać jej doprowadzenia do zgodności z tą
                umową.
              </li>
              <li>
                W przypadku braku zgodności usługi cyfrowej z umową Usługobiorca
                uprzywilejowany ma obowiązek współpracy z Usługodawcą, w
                rozsądnym zakresie i przy zastosowaniu najmniej uciążliwych dla
                siebie środków technicznych, w celu ustalenia, czy brak
                zgodności usługi cyfrowej z umową w odpowiednim czasie wynika z
                cech środowiska cyfrowego Usługobiorcy uprzywilejowanego.
              </li>
              <li>
                Dodatkowo, jeżeli usługa cyfrowa jest niezgodna z umową,
                Usługobiorca uprzywilejowany może złożyć oświadczenie o
                odstąpieniu od tej umowy, gdy:
                <ul className="list-decimal pl-5">
                  <li>
                    doprowadzenie do zgodności usługi cyfrowej z umową jest
                    niemożliwe albo wymaga nadmiernych kosztów stosownie do art.
                    43m ust. 2 i 3 Ustawy o prawach konsumenta;
                  </li>
                  <li>
                    Usługodawca nie doprowadził usługi cyfrowej do zgodności z
                    umową w rozsądnym czasie od chwili, w której Usługodawca
                    został poinformowany przez Usługobiorcę uprzywilejowanego o
                    braku zgodności z tą umową, i bez nadmiernych niedogodności
                    dla Usługobiorcy uprzywilejowanego, uwzględniając charakter
                    oraz cel tej usługi cyfrowej, w jakim jest wykorzystywana;
                  </li>
                  <li>
                    brak zgodności usługi cyfrowej z umową występuje nadal, mimo
                    że Usługodawca próbował doprowadzić usługę cyfrową do
                    zgodności z tą umową;
                  </li>
                  <li>
                    brak zgodności usługi cyfrowej z umową jest na tyle istotny,
                    że uzasadnia odstąpienie od umowy bez uprzedniego
                    skorzystania ze środka ochrony określonego w art. 43m Ustawy
                    o prawach konsumenta (tj. żądania doprowadzenia usługi
                    cyfrowej do zgodności z umową);
                  </li>
                  <li>
                    z oświadczenia Usługodawcy lub okoliczności wyraźnie wynika,
                    że nie doprowadzi on usługi cyfrowej do zgodności z umową w
                    rozsądnym czasie lub bez nadmiernych niedogodności dla
                    Usługobiorcy uprzywilejowanego.
                  </li>
                </ul>
              </li>
            </ol>
          </section>
          <section>
            <h4 className="font-bold mb-4">
              III POZASĄDOWE SPOSOBY ROZPATRYWANIA REKLAMACJI I DOCHODZENIA
              ROSZCZEŃ
            </h4>
            <ol className="list-decimal pl-5">
              <li>
                Usługodawca informuje Konsumenta o możliwości skorzystania z
                pozasądowych sposobów rozpatrywania reklamacji i dochodzenia
                roszczeń. Zasady dostępu do tych procedur dostępne są w
                siedzibach lub na stronach internetowych podmiotów uprawnionych
                do pozasądowego rozpatrywania sporów. Konsument może skorzystać
                m.in. z:
                <ul className="list-disc pl-5">
                  <li>
                    pomocy odpowiedniego Europejskiego Centrum Konsumenckiego z
                    Sieci Europejskich Centrów Konsumenckich. Centra udzielają
                    informacji o prawach konsumentów i pomagają w rozwiązaniu
                    sporu w przypadku zakupów transgranicznych. Pomoc
                    Europejskich Centrów Konsumenckich jest co do zasady
                    bezpłatna. Lista Centrów Konsumenckich właściwych dla danego
                    państwa znajduje się pod adresem:{' '}
                    <a
                      className="font-semibold inline-block"
                      href="https://konsument.gov.pl/eck-w-europie/"
                    >
                      https://konsument.gov.pl/eck-w-europie/
                    </a>
                  </li>
                  <li>
                    internetowej platformy Online Dispute Resolution (ODR),
                    zapewnianej przez Komisję Europejską, dostępnej pod adresem:{' '}
                    <a
                      className="font-semibold inline-block"
                      href="https://ec.europa.eu/consumers/odr"
                    >
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </li>
                  <li>
                    przy czym możliwość składania skarg za pośrednictwem
                    platformy ODR wygasa z dniem 20 marca 2025 r.
                  </li>
                </ul>
              </li>
              <li>
                Ponadto, na terenie Rzeczypospolitej Polskiej można skorzystać z
                następujących form wsparcia:
                <ul className="list-disc pl-5">
                  <li>
                    mediacji prowadzonej przez właściwy terenowo Wojewódzki
                    Inspektorat Inspekcji Handlowej, do którego należy się
                    zwrócić z wnioskiem o mediację. Co do zasady postępowanie
                    jest bezpłatne. Wykaz inspektoratów znajduje się tutaj:{' '}
                    <a
                      className="font-semibold inline-block"
                      href="https://uokik.gov.pl/kontakt-inspekcja-handlowa"
                    >
                      https://uokik.gov.pl/kontakt-inspekcja-handlowa
                    </a>
                  </li>
                  <li>
                    pomocy właściwego terenowo stałego polubownego sądu
                    konsumenckiego działającego przy Wojewódzkim Inspektoracie
                    Inspekcji Handlowej, do którego należy złożyć wniosek o
                    rozpatrzenie sprawy przed sądem polubownym. Co do zasady
                    postępowanie jest bezpłatne. Wykaz inspektoratów dostępny
                    jest pod adresem:{' '}
                    <a
                      className="font-semibold inline-block"
                      href="https://uokik.gov.pl/kontakt-inspekcja-handlowa"
                    >
                      https://uokik.gov.pl/kontakt-inspekcja-handlowa
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Poprzednie postanowienie ma charakter informacyjny i nie stanowi
                zobowiązania Usługodawcy do skorzystania z pozasądowych sposobów
                rozwiązywania sporów.
              </li>
              <li>
                Skorzystanie z pozasądowych sposobów rozpatrywania reklamacji i
                dochodzenia roszczeń jest dobrowolne zarówno dla Usługodawcy jak
                i Konsumenta.
              </li>
              <li>
                Konsument może dodatkowo skorzystać z bezpłatnej pomocy
                miejskiego lub powiatowego rzecznika konsumentów.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="10">
              § 10 PRAWO ODSTĄPIENIA OD UMOWY
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Usługobiorca uprzywilejowany ma prawo odstąpić od Umowy, z
                zastrzeżeniem § 11 Regulaminu, w terminie 14 dni bez podania
                jakiejkolwiek przyczyny.
              </li>
              <li>
                Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia
                zawarcia Umowy.
              </li>
              <li>
                Aby Usługobiorca uprzywilejowany mógł skorzystać z prawa
                odstąpienia od umowy musi poinformować Usługodawcę, korzystając
                z danych podanych w § 2 Regulaminu, o swojej decyzji o
                odstąpieniu od umowy w drodze jednoznacznego oświadczenia (na
                przykład pismo wysłane pocztą lub pocztą elektroniczną).
              </li>
              <li>
                Usługobiorca uprzywilejowany może skorzystać z wzoru formularza
                odstąpienia od umowy umieszczonego na końcu Regulaminu, jednak
                nie jest to obowiązkowe.
              </li>
              <li>
                Aby zachować termin do odstąpienia od umowy wystarczy, że
                Usługobiorca uprzywilejowany wyśle informację dotyczącą
                wykonania przysługującego mu prawa odstąpienia od umowy przed
                upływem terminu do odstąpienia od umowy.
              </li>
              <li>
                W przypadku odstąpienia od zawartej Umowy Usługodawca zwraca
                Usługobiorcy uprzywilejowanemu wszystkie otrzymane od niego
                płatności - z zastrzeżeniem ust. 9, niezwłocznie, a w każdym
                przypadku nie później niż 14 dni od dnia, w którym Usługodawca
                został poinformowany o decyzji Usługobiorcy uprzywilejowanego o
                wykonaniu prawa odstąpienia od umowy.
              </li>
              <li>
                Zwrotu płatności Usługodawca dokona przy użyciu takich samych
                sposobów płatności, jakie zostały przez Usługobiorcę
                uprzywilejowanego użyte w pierwotnej transakcji, chyba że
                Usługobiorca uprzywilejowany zgodzi się na inne rozwiązanie, w
                każdym przypadku Usługobiorca uprzywilejowany nie poniesie
                żadnych opłat w związku z tym zwrotem.
              </li>
              <li>
                W przypadku wystąpienia konieczności zwrotu środków za
                transakcję dokonaną przez Usługobiorcę uprzywilejowanego kartą
                płatniczą, Usługodawca dokona zwrotu na rachunek bankowy
                przypisany do tej karty płatniczej.
              </li>
              <li>
                W przypadku gdy Usługobiorca uprzywilejowany wykonuje prawo
                odstąpienia od umowy po zgłoszeniu żądania rozpoczęcia
                świadczenia usług (świadczenia Usługi rozszerzonej) przed
                upływem terminu, o którym mowa w ust. 1, ma on obowiązek zapłaty
                Usługodawcy kwoty proporcjonalnej do zakresu świadczeń
                spełnionych do chwili, w której poinformował Usługodawcę o
                odstąpieniu od umowy.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="11">
              § 11 BRAK PRAWA ODSTĄPIENIA OD UMOWY
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Prawo odstąpienia od umowy na odległość, o którym mowa w
                paragrafie 10, nie przysługuje Usługobiorcy uprzywilejowanemu w
                odniesieniu do umów:
                <ol className="list-disc pl-5">
                  <li>
                    <span className="font-bold">
                      o świadczenie usług, za które Usługobiorca uprzywilejowany
                      jest zobowiązany do zapłaty ceny - tj. Usług rozszerzonych
                    </span>
                    , jeżeli Usługodawca wykonał w pełni usługę za wyraźną i
                    uprzednią zgodą Usługobiorcy uprzywilejowanego, który został
                    poinformowany przed rozpoczęciem świadczenia, że po
                    spełnieniu świadczenia przez Usługodawcę utraci prawo
                    odstąpienia od umowy, i przyjął to do wiadomości.
                  </li>
                </ol>
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="12">
              § 12 DANE OSOBOWE
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Administratorem danych osobowych przekazanych przez Usługobiorcę
                w związku z zawarciem Umów w oparciu o Regulamin jest
                Usługodawca. Szczegółowe informacje dotyczące przetwarzania
                danych osobowych przez Usługodawcę - w tym o pozostałych celach
                oraz podstawach przetwarzania danych, a także o odbiorcach
                danych, znajdują się w dostępnej w Serwisie polityce prywatności
                - ze względu na zasadę przejrzystości, zawartą w ogólnym
                rozporządzeniu Parlamentu Europejskiego i Rady (UE) o ochronie
                danych - „RODO”.
              </li>
              <li>
                Celem przetwarzania danych Usługobiorcy jest świadczenie usług.
                Podstawą przetwarzania danych osobowych w tym przypadku jest:
                <ol className="list-disc pl-5">
                  <li>
                    umowa o świadczenie usług lub działania podejmowane na
                    żądanie Usługobiorcy, zmierzające do jej zawarcia (art. 6
                    ust. 1 lit. b RODO),
                  </li>
                  <li>
                    w przypadku umów odpłatnych - obowiązek prawny związany z
                    rachunkowością, zobowiązujący Usługodawcę do przetwarzania
                    danych osobowych Usługobiorcy (art. 6 ust. 1 lit. c RODO), a
                    także prawnie
                  </li>
                  <li>
                    uzasadniony interes Usługodawcy, polegający na przetwarzaniu
                    danych w celu ustalenia, dochodzenia lub obrony ewentualnych
                    roszczeń (art. 6 ust. 1 lit. f RODO).
                  </li>
                </ol>
              </li>
              <li>
                Podanie danych przez Usługobiorcę jest dobrowolne, ale
                jednocześnie konieczne do zawarcia umów z Usługodawcą, o których
                mowa w Regulaminie i świadczenia usług nimi objętych. Niepodanie
                danych oznacza, że umowa nie będzie mogła być zawarta,
                Usługodawca nie będzie mógł świadczyć usług nią objętych.
              </li>
              <li>
                Dane Usługobiorcy będą przetwarzane do momentu, w którym:
                <ol className="list-disc pl-5">
                  <li>przestanie obowiązywać właściwa umowa;</li>
                  <li>
                    ustanie możliwość dochodzenia roszczeń przez Usługobiorcę
                    lub Usługodawcę, związanych z umowami zawartymi w oparciu o
                    Regulamin;
                  </li>
                  <li>
                    zostanie przyjęty sprzeciw Usługobiorcy wobec przetwarzania
                    jego danych osobowych - w przypadku gdy podstawą
                    przetwarzania danych był uzasadniony interes Usługodawcy - w
                    zależności od tego, co ma zastosowanie w danym przypadku.
                  </li>
                </ol>
              </li>
              <li>
                Usługobiorcy przysługuje prawo żądania:
                <ol className="list-disc pl-5">
                  <li>dostępu do swoich danych osobowych,</li>
                  <li>ich sprostowania,</li>
                  <li>usunięcia,</li>
                  <li>ograniczenia przetwarzania,</li>
                  <li>
                    przeniesienia danych do innego administratora a także prawo:
                  </li>
                  <li>
                    wniesienia w dowolnym momencie sprzeciwu wobec przetwarzania
                    danych z przyczyn związanych ze szczególną sytuacją
                    Usługobiorcy - wobec przetwarzania dotyczących go danych
                    osobowych, opartego na art. 6 ust. 1 lit. f RODO (tj. na
                    prawnie uzasadnionych interesach realizowanych przez
                    Usługodawcę).
                  </li>
                </ol>
              </li>
              <li>
                W celu realizacji swoich praw, Usługobiorca powinien
                skontaktować się z Usługodawcą.
              </li>
              <li>
                W przypadku gdy Usługobiorca uzna, że jego dane są przetwarzane
                niezgodnie z prawem, Usługobiorca może złożyć skargę do organu
                właściwego dla ochrony danych osobowych. W Polsce jest nim
                Prezes Urzędu Ochrony Danych Osobowych.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="13">
              § 13 ZMIANA W REGULAMINIE LUB KONCIE
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Usługodawca zastrzega sobie prawo do zmiany Regulaminu tylko z
                ważnych przyczyn. Jako ważną przyczynę rozumie się konieczność
                zmiany Regulaminu spowodowaną:
                <ol className="list-disc pl-5">
                  <li>
                    zmianą funkcjonalności Serwisu, wymagającą modyfikacji
                    Regulaminu lub
                  </li>
                  <li>
                    zmianą przepisów prawa, mającą wpływ na realizację umów
                    przez Usługodawcę lub dostosowaniem usług do zaleceń,
                    wytycznych, nakazów lub zakazów, orzeczeń, postanowień,
                    interpretacji lub decyzji uprawnionych władz publicznych lub
                  </li>
                  <li>
                    zmianą danych kontaktowych lub identyfikacyjnych
                    Usługodawcy.
                  </li>
                </ol>
              </li>
              <li>
                Zmiany nie będą miały wpływu na już zawarte umowy w zakresie
                Usług rozszerzonych.
              </li>
              <li>
                Informacja o planowanej zmianie Regulaminu zostanie wysłana na
                adres e-mail Usługobiorcy przypisany do Konta co najmniej na 14
                dni przed wprowadzeniem zmian w życie.
              </li>
              <li>
                W przypadku gdy Usługobiorca nie sprzeciwi się planowanym
                zmianom do chwili wejścia ich w życie, przyjmuje się, że
                akceptuje je, co nie stanowi żadnej przeszkody do rozwiązania
                umowy w przyszłości.
              </li>
              <li>
                W przypadku braku akceptacji dla planowanych zmian, Usługobiorca
                powinien wysłać informację o tym na adres e-mail Usługodawcy
                podany w § 2 Regulaminu, co będzie skutkować rozwiązaniem umów
                zawartych na czas nieokreślony, z chwilą wejścia w życie
                planowanych zmian.
              </li>
              <li>
                Usługodawca może dokonać zmiany Konta, która nie jest niezbędna
                do zachowania jego zgodności z umową o prowadzenie Konta, z
                przyczyny wskazanej w ust. 1 lit. b lub z powodu zmiany
                funkcjonalności Konta. Wprowadzenie zmiany, o której mowa w
                zdaniu poprzednim, nie będzie się wiązać z jakimikolwiek
                kosztami po stronie Usługobiorcy uprzywilejowanego.
                Postanowienie ust. 2-5 stosuje się odpowiednio.
              </li>
              <li>
                Jeżeli zmiana, o której mowa w ust. 6, istotnie i negatywnie
                wpływa na dostęp Usługobiorcy uprzywilejowanego do Konta lub
                korzystanie z niego, Usługodawca wyśle na adres e-mail
                Usługobiorcy uprzywilejowanego, z odpowiednim wyprzedzeniem, na
                trwałym nośniku, informację o właściwościach i terminie
                dokonania tej zmiany oraz prawach przysługujących w związku z tą
                zmianą Usługobiorcy uprzywilejowanemu.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="14">
              § 14 POSTANOWIENIA KOŃCOWE
            </h3>
            <ol className="list-decimal pl-5">
              <li>
                Zakazane jest dostarczanie przez Usługobiorcę treści o
                charakterze bezprawnym.
              </li>
              <li>
                Umowy zawierane w oparciu o Regulamin są zawierane w języku
                polskim.
              </li>
              <li>
                Umowy zawierane na podstawie niniejszego Regulaminu podlegają
                przepisom prawa polskiego, z zastrzeżeniem ust. 4.
              </li>
              <li>
                Wybór prawa polskiego dla umowy zawartej na podstawie Regulaminu
                z Konsumentem nie uchyla i nie ogranicza praw Konsumenta
                przysługujących mu na podstawie bezwzględnie obowiązujących
                przepisów prawa, znajdujących zastosowanie dla Konsumenta w
                sytuacji, w której nie ma miejsca wybór prawa. Oznacza to w
                szczególności, że jeśli właściwe dla danego Konsumenta przepisy
                krajowe przewidują ochronę szerszą niż wynikająca z niniejszego
                Regulaminu lub prawa polskiego - stosuje się tę ochronę szerszą.
              </li>
              <li>
                W przypadku ewentualnego sporu z Usługobiorcą niebędącym
                Usługobiorcą uprzywilejowanym, związanego z umową o prowadzenie
                Konta, sądem właściwym będzie sąd właściwy dla siedziby
                Usługodawcy.
              </li>
              <li>
                Wszelka odpowiedzialność Usługodawcy w związku z umową o
                prowadzenie Konta w stosunku do Usługobiorcy niebędącego
                Usługobiorcą uprzywilejowanym, w granicach prawem dopuszczonych,
                jest wyłączona.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-bold mb-4" id="14">
              Załącznik nr 1 do Regulaminu
            </h3>
            <p>
              Poniżej znajduje się wzór formularza odstąpienia od umowy, z
              którego Konsument lub Przedsiębiorca uprzywilejowany może, ale nie
              musi skorzystać:
            </p>
            <div className="flex flex-col">
              <div className="w-[204px] 2xs:w-full">
                <a
                  href="https://trfyanyvdyozqndwmiyr.supabase.co/storage/v1/object/public/files/formularz-odstapienia-od-umowy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  download="wzór formularza odstąpienia od umowy.pdf"
                >
                  wzór formularza odstąpienia od umowy (pdf)
                </a>
              </div>
              <div className="w-[204px] 2xs:w-full">
                <a
                  href="https://trfyanyvdyozqndwmiyr.supabase.co/storage/v1/object/public/files/formularz-odstapienia-od-umowy.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  download="wzór formularza odstąpienia od umowy.docx"
                >
                  wzór formularza odstąpienia od umowy (docx)
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
