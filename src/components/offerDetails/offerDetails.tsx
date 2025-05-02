'use client';

import {
  BedDouble,
  Bus,
  CalendarDays,
  CircleCheck,
  Clock10,
  HandCoins,
  PlaneTakeoff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { useCart } from '@/context/CartContext';
import { Trip } from '@/types/trip';
import { quantityOptions } from '@/lib/quantityOptions';
import { roomsOptions } from '@/lib/roomsOptions';
import { OrderSummaryVariant } from '../order/orderSummary';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import { useRouter } from 'next/navigation';

export const renderPrice = (price: string, variant?: OrderSummaryVariant) => {
  const salePrice = quantityOptions.find(
    (item) => item.value === price
  )?.salePrice;
  const isNavigationVariant = variant === 'navigation';

  const className = isNavigationVariant ? 'text-right text-xs' : 'text-right';
  const fontSize = isNavigationVariant ? 'text-s' : 'text-xl';

  return salePrice !== price ? (
    <>
      <span className={`line-through ${variant ? className : ''}`}>
        {price} zł
      </span>
      <span className={`font-bold ${fontSize}`}>{salePrice} zł</span>
    </>
  ) : (
    <span className={`font-bold ${fontSize}`}>{price} zł</span>
  );
};

export const OfferDetails = ({ trip }: { trip: Trip }) => {
  const {
    id,
    title,
    price,
    duration,
    image,
    startDate,
    endDate,
    transfer,
    flight,
    accomodation,
    longDescription,
    secondaryDescription,
    created_at
  } = trip;
  const [selectedQuantity, setSelectedQuantity] = useState<string>('');
  const [selectedRooms, setSelectedRooms] = useState<string>('');
  const { addToCart, cart } = useCart();
  const router = useRouter();

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

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<FormData>();

  const handleAddToCart = (): string | null => {
    const option = quantityOptions.find(
      (item) => item.value === selectedQuantity
    );
    if (!option) return null;

    const newItem = {
      id: `${id}-${cart.length + 1}`,
      orderId: id,
      name: title,
      price: selectedQuantity,
      salePrice: option?.salePrice,
      rooms: selectedRooms,
      maxPersons: option?.maxPersons,
      minPersons: option?.minPersons,
      roomsDetails: Array.from({ length: Number(selectedRooms) }).map(() => ({
        adults: undefined,
        children: undefined
      })),
      orderComments: undefined
    };

    addToCart(newItem);

    toast.success('Super!', {
      description: 'Twoja oferta została dodana do koszyka.',
      icon: <CircleCheck className="text-green-500" size={16} />,
      dismissible: true,
      duration: 2000
    });

    return newItem.id;
  };

  const onSubmit = async () => {
    handleAddToCart();
    reset();
    setSelectedQuantity('');
    setSelectedRooms('');
  };

  const handleOrderNow = () => {
    const result = handleAddToCart();
    if (result) {
      setSelectedQuantity('');
      setSelectedRooms('');
      router.push('/koszyk');
    }
  };

  const inputs = [
    {
      label: 'Ilość osób',
      name: 'quantity',
      options: quantityOptions,
      placeholder: 'Wybierz ilość osób',
      selected: selectedQuantity,
      setSelected: (value: string) => {
        setSelectedQuantity(value);
        setSelectedRooms('');
      },
      disabled: false
    },
    {
      label: 'Ilość pokoi',
      name: 'rooms',
      options: roomsOptions.filter((room) => {
        const selectQuantity = quantityOptions.find(
          (quantity) => quantity.value === selectedQuantity
        );
        const roomValue = Number(room.value);

        return selectQuantity ? roomValue <= selectQuantity.maxPersons : true;
      }),
      placeholder: 'Wybierz ilość pokoi',
      selected: selectedRooms,
      setSelected: setSelectedRooms,
      disabled: selectedQuantity === ''
    }
  ];

  const about = [
    {
      name: 'Termin wyjazdu',
      icon: <CalendarDays size={28} className="text-gray-500" />,
      value: `${formatDate(startDate)} - ${formatDate(endDate)}`
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

  const isDisabledButton =
    selectedQuantity === '' ||
    selectedRooms === '' ||
    cart.length === 5 ||
    isSubmitting;

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-w-[280px]"
    >
      {inputs.map(
        ({
          label,
          name,
          options,
          placeholder,
          selected,
          setSelected,
          disabled
        }) => (
          <div key={name} className="flex flex-col gap-1">
            <Label htmlFor={name} className="text-gray-500 text-base">
              {label}
            </Label>
            <div className="w-[260px] md:w-full">
              <Select
                onValueChange={(value) => setSelected(value)}
                value={selected}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      )}
      {selectedQuantity !== '' && (
        <div className="flex gap-2 flex-col">
          <p>Cena pakietu podróży:</p>
          <div className="flex flex-col">{renderPrice(selectedQuantity)}</div>
        </div>
      )}
      {cart.length === 5 && (
        <p className="text-red-600">
          W koszyku znajduje się maksymalna ilość ofert.
        </p>
      )}
      <Button disabled={isDisabledButton} variant="secondary">
        Dodaj do koszyka
      </Button>
      <Button
        disabled={isDisabledButton}
        type="button"
        onClick={handleOrderNow}
      >
        Zamów teraz
      </Button>
    </form>
  );

  return (
    <>
      <Image
        src={image}
        alt={title}
        width={984}
        height={500}
        className="rounded-md max-h-[500px]"
      />
      <div className="flex gap-8">
        <div className="flex flex-col w-full md:w-3/5 lg:w-7/10 gap-10">
          <div className="flex flex-col gap-8">
            <p className="text-gray-500">
              Data publikacji oferty: <span>{formatDate(created_at)}</span>
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
