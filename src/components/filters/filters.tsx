'use client';

import { DatePickerWithRange } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

const PriceInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max
}: {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className="opacity-40 text-xs text-center w-full block"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          type="text"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className="w-24 pl-8 rounded-full"
          id={id}
        />
        <span className="text-sm absolute top-2 left-4">zł</span>
      </div>
    </div>
  );
};

export const Filters = ({
  priceRange,
  setPriceRange
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}) => {
  const handlePriceChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9.]/g, '');
      const price = Math.max(0, Math.min(10000, Number(value)));
      setPriceRange(
        index === 0 ? [price, priceRange[1]] : [priceRange[0], price]
      );
    };

  useEffect(() => {
    if (priceRange[0] > priceRange[1]) {
      setPriceRange([priceRange[0], priceRange[0] + 100]);
    }
  }, [priceRange, setPriceRange]);

  return (
    <div className="md:max-w-[720px] w-full flex flex-col md:flex-row md:p-2 md:border rounded-md md:rounded-full gap-2 md:gap-4 justify-between items-center">
      <div className="pl-2 md:pl-0 flex items-center w-[260px]">
        <MapPin />
        <Input placeholder="Wyszukaj hit" variant="unstyled" />
      </div>
      <DatePickerWithRange className="border-0 px-0 md:px-4 max-w-[260px]" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="rounded-full">
            <SlidersHorizontal />
            Filtry
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Filtry</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <span className="text-base font-semibold">Przedział cenowy:</span>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={10000}
            step={100}
            className="w-full"
          />
          <div className="flex items-center gap-2 justify-between">
            <PriceInput
              id="min-price"
              label="Minimalnie"
              value={priceRange[0]}
              onChange={handlePriceChange(0)}
              min={0}
              max={priceRange[1]}
            />
            <PriceInput
              id="max-price"
              label="Maksymalnie"
              value={priceRange[1]}
              onChange={handlePriceChange(1)}
              min={priceRange[0]}
              max={10000}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Wyczyść</AlertDialogCancel>
            <AlertDialogAction>Zapisz</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        variant="secondary"
        className="rounded-full max-w-[260px] md:max-w-none w-full md:w-auto"
      >
        Szukaj
      </Button>
    </div>
  );
};
