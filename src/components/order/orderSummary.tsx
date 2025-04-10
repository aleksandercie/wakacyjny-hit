'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';
import { quantityOptions } from '@/lib/quantityOptions';
import { renderPrice } from '../offerDetails';
import Link from 'next/link';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export const calculateTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((sum, item) => {
    const priceOption = quantityOptions.find((q) => q.value === item.price);
    const salePrice = parseFloat(priceOption?.salePrice || item.price);

    return sum + (isNaN(salePrice) ? 0 : salePrice);
  }, 0);
};

export const hasValidationError = (cart: CartItem[]): boolean => {
  return cart.some((item) => {
    const totalAdults = item.roomsDetails.reduce(
      (sum, room) => sum + parseInt(room.adults ?? '0'),
      0
    );
    const totalChildren = item.roomsDetails.reduce(
      (sum, room) => sum + (room.children?.length || 0),
      0
    );
    const totalPeople = totalAdults + totalChildren;
    const min = item.minPersons ?? 1;
    const max = item.maxPersons ?? Infinity;
    const emptyRooms = item.roomsDetails
      .map(
        (room) => parseInt(room.adults ?? '0') + (room.children?.length || 0)
      )
      .filter((total) => total < 1);

    const missingBirthDates = item.roomsDetails.some((room) =>
      (room.children || []).some((child) => !child.dateOfBirth)
    );

    return (
      totalPeople < min ||
      totalPeople > max ||
      emptyRooms.length > 0 ||
      missingBirthDates
    );
  });
};

export type OrderSummaryVariant = 'cart' | 'navigation';

export const OrderSummary = ({
  cart,
  isSubmitting,
  removeAllItemsCart,
  variant,
  clientSecret
}: {
  cart: CartItem[];
  isSubmitting: boolean;
  removeAllItemsCart: () => void;
  variant: OrderSummaryVariant;
  clientSecret?: string;
}) => {
  const isCartVariant = variant === 'cart';
  const isInvalid = hasValidationError(cart);
  const [isPaymentReady, setIsPaymentReady] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-md md:mx-8 lg:mx-0 mt-4 lg:mt-0 lg:max-h-fit bg-white ${
        isCartVariant ? 'p-4 ' : 'w-[320px] p-4 pr-1 border shadow-lg'
      }`}
    >
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isCartVariant ? 'mb-8' : 'mb-4'
        }`}
      >
        {isCartVariant ? (
          <h4 className="text-2xl font-bold">Podsumowanie zamówienia</h4>
        ) : (
          <h4 className="text-xl">Mój koszyk</h4>
        )}

        {isCartVariant && cart.length > 0 && (
          <Button
            size="sm"
            onClick={removeAllItemsCart}
            className="w-full max-w-[200px] sm:max-w-[80px]"
          >
            <span className="text-wrap block p-2">Wyczyść</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <div
          className={`flex flex-col gap-4 ${
            isCartVariant
              ? ''
              : 'overflow-y-auto max-h-[174px] [scrollbar-width:thin] pr-4'
          }`}
        >
          {cart.map((item) => (
            <OrderItemSummary key={item.id} item={item} variant={variant} />
          ))}
        </div>
        <div
          className={`flex justify-between font-semibold ${
            isCartVariant ? 'text-xl mt-2' : 'text-l'
          }`}
        >
          <span className={`${isCartVariant ? 'text-xl' : 'text-l'}`}>
            Razem
          </span>
          <span
            className={`font-bold ${isCartVariant ? 'text-xl' : 'text-l pr-3'}`}
          >
            {calculateTotalPrice(cart)} zł
          </span>
        </div>
      </div>
      {isCartVariant ? (
        <>
          {clientSecret && (
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Płatność</h2>
              <PaymentElement
                onChange={(event) => {
                  console.log('Payment Element event:', event);
                  setIsPaymentReady(event.complete); // Stripe tells us if payment input is complete
                }}
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || isInvalid || !isPaymentReady}
            className="mt-4"
          >
            {isSubmitting ? 'Wysyłanie...' : 'Złóż zamówienie'}
          </Button>
        </>
      ) : (
        <Button className="mt-4 mr-3">
          <Link href="/koszyk" className="relative">
            Koszyk
          </Link>
        </Button>
      )}
    </div>
  );
};

export const OrderItemSummary = ({
  item,
  variant
}: {
  item: CartItem;
  variant: OrderSummaryVariant;
}) => {
  const isCartVariant = variant === 'cart';
  return (
    <div
      className={`flex flex-col border-b border-gray-300  ${
        isCartVariant ? 'pb-6 pt-2' : 'pb-4'
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <span className={`${isCartVariant ? 'text-base' : 'text-s'}`}>
          {item.name}
        </span>
        <div className="flex flex-col justify-end w-full sm:w-[124px] items-end">
          {renderPrice(item.price, variant)}
        </div>
      </div>

      {isCartVariant && item.roomsDetails?.length > 0 && (
        <div className="mt-2 text-s text-gray-600">
          <p>Liczba pokoi: {item.roomsDetails.length}</p>
          {item.roomsDetails.map((room, index) => (
            <RoomBreakdown
              key={`summary-room-${index}`}
              room={room}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const RoomBreakdown = ({
  room,
  index
}: {
  room: CartItem['roomsDetails'][number];
  index: number;
}) => {
  const totalChildren = room.children?.length || 0;
  const totalAdults = room.adults || '0';

  return (
    <div className="ml-2">
      <p>Pokój {index + 1}:</p>
      {totalAdults !== '0' && <p>- Dorośli: {totalAdults}</p>}
      {totalChildren > 0 && <p>- Dzieci: {totalChildren}</p>}
    </div>
  );
};
