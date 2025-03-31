'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';
import { quantityOptions } from '@/lib/quantityOptions';
import { renderPrice } from '../offerDetails';

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

export const OrderSummary = ({
  cart,
  isSubmitting,
  removeAllItemsCart
}: {
  cart: CartItem[];
  isSubmitting: boolean;
  removeAllItemsCart: () => void;
}) => {
  const isInvalid = hasValidationError(cart);

  return (
    <div className="flex flex-col p-4 rounded-md border md:mx-12 lg:mx-0 mt-4 lg:mt-0 lg:max-h-fit">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h4 className="text-2xl font-bold">Podsumowanie zamówienia</h4>
        {cart.length > 0 && (
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
        {cart.map((item) => (
          <OrderItemSummary key={item.id} item={item} />
        ))}
        <div className="flex justify-between font-semibold mt-2">
          <span className="text-xl">Razem</span>
          <span className="text-xl font-bold">
            {calculateTotalPrice(cart)} zł
          </span>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || isInvalid}
        className="mt-4"
      >
        {isSubmitting ? 'Wysyłanie...' : 'Złóż zamówienie'}
      </Button>
    </div>
  );
};

export const OrderItemSummary = ({ item }: { item: CartItem }) => {
  return (
    <div className="flex flex-col border-b border-gray-300 pt-2 pb-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <span className="text-base">{item.name}</span>
        <div className="flex flex-col justify-end w-full sm:w-[124px] items-end">
          {renderPrice(item.price, 'text-right')}
        </div>
      </div>

      {item.roomsDetails?.length > 0 && (
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
