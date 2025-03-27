'use client';

import Image from 'next/image';
import {
  BedDouble,
  Bus,
  CalendarDays,
  Clock10,
  HandCoins,
  PlaneTakeoff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { Select } from '@/components/select';
import { useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { useCart } from '@/context/CartContext';
import { Trip } from '@/types/trip';

export const OfferDetails = ({ trip }: { trip: Trip }) => {
  const {
    id,
    title,
    price,
    duration,
    desktopImage,
    startDate,
    endDate,
    transfer,
    flight,
    accomodation,
    longDescription,
    secondaryDescription
  } = trip;
  const [selectedQuantity, setSelectedQuantity] = useState<string>('');
  const [selectedRooms, setSelectedRooms] = useState<string>('');
  const { addToCart } = useCart();

  const details = [
    {
      title: 'Nocleg',
      icon: <BedDouble size={28} className="text-gray-500" />,
      details: accomodation
    },
    {
      title: 'Przelot',
      icon: <PlaneTakeoff size={28} className="text-gray-500" />,
      details: flight
    },
    {
      title: 'Transfer',
      icon: <Bus size={28} className="text-gray-500" />,
      details: transfer
    }
  ];

  const { handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async () => {
    addToCart({
      id,
      name: title,
      quantity: selectedQuantity,
      rooms: selectedRooms
    });

    toast('Super!', {
      description: 'Twoja oferta została dodana do koszyka.'
    });

    reset();
  };

  const inputs = [
    {
      label: 'Ilość osób',
      name: 'quantity',
      options: [
        { label: '1-2 osoby (249.99 zł)', value: '249.99' },
        { label: '3-6 osoby (299.99 zł)', value: '299.99' },
        { label: '7-10 osoby (499.99 zł)', value: '499.99' }
      ],
      placeholder: 'Wybierz ilość osób',
      selected: selectedQuantity,
      setSelected: setSelectedQuantity
    },
    {
      label: 'Ilość pokoi',
      name: 'rooms',
      options: [
        { label: '1 pokój', value: '1' },
        { label: '2 pokoje', value: '2' },
        { label: '3 pokoje', value: '3' },
        { label: '4 pokoje', value: '4' },
        { label: '5 pokoi', value: '5' },
        { label: '6 pokoi', value: '6' }
      ],
      placeholder: 'Wybierz ilość pokoi',
      selected: selectedRooms,
      setSelected: setSelectedRooms
    }
  ];

  const about = [
    {
      name: 'Termin wyjazdu',
      icon: <CalendarDays size={28} className="text-gray-500" />,
      value: `${startDate} - ${endDate}`
    },
    {
      name: 'Długość pobytu',
      icon: <Clock10 size={28} className="text-gray-500" />,
      value: duration
    },
    {
      name: 'Cena',
      icon: <HandCoins size={28} className="text-gray-500" />,
      value: `${price} zł`
    }
  ];

  const sales = ['249.99'];

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-w-[280px]"
    >
      {inputs.map(
        ({ label, name, options, placeholder, selected, setSelected }) => (
          <div key={name} className="flex flex-col gap-1">
            <Label htmlFor={name} className="text-gray-400 text-base">
              {label}
            </Label>
            <Select
              id={name}
              options={options}
              selected={selected}
              setSelected={setSelected}
              placeholder={placeholder}
            />
          </div>
        )
      )}
      {selectedQuantity !== '' && (
        <div className="flex gap-2 flex-col">
          <p>Cena pakietu podróży:</p>
          <div className="flex flex-col">
            {sales.includes(selectedQuantity) ? (
              <>
                <div className="line-through">{selectedQuantity} zł</div>
                <div className="font-bold text-xl">199.99 zł</div>
              </>
            ) : (
              <div className="font-bold text-xl">{selectedQuantity} zł</div>
            )}
          </div>
        </div>
      )}
      <Button disabled={selectedQuantity === '' || selectedRooms === ''}>
        Zamów teraz
      </Button>
    </form>
  );
  return (
    <>
      <Image
        src={desktopImage}
        alt={title}
        width={1080}
        height={720}
        className="rounded-md max-h-[500px]"
      />
      <div className="flex gap-8">
        <div className="flex flex-col w-full md:w-3/5 lg:w-7/10 gap-10">
          <div className="flex flex-col gap-8">
            <p className="text-gray-500">
              Data publikacji oferty: <span>02/02/2025</span>
            </p>
            <div className="flex flex-col gap-6">
              {about.map(({ name, icon, value }) => (
                <div key={name} className="flex gap-4 items-center">
                  <div>{icon}</div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-gray-500">{name}</p>
                    <p className="text-xl">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="block md:hidden">{form}</div>
            <Separator
              orientation="horizontal"
              className="h-[1px] bg-gray-300"
            />
            <h1 className="text-2xl">{title}</h1>
            <p className="text-gray-500">{longDescription}</p>
            <Separator
              orientation="horizontal"
              className="h-[1px] bg-gray-300"
            />
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-xl">Szczegóły oferty</h2>
            <div className="flex flex-col gap-8">
              {details?.map(
                ({ title, details, icon }) =>
                  details?.length > 0 && (
                    <div key={title} className="flex flex-col gap-4">
                      <div className="flex gap-2 items-center">
                        {icon}
                        <h3 className="text-xl">{title}</h3>
                      </div>
                      <ul className="flex flex-col gap-4">
                        {details?.map((detail) => (
                          <li key={detail} className="text-gray-500">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
              {secondaryDescription && (
                <p className="text-gray-500">{secondaryDescription}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/5 lg:w-3/10 hidden md:block">
          <div className=" w-full p-4">{form}</div>
        </div>
      </div>
    </>
  );
};
