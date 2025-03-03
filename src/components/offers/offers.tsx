import React from 'react';
import { Header } from '../header';
import { Card } from '../card';
import { Button } from '../ui/button';

export const Offers = () => {
  const offers = [
    {
      title: 'Bora Bora Polinezja Franzuska',
      price: 299.99,
      duration: '5 dni',
      date: '3 mar 2025 - 8 mar 2025',
      photo: '/bora-bora.jpg'
    },
    {
      title: 'Bora Bora Polinezja Franzuska',
      price: 299.99,
      duration: '5 dni',
      date: '3 mar 2025 - 8 mar 2025',
      photo: '/bora-bora.jpg'
    },
    {
      title: 'Bora Bora Polinezja Franzuska',
      price: 299.99,
      duration: '5 dni',
      date: '3 mar 2025 - 8 mar 2025',
      photo: '/bora-bora.jpg'
    }
  ];
  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <Header
        title="Pakiety podrózne"
        subtitle="Nasze kierunki"
        description="Najcudowniejsze miejsca na świecie to prawdziwe cuda natury, które
          zapierają dech w piersiach."
      />
      <div className="flex gap-4">
        {offers.map(({ title, price, duration, date, photo }, index) => (
          <Card
            key={index}
            title={title}
            price={price}
            duration={duration}
            date={date}
            photo={photo}
          />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Button>Zobacz więcej</Button>
      </div>
    </div>
  );
};
