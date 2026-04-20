import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const Faq = () => {
  const faqs = [
    {
      question: 'Czym się zajmujemy?',
      answers: [
        'Specjalizujemy się w wyszukiwaniu tanich lotów, promocji hotelowych i innych okazji podróżniczych. Choć nie jesteśmy biurem podróży ani organizatorem wycieczek, pomagamy w samodzielnym planowaniu podróży. Nasza rola polega na wyszukiwaniu najlepszych ofert, wspieraniu w rezerwacjach i doradzaniu na każdym etapie wyjazdu. Dzięki naszej wiedzy i uzyskanym zniżkom możesz podróżować taniej (dużo taniej!) niż zwykle i cieszyć się niezapomnianymi wakacjami.',
      ],
    },
    {
      question: 'Czy jesteśmy biurem podróży?',
      answers: [
        'Wakacyjnyhit.com nie jest biurem podróży. Specjalizujemy się w wyszukiwaniu okazji podróżniczych, takich jak tanie loty, promocje hotelowe i transfery. Nasza rola polega na przygotowaniu propozycji wyjazdów i przekazaniu klientom szczegółowych instrukcji, jak samodzielnie zarezerwować podróż. Wspieramy na każdym etapie, od planowania po pobyt w miejscu docelowym.',
        'Zgodnie z ustawą z dnia 24 listopada 2017 roku o imprezach turystycznych i powiązanych usługach turystycznych, nie pełnimy roli organizatora imprez turystycznych. Nasze usługi są skierowane do osób, które chcą samodzielnie planować i rezerwować podróże, korzystając z naszego doświadczenia w wyszukiwaniu najlepszych ofert.',
      ],
    },
    {
      question: 'Jak zamówić ofertę wakacyjny hit?',
      answers: [
        'Oferta Wakacyjny Hit to gotowa propozycja wyjazdu, którą dla Ciebie przygotowaliśmy. Zawiera ustalone daty, miejsce wylotu oraz inne szczegóły. Aby skorzystać z oferty, wystarczy kliknąć „ZAMÓW TERAZ” na naszej stronie. Przekierujemy Cię do płatności za naszą usługę, a po jej dokonaniu wyślemy na Twój adres e-mail linki oraz pełną instrukcję, jak samodzielnie zarezerwować wyjazd. Cały proces zajmie tylko 10 minut, a my zawsze jesteśmy dostępni, by służyć pomocą.',
      ],
    },
    {
      question: 'W czym pomagamy?',
      answers: [
        'Pomagamy w samodzielnym planowaniu podróży od A do Z. Nasze wsparcie obejmuje:',
        'Inspirację: Pomagamy znaleźć idealne destynacje dla Twoich wakacji.',
        'Przygotowanie propozycji: Dostarczamy Ci gotowe plany podróży z najlepszymi ofertami na loty, hotele i transfery.',
        'Pomoc w rezerwacji: Przekazujemy instrukcje, jak samodzielnie zarezerwować podróż.',
        'Wsparcie podczas wyjazdu: Jesteśmy zawsze dostępni, aby pomóc w każdej sytuacji podczas Twojej podróży.',
      ],
    },
    {
      question: 'Czego nie robimy?',
      answers: [
        'Nie jesteśmy biurem podróży ani organizatorem wyjazdów. Nie sprzedajemy biletów lotniczych, noclegów ani transferów. Nie dokonujemy zakupu biletów w Twoim imieniu; rezerwację wykonujesz samodzielnie. Chociaż chętnie pomożemy w całym procesie, zawsze służymy pomocą, rozwiewając wszelkie wątpliwości i udzielając wskazówek na każdym etapie rezerwacji.',
        'Ważne informacje prawne:',
        'Nie ponosimy odpowiedzialności za błędy w rezerwacjach, spóźnienia na samolot, niewywiązanie się z obowiązków związanych z wjazdem do danego kraju, opóźnienia czy anulowanie lotu.',
        'Nie zajmujemy się wyszukiwaniem biletów lotniczych nabytych w ramach błędu taryfowego lub innych nielegalnych działań.',
        'Nie jesteśmy organizatorem imprez turystycznych ani przedsiębiorcą ułatwiającym organizację powiązanych usług turystycznych. Rezerwując samodzielnie taką podróż u zewnętrznych dostawców, nie jesteście objęci ochroną Turystycznym Funduszem Gwarancyjnym. Każdy wyjazd organizujecie na własną odpowiedzialność, a to Wy musicie zadbać o niezbędne dokumenty i spełnienie wymagań krajów docelowych.',
      ],
    },
    {
      question: 'Czy mogę otrzymać fakturę VAT za usługę?',
      answers: [
        'Tak, faktury za nasze usługi doradztwa podróżniczego są wystawiane automatycznie na koniec każdego miesiąca. Faktury zawierają podatek VAT w wysokości 23%, zgodnie z obowiązującymi przepisami. Jeśli masz jakieś dodatkowe pytania dotyczące faktur, skontaktuj się z nami.',
      ],
    },
    {
      question: 'Czy mogę otrzymać fakturę vat za całe wakacje?',
      answers: [
        'Nie wystawiamy faktur za samodzielnie zarezerwowane przez Ciebie przeloty, noclegi czy transfery, ponieważ nie jesteśmy organizatorem imprez turystycznych ani podmiotem świadczącym powiązane usługi turystyczne. Jedyną fakturą, którą otrzymasz od nas, będzie faktura za usługę doradztwa podróżniczego, która zawiera podatek VAT w wysokości 23%. Faktury te są wystawiane automatycznie na koniec każdego miesiąca.',
      ],
    },
    {
      question:
        'Czy mogę zrezygnować z wyjazdu i odzyskać pełną kwotę zapłaconych kosztów?',
      answers: [
        'Większość wyjazdów zorganizowanych na własną rękę nie podlega anulowaniu, a bilety są zwykle bezzwrotne. Dokładne warunki zwrotu należy omówić bezpośrednio z dostawcą usług, u którego rezerwowaliście przelot, hotel czy transfer. Nasza firma nie jest stroną w sprawach dotyczących ewentualnego zwrotu kosztów. Zawsze służymy pomocą w kwestiach związanych z planowaniem podróży, ale w sprawach zwrotu kosztów należy kontaktować się bezpośrednio z dostawcą.',
      ],
    },
    {
      question: 'Co nas odróżnia od konkurencji?',
      answers: [
        'Jako firma specjalizująca się w poradach podróżniczych, stawiamy na pełną transparentność i uczciwość. Zawsze informujemy jasno o wszystkich aspektach podróży, w tym kwestiach związanych z bagażem. Nasze podejście jest pro-konsumenckie: dbamy o zadowolenie naszych klientów na każdym etapie planowania podróży.',
      ],
    },
  ];

  return (
    <div
      className={`flex flex-col gap-8 max-w-[1000px] mx-auto w-4/5 md:w-full mt-12 md:px-4 lg:px-0`}
    >
      <h2 className="text-2xl md:text-4xl lg:text-center">
        Najczęściej zadawane pytania
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {faqs.map(({ question, answers }) => (
          <Accordion type="single" collapsible key={question}>
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="text-base md:text-2xl w-full">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-muted text-sm md:text-base w-full">
                <div className="flex flex-col gap-2">
                  {answers.map((answer, index) => (
                    <p key={`${question}-${index}`}>{answer}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
