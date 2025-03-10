import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export const Faq = () => {
  const faqs = [
    {
      question: 'Czy wasza firma jest organizatorem wyjazdów turystycznych?',
      answer:
        'Specjalizujemy się w wyszukiwaniu korzystnych ofert lotów, hoteli i transferów. Zgodnie z obowiązującymi przepisami o imprezach turystycznych, nie działamy jako organizator podróży. Nie prowadzimy sprzedaży biletów, noclegów ani transferów – pomagamy jedynie znaleźć najlepsze opcje i ułatwiamy samodzielne zarezerwowanie wyjazdu. Dzięki temu podróżowanie na własną rękę jest bardziej elastyczne i często tańsze niż tradycyjne pakiety turystyczne. Dodatkowo zapewniamy wsparcie na każdym etapie organizacji – od planowania po pomoc w trakcie podróży.'
    },
    {
      question: 'Na czym polega wasza działalność?',
      answer:
        'Naszym celem jest pomoc w wyszukiwaniu atrakcyjnych cenowo lotów, hoteli i transportu, dzięki czemu możecie zorganizować podróż samodzielnie. Wspieramy w znalezieniu najlepszych ofert i udostępniamy narzędzia ułatwiające rezerwację. Dzięki naszej pomocy podróżni mogą skorzystać z rabatów na zakwaterowanie, wynajem samochodów czy inne usługi turystyczne. Niezależnie od tego, czy planujecie krótki city break, czy dłuższą podróż, dostarczamy niezbędne informacje, by uczynić wyjazd prostym i ekonomicznym.'
    },
    {
      question: 'Jak wygląda współpraca z wami?',
      answer:
        'Proces współpracy jest prosty – pomagamy w znalezieniu najlepszych opcji transportu i zakwaterowania, dostosowanych do waszych potrzeb i budżetu. Po wskazaniu preferencji przedstawiamy propozycje lotów, noclegów oraz ewentualnych transferów, a decyzja o rezerwacji należy do was. Oferujemy pełne wsparcie – od pierwszego kroku planowania, przez pomoc w rezerwacji, aż po wskazówki dotyczące podróży. Naszym celem jest ułatwienie samodzielnego podróżowania i zapewnienie dostępu do atrakcyjnych ofert bez pośredników.'
    }
  ];

  return (
    <div
      className={`flex flex-col gap-8 max-w-[1000px] mx-auto w-4/5 md:w-full mt-12 md:px-4 lg:px-0`}
    >
      <h2 className="text-2xl md:text-4xl lg:text-center">
        Najczęściej zadawane pytania
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {faqs.map(({ question, answer }) => (
          <Accordion type="single" collapsible key={question}>
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="text-base md:text-2xl w-full">
                {question}
              </AccordionTrigger>
              <AccordionContent className="opacity-60 text-sm md:text-base w-full">
                {answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
