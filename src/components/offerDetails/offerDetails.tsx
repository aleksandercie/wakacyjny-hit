'use client';

import {
  BedDouble,
  Bus,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Clock10,
  HandCoins,
  PlaneTakeoff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { useCart } from '@/context/CartContext';
import { Trip } from '@/types/trip';
import { QuantityOption } from '@/lib/quantityOptions';
import { roomsOptions } from '@/lib/roomsOptions';
import { OrderSummaryVariant } from '../order/orderSummary';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import { useRouter } from 'next/navigation';
import { quantityOptions } from '@/lib/quantityOptions';
import {
  formatViewersText,
  isViewingHours,
  nextNaturalViewers,
} from './helpers';

export const renderPrice = ({
  price,
  quantityOptions,
  variant,
}: {
  price: string;
  quantityOptions: QuantityOption[];
  variant?: OrderSummaryVariant;
}) => {
  const salePrice = quantityOptions.find(
    (item) => item.value === price,
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
    created_at,
    expired,
  } = trip;
  const [selectedQuantity, setSelectedQuantity] = useState<string>('');
  const [selectedRooms, setSelectedRooms] = useState<string>('');
  const [viewersCount, setViewersCount] = useState<number>(() => {
    // stable-ish starting point (still random)
    return 8 + Math.floor(Math.random() * 12); // 8..19
  });
  const isViewingTime = isViewingHours();

  useEffect(() => {
    if (!isViewingTime) return;
    // update every 8–15 seconds (more “alive”)
    const tick = () => {
      setViewersCount((prev) => nextNaturalViewers(prev));
    };

    const schedule = () => {
      const delay = 40000 + Math.floor(Math.random() * 20000); // 40–60s
      return window.setTimeout(() => {
        tick();
        timeoutId = schedule();
      }, delay);
    };

    let timeoutId = schedule();

    return () => window.clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids: [id],
      });
    }
  }, [id]);

  const { addToCart, cart } = useCart();
  const router = useRouter();

  const details = [
    {
      title: 'Nocleg',
      icon: <BedDouble size={28} className="text-muted" />,
      details: accomodation,
    },
    {
      title: 'Przelot',
      icon: <PlaneTakeoff size={28} className="text-muted" />,
      details: flight,
    },
    {
      title: 'Transfer',
      icon: <Bus size={28} className="text-muted" />,
      details: transfer,
    },
  ];

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const handleAddToCart = (): string | null => {
    const option = quantityOptions.find(
      (item) => item.value === selectedQuantity,
    );
    if (!option) return null;

    const newItem = {
      id: `${id}-${cart.length + 1}`,
      orderId: id,
      name: title,
      price: selectedQuantity,
      salePrice: option?.salePrice,
      rooms: selectedRooms,
      qunatityId: option?.id,
      maxPersons: option?.maxPersons,
      minPersons: option?.minPersons,
      roomsDetails: Array.from({ length: Number(selectedRooms) }).map(() => ({
        adults: undefined,
        children: undefined,
      })),
      orderComments: undefined,
    };

    addToCart(newItem);

    // ✅ Meta Pixel: AddToCart
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_type: 'product',
        content_ids: [String(id)], // offer id
      });
    }

    toast.success('Super!', {
      description: 'Twoja oferta została dodana do koszyka.',
      icon: <CircleCheck className="text-success" size={16} />,
      dismissible: true,
      duration: 2000,
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
      disabled: expired,
    },
    {
      label: 'Ilość pokoi',
      name: 'rooms',
      options: roomsOptions.filter((room) => {
        const selectQuantity = quantityOptions.find(
          (quantity) => quantity.value === selectedQuantity,
        );
        const roomValue = Number(room.value);

        return selectQuantity ? roomValue <= selectQuantity.maxPersons : true;
      }),
      placeholder: 'Wybierz ilość pokoi',
      selected: selectedRooms,
      setSelected: setSelectedRooms,
      disabled: selectedQuantity === '' || expired,
    },
  ];

  const about = [
    {
      name: 'Termin wyjazdu',
      icon: <CalendarDays size={28} className="text-muted" />,
      value: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    },
    {
      name: 'Długość pobytu',
      icon: <Clock10 size={28} className="text-muted" />,
      value: duration,
    },
    {
      name: 'Cena',
      icon: <HandCoins size={28} className="text-muted" />,
      value: `${price} zł`,
    },
  ];

  const isDisabledButton =
    selectedQuantity === '' ||
    selectedRooms === '' ||
    cart.length === 5 ||
    isSubmitting ||
    expired;

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-w-[280px]"
      id="form"
    >
      {inputs.map(
        ({
          label,
          name,
          options,
          placeholder,
          selected,
          setSelected,
          disabled,
        }) => (
          <div key={name} className="flex flex-col gap-1">
            <Label htmlFor={name} className="text-muted text-base">
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
        ),
      )}
      {selectedQuantity !== '' && (
        <div className="flex gap-2 flex-col">
          <p>Cena pakietu podróży:</p>
          <div className="flex flex-col">
            {renderPrice({
              price: selectedQuantity,
              quantityOptions,
            })}
          </div>
        </div>
      )}
      {cart.length === 5 && (
        <p className="text-destructive">
          W koszyku znajduje się maksymalna ilość ofert.
        </p>
      )}
      {isViewingTime && (
        <p className="text-muted text-sm">
          {formatViewersText(viewersCount)}
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

  const goToForm = () => {
    const formElement = document.getElementById('form');

    if (formElement) {
      const yOffset = -160;
      const y =
        formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Image
        src={image}
        alt={title}
        width={984}
        height={500}
        className={`rounded-md max-h-[500px] ${expired ? 'opacity-40' : ''}`}
      />
      <div className="flex items-center gap-1 justify-start w-full">
        <Button onClick={() => router.back()} variant="link" className="p-0">
          <span className="text-lg md:text-2xl font-medium">
            Wakacyjne hity
          </span>
        </Button>
        <div className="w-5 h-5">
          <ChevronRight size={20} className="text-muted w-5 h-5" />
        </div>
        <h1 className="text-lg md:text-2xl font-semibold"> {title}</h1>
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col w-full md:w-3/5 lg:w-7/10 gap-10">
          <div className="flex flex-col gap-8">
            {expired && (
              <p className="text-destructive">
                Oferta zakończona. Oferta nie jest już dostępna do rezerwacji.
              </p>
            )}
            <p className="text-muted">
              Data publikacji oferty: <span>{formatDate(created_at)}</span>
            </p>
            <div className="flex flex-col gap-6">
              {about.map(({ name, icon, value }) => (
                <div key={name} className="flex gap-4 items-center">
                  <div>{icon}</div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-muted">{name}</p>
                    <p className="text-xl">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className=" block md:hidden">{form}</div>
            <Separator
              orientation="horizontal"
              className="h-[1px] bg-separator"
            />

            <p className="text-muted">{longDescription}</p>
            <Separator
              orientation="horizontal"
              className="h-[1px] bg-separator"
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
                          <li key={detail} className="text-muted">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
              )}
              {secondaryDescription && (
                <p className="text-muted">{secondaryDescription}</p>
              )}
              <Separator
                orientation="horizontal"
                className="h-[1px] bg-separator"
              />
              <p className="text-muted">
                Jeśli ten Wakacyjny Hit brzmi jak coś dla Was, wybierzcie liczbę
                osób, wpiszcie preferowany hotel i opcję wyżywienia, podajcie
                dane kontaktowe i kliknijcie ZAMÓW TERAZ. Po opłaceniu dostępu
                otrzymacie mailowo najtańszą kombinację lotów i hoteli zgodną z
                ofertą, wraz z bezpośrednimi linkami do rezerwacji i prostą
                instrukcją krok po kroku. Całość zajmie Wam maksymalnie 15
                minut!
              </p>
              <p className="text-muted">
                Potrzebujecie większego bagażu? Dodacie go bezpośrednio podczas
                zakupu biletów. Jeśli transfer z lotniska to komunikacja miejska
                (tramwaj, metro, autobus), to oznacza to, że to najwygodniejsza
                i najtańsza opcja. Otrzymacie dokładne wskazówki, jak kupić
                bilet i gdzie wsiąść. Wszystkie ceny w ofertach wyliczamy dla
                dwóch osób. Oczywiście zawsze możecie skorzystać z taksówki lub
                alternatywnego środka transportu.
              </p>
              <p className="text-muted">
                Nie jesteśmy biurem podróży ani organizatorem wyjazdów –
                oferujemy dostęp do wiedzy o najlepszych okazjach, którą
                zdobyliśmy pracując przez lata w branży turystycznej. Wysyłamy
                bezpieczne linki z instrukcjami, pomagamy na każdym etapie
                rezerwacji i jesteśmy do dyspozycji przy planowaniu podróży.
              </p>
              <p className="text-muted">
                Pamiętajcie, że Wakacyjne Hity to czasowe okazje – aktualne w
                momencie publikacji. Jeśli po zakupie dostępu cena wzrośnie, nic
                nie tracicie – możecie wybrać inny Wakacyjny Hit lub otrzymać
                pełny zwrot środków.
              </p>
              <Button
                onClick={goToForm}
                className="block md:hidden mx-auto h-[38px]"
              >
                Zamów teraz
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/5 lg:w-3/10 hidden md:block relative">
          <div className="w-full sticky top-20 self-start max-h-[360px]">
            {form}
          </div>
        </div>
      </div>
    </>
  );
};
