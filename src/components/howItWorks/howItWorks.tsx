import React from 'react';
import Image from 'next/image';
import { Header } from '../header';
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
      <div className="flex gap-8 max-w-[1000px] max-h-[580px]">
        <div className="max-w-[480px] h-full">
          <Image
            src="/tourist.jpg"
            alt="Turystka robiąca zdjęcie"
            width={468}
            height={580}
            className="h-full rounded-md shadow-[14px_17px_34px_-4px_rgba(0,_0,_0,_0.1)]"
          />
        </div>
        <div className="flex flex-col max-w-[500px] w-full">
          <div className="px-8 w-full">
            <Header
              title="Jak to działa?"
              subtitle="Zaplanuj wakacje swoich marzeń!"
              description={''}
            />
          </div>
          <div className="flex flex-col gap-4">
            {points.map(({ title, icon }) => (
              <div
                key={title}
                className="flex p-6 gap-8 items-center rounded-xl"
              >
                <div className="p-4 flex justify-center items-center rounded-xl shadow-[14px_17px_34px_-4px_rgba(0,_0,_0,_0.1)]">
                  {icon}
                </div>
                <p className="opacity-60">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
