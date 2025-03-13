import React from 'react';
import Image from 'next/image';
import { MailCheck, MessageCircle, MessagesSquare, Search } from 'lucide-react';

export const HowItWorks = () => {
  const points = [
    {
      title: 'Wybierz spośród naszych usług odpowiedni pakiet.',
      description: '',
      icon: <Search />
    },
    {
      title: 'Wpisz w formularzu wytyczne dot. wyjazdu i złóż zamówienie.',
      description: '',
      icon: <MessageCircle />
    },
    {
      title:
        'Otrzymasz spersonalizowane oferty wyjazdu lub w przypadku oferty dnia linki do rezerwacji wyjazdu.',
      description: '',
      icon: <MessagesSquare />
    },
    {
      title:
        'Dokonaj rezerwacji według naszych instrukcji. W tym czasie możesz liczyć na nasze wsparcie.',
      description: '',
      icon: <MailCheck />
    }
  ];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 max-w-[1000px] lg:max-h-[580px]">
        <div className="w-full md:w-1/2 h-full max-w-[460px]">
          <Image
            src="/tourist.jpg"
            alt="Turystka robiąca zdjęcie"
            width={468}
            height={580}
            className="h-full rounded-md"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 max-w-[460px]">
          <div className="px-8 w-full">
            <h2 className="text-base md:text-lg opacity-60">Jak to działa?</h2>
            <h3 className="text-2xl md:text-4xl font-bold mt-4">
              Zaplanuj wakacje swoich marzeń!
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {points.map(({ title, icon }) => (
              <div
                key={title}
                className="flex p-6 gap-8 items-center rounded-xl"
              >
                <div className="p-2 flex justify-center items-center">
                  {icon}
                </div>
                <p className="opacity-60 text-sm md:text-base">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
