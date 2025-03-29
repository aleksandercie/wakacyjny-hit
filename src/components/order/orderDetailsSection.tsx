'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '../select';
import { CartItem } from '@/context/CartContext';
import { quantityOptions } from '@/lib/quantityOptions';
import { roomsOptions } from '@/lib/roomsOptions';
import { useState } from 'react';

export const OrderDetailsSection = ({
  cart,
  updateCartItem
}: {
  cart: CartItem[];
  updateCartItem: (item: CartItem) => void;
}) => {
  const [touchedItems, setTouchedItems] = useState<{ [id: string]: boolean }>(
    {}
  );

  const handleTouch = (itemId: string) => {
    setTouchedItems((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold">
        Dodatkowe informacje dotyczące zamówienia{' '}
      </h3>
      {cart.map((item) => (
        <div key={item.id} className="flex flex-col gap-4 border-t pt-4">
          <p>
            <span className="text-gray-500">Oferta:</span> {item.name}
          </p>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`quantity-${item.id}`}>Ilość osób</Label>
            <Select
              id={`quantity-${item.id}`}
              options={quantityOptions}
              selected={item.price}
              setSelected={(value) => {
                const maxPersons = quantityOptions.find(
                  (item) => item.value === value
                )?.maxPersons;
                updateCartItem({
                  ...item,
                  price: value as string,
                  maxPersons
                });
              }}
              placeholder="Wybierz ilość osób"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`rooms-${item.id}`}>Ilość pokoi</Label>
            <Select
              id={`rooms-${item.id}`}
              options={roomsOptions}
              selected={item.rooms}
              setSelected={(value) =>
                updateCartItem({
                  ...item,
                  rooms: value as string,
                  roomsDetails: Array.from(
                    { length: parseInt(value as string) },
                    () => ({ adults: undefined, children: undefined })
                  )
                })
              }
              placeholder="Wybierz ilość pokoi"
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            {item.roomsDetails.map((_, roomIndex) => (
              <div key={`room-${item.id}-${roomIndex}`} className="w-full">
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
                      onBlur={() => handleTouch(item.id)}
                      onChange={(e) =>
                        updateCartItem({
                          ...item,
                          roomsDetails: item.roomsDetails.map((room, i) =>
                            i === roomIndex
                              ? { ...room, adults: e.target.value }
                              : room
                          )
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
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
                      onBlur={() => handleTouch(item.id)}
                      onChange={(e) =>
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
                        })
                      }
                    />
                    {item?.roomsDetails?.[roomIndex]?.children?.length ??
                    0 > 0 ? (
                      <div className="flex flex-col gap-4 mt-4">
                        <Label htmlFor={`children-dob-${item.id}-${roomIndex}`}>
                          Podaj datę urodzin dzieci
                        </Label>
                        <div className="flex flex-col gap-4">
                          {item.roomsDetails[roomIndex].children?.map(
                            (child, childIndex) => (
                              <Input
                                key={`${child.dateOfBirth}-${childIndex}`}
                                type="date"
                                value={child.dateOfBirth}
                                onChange={(e) =>
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
                                                          e.target.value
                                                      }
                                                    : c
                                              )
                                            }
                                          : room
                                    )
                                  })
                                }
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
          {touchedItems[item.id] && (
            <div>
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
                  <div key={`validation-${item.id}`} className="mt-4 text-sm">
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
                        Każdy pokój musi mieć przynajmniej jedną osobę. Sprawdź
                        pokój
                        {emptyRooms.length > 1 ? 'e' : ''}:{' '}
                        {emptyRooms.map((r) => r.index).join(', ')}.
                      </p>
                    )}
                    {missingBirthDates.length > 0 && (
                      <p className="text-red-600">
                        Uzupełnij daty urodzenia dzieci w pokoju
                        {missingBirthDates.length > 1 ? 'ach' : ''}:{' '}
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
  );
};
