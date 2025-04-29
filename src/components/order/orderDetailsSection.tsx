'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartItem } from '@/context/CartContext';
import { quantityOptions } from '@/lib/quantityOptions';
import { roomsOptions } from '@/lib/roomsOptions';
import { useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { DateOfBirthPicker } from '../dateOfBirthPicker';

type TouchedRoomsMap = {
  [itemId: string]: Set<number>;
};

export const OrderDetailsSection = ({
  cart,
  updateCartItem,
  removeItemCart
}: {
  cart: CartItem[];
  updateCartItem: (item: CartItem) => void;
  removeItemCart: (id: string) => void;
}) => {
  const [touchedRooms, setTouchedRooms] = useState<TouchedRoomsMap>({});

  const handleRoomTouch = (itemId: string, roomIndex: number) => {
    setTouchedRooms((prev) => ({
      ...prev,
      [itemId]: new Set([...(prev[itemId] ?? []), roomIndex])
    }));
  };

  const allRoomsTouched = (item: CartItem) =>
    touchedRooms[item.id]?.size === item.roomsDetails.length;

  return (
    <div className="flex flex-col gap-4 p-4 rounded-md bg-white">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold pt-4 lg:pt-0 max-w-[390px]">
          Informacje dotyczące zamówienia{' '}
        </h3>
        <p className="text-xs text-muted-foreground max-w-prose">
          Uzupełnij dane dotyczące uczestników i pokoi. Pamiętaj, że każdy pokój
          musi mieć co najmniej jedną osobę, a jeśli wybierzesz dzieci, musisz
          podać ich daty urodzenia. Minimalna i maksymalna liczba osób zależy od
          wybranej oferty.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 pt-4">
            <div className="flex justify-between items-center gap-4">
              <p className="text-xl block font-bold">{item.name}</p>
              <Button variant="link" onClick={() => removeItemCart(item.id)}>
                <X />
                usuń
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`quantity-${item.id}`}>Ilość osób</Label>
              <Select
                value={item.price}
                onValueChange={(value) => {
                  const selectedQuantity = quantityOptions.find(
                    (option) => option.value === value
                  );

                  updateCartItem({
                    ...item,
                    price: value as string,
                    rooms: '',
                    roomsDetails: [],
                    maxPersons: selectedQuantity?.maxPersons,
                    minPersons: selectedQuantity?.minPersons
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz ilość osób" />
                </SelectTrigger>
                <SelectContent>
                  {quantityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <Label htmlFor={`rooms-${item.id}`}>Ilość pokoi</Label>
              <Select
                value={item.rooms}
                onValueChange={(value) =>
                  updateCartItem({
                    ...item,
                    rooms: value as string,
                    roomsDetails: Array.from(
                      { length: parseInt(value as string) },
                      () => ({ adults: undefined, children: undefined })
                    )
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz ilość pokoi" />
                </SelectTrigger>
                <SelectContent>
                  {roomsOptions
                    .filter((option) => {
                      const roomValue = Number(option.value);
                      return item.maxPersons
                        ? roomValue <= item.maxPersons
                        : true;
                    })
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-12 w-full">
              {item.roomsDetails.map((_, roomIndex) => (
                <div
                  key={`room-${item.id}-${roomIndex}`}
                  className="w-full pb-4"
                >
                  <h4 className="font-medium mb-2">Pokój {roomIndex + 1}</h4>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor={`adults-${item.id}-${roomIndex}`}>
                        Liczba dorosłych
                      </Label>
                      <Input
                        id={`adults-${item.id}-${roomIndex}`}
                        type="number"
                        min={0}
                        max={item.maxPersons}
                        value={item.roomsDetails[roomIndex].adults ?? ''}
                        placeholder="Wybierz ilość dorosłych"
                        onBlur={() => handleRoomTouch(item.id, roomIndex)}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === '+') {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => e.preventDefault()}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            item.maxPersons &&
                            Number(value) > item.maxPersons
                          ) {
                            return;
                          }

                          updateCartItem({
                            ...item,
                            roomsDetails: item.roomsDetails.map((room, i) =>
                              i === roomIndex
                                ? { ...room, adults: value }
                                : room
                            )
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`children-${item.id}-${roomIndex}`}>
                        Liczba dzieci
                      </Label>
                      <Input
                        id={`children-${item.id}-${roomIndex}`}
                        type="number"
                        min={0}
                        max={item.maxPersons}
                        value={
                          item.roomsDetails[
                            roomIndex
                          ].children?.length.toString() ?? ''
                        }
                        placeholder="Wybierz ilość dzieci"
                        onBlur={() => handleRoomTouch(item.id, roomIndex)}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === '+') {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => e.preventDefault()}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            item.maxPersons &&
                            Number(value) > item.maxPersons
                          ) {
                            return;
                          }
                          updateCartItem({
                            ...item,
                            roomsDetails: item.roomsDetails.map((room, i) =>
                              i === roomIndex
                                ? {
                                    ...room,
                                    children: Array.from(
                                      {
                                        length: parseInt(e.target.value) || 0
                                      },
                                      () => ({ dateOfBirth: '' })
                                    )
                                  }
                                : room
                            )
                          });
                        }}
                      />
                      {item?.roomsDetails?.[roomIndex]?.children?.length ??
                      0 > 0 ? (
                        <div className="gap-8 mt-4">
                          <Label
                            htmlFor={`children-dob-${item.id}-${roomIndex}`}
                          >
                            Podaj datę urodzin dzieci
                          </Label>
                          <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-x-2 gap-y-4 mt-4">
                            {item.roomsDetails[roomIndex].children?.map(
                              (child, childIndex) => (
                                <DateOfBirthPicker
                                  key={`${child.dateOfBirth}-${childIndex}`}
                                  value={
                                    child.dateOfBirth
                                      ? new Date(child.dateOfBirth)
                                      : undefined
                                  }
                                  onChange={(newDate) => {
                                    updateCartItem({
                                      ...item,
                                      roomsDetails: item.roomsDetails.map(
                                        (room, i) =>
                                          i === roomIndex
                                            ? {
                                                ...room,
                                                children: room.children?.map(
                                                  (c, j) =>
                                                    j === childIndex
                                                      ? {
                                                          ...c,
                                                          dateOfBirth:
                                                            newDate.toISOString()
                                                        }
                                                      : c
                                                )
                                              }
                                            : room
                                      )
                                    });
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {allRoomsTouched(item) && (
              <div className="w-full">
                {(() => {
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
                    .map((room, i) => ({
                      index: i + 1,
                      count:
                        parseInt(room.adults ?? '0') +
                        (room.children?.length || 0)
                    }))
                    .filter((room) => room.count < 1);

                  const missingBirthDates = item.roomsDetails
                    .map((room, i) => ({
                      index: i + 1,
                      missing: (room.children || []).some(
                        (child) => !child.dateOfBirth
                      )
                    }))
                    .filter((room) => room.missing);

                  return (
                    <div
                      key={`validation-${item.id}`}
                      className="text-sm w-full"
                    >
                      <p className="opacity-0 h-[16px] text-xs w-full" />
                      {totalPeople < min && (
                        <p className="text-red-600">
                          Minimalna liczba uczestników dla tej oferty to {min}.
                          Aktualnie przypisano {totalPeople}.
                        </p>
                      )}
                      {totalPeople > max && (
                        <p className="text-red-600">
                          Maksymalna liczba uczestników dla tej oferty to {max}.
                          Aktualnie przypisano {totalPeople}.
                        </p>
                      )}
                      {emptyRooms.length > 0 && (
                        <p className="text-red-600">
                          Każdy pokój musi mieć przynajmniej jedną osobę.
                          Sprawdź pokój
                          {emptyRooms.length > 1 ? 'e' : ''}:{' '}
                          {emptyRooms.map((r) => r.index).join(', ')}.
                        </p>
                      )}
                      {missingBirthDates.length > 0 && (
                        <p className="text-red-600">
                          Uzupełnij daty urodzenia dzieci w pokoj
                          {missingBirthDates.length > 1 ? 'ach' : 'u'}:{' '}
                          {missingBirthDates.map((r) => r.index).join(', ')}.
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
