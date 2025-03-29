'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';

export const calculateTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + (isNaN(price) ? 0 : price);
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
  isSubmitting
}: {
  cart: CartItem[];
  isSubmitting: boolean;
}) => {
  const isInvalid = hasValidationError(cart);

  return (
    <div className="flex flex-col">
      <h4>Podsumowanie zamówienia</h4>
      <div className="flex flex-col gap-2 text-sm">
        {cart.map((item) => (
          <OrderItemSummary key={item.id} item={item} />
        ))}
        <div className="flex justify-between font-semibold mt-2">
          <span>Razem</span>
          <span>{calculateTotalPrice(cart)} zł</span>
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
    <div className="flex flex-col border-b py-2">
      <div className="flex justify-between">
        <span>{item.name}</span>
        <span>{item.price} zł</span>
      </div>

      {item.roomsDetails?.length > 0 && (
        <div className="mt-2 text-xs text-gray-600">
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
