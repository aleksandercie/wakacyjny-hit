import React from 'react';
import Image from 'next/image';
import { FileText, MailCheck, ShoppingCart } from 'lucide-react';

export const HowItWorks = async () => {
  const points = [
    {
      title:
        'Dodaj interesującą Cię ofertę do koszyka, wybierając liczbę podróżnych, termin oraz rodzaj wyżywienia, jeśli oferta oferuje różne opcje.',
      description: '',
      icon: <ShoppingCart />
    },
    {
      title: 'Wprowadź swoje dane, opłać usługę i zrealizuj zamówienie.',
      description: '',
      icon: <FileText />
    },
    {
      title:
        'Po opłaceniu usługi, w ciągu maksymalnie 24h otrzymasz linki do rezerwacji wraz z instrukcją "gdzie kliknąć" :). Nie martw się - w razie czego pomożemy Ci przejść przez cały proces rezerwacji!',
      description: '',
      icon: <MailCheck />
    }
  ];
  const imageUrl = '/guide.jpg';

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 max-w-[1000px]">
        <div className="w-full md:w-1/2 h-full max-h-[400px] md:max-h-[580px] md:flex md:items-center overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt="Drogowskazy"
            width={484}
            height={580}
            className="w-full h-full object-cover object-center md:object-bottom rounded-md"
          />
        </div>
        <div className="flex items-center w-full md:w-1/2">
          <div className="flex flex-col">
            <div className="px-8 w-full">
              <h2 className="text-base lg:text-lg text-gray-500">
                Jak to działa?
              </h2>
              <h3 className="text-xl lg:text-4xl font-bold mt-4 max-w-[300px] lg:max-w-[400px]">
                Jak zarezerwować ofertę Wakacyjny Hit?
              </h3>
            </div>
            <div className="flex flex-col gap-4 md:mt-8 lg:mt-0">
              {points.map(({ title, icon }) => (
                <div
                  key={title}
                  className="flex p-6 md:py-0 lg:py-6 gap-4 items-center rounded-xl"
                >
                  <div className="p-2 flex justify-center items-center">
                    {icon}
                  </div>
                  <p className="text-gray-500 text-sm md:text-base">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
