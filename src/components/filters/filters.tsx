'use client';

import { DatePickerWithRange } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
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
import { Separator } from '../ui/separator';
import { DateRange } from 'react-day-picker';
import { AdditionalFilters } from './additionalFilters';
import { airportOptions } from '@/lib/airports';
import { eatingOptions } from '@/lib/eatings';

export const Filters = ({
  priceRange,
  setPriceRange,
  date,
  setDate,
  selectedAirports,
  setSelectedAirports,
  selectedEatingOptions,
  setSelectedEatingOptions
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  selectedAirports: string[];
  setSelectedAirports: Dispatch<SetStateAction<string[]>>;
  selectedEatingOptions: string[];
  setSelectedEatingOptions: Dispatch<SetStateAction<string[]>>;
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

  const additionalFilters = (
    <AdditionalFilters
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      handlePriceChange={handlePriceChange}
      selectedAirports={selectedAirports}
      setSelectedAirports={setSelectedAirports}
      selectedEatingOptions={selectedEatingOptions}
      setSelectedEatingOptions={setSelectedEatingOptions}
      airportOptions={airportOptions}
      eatingOptions={eatingOptions}
    />
  );

  return (
    <div className="md:max-w-[720px] w-full flex flex-col md:flex-row md:p-2 md:border rounded-md md:rounded-full gap-8 md:gap-0 justify-between md:items-center">
      <div className=" flex items-center w-full md:w-[260px] relative">
        <Search className="absolute md:relative" />
        <Input
          placeholder="Wyszukaj hit"
          variant="unstyled"
          className="hidden md:block"
        />
        <Input placeholder="Wyszukaj hit" className="block md:hidden pl-8" />
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <DatePickerWithRange
        className="border-0 px-0 max-w-[260px] md:max-w-[240px]"
        date={date}
        setDate={setDate}
      />
      <Separator orientation="vertical" className="mr-3 hidden md:block" />
      <div className="hidden md:block">
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
            {additionalFilters}
            <AlertDialogFooter>
              <AlertDialogCancel>Wyczyść</AlertDialogCancel>
              <AlertDialogAction>Zapisz</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col md:hidden gap-4 w-full">
        {additionalFilters}
      </div>
      <Separator orientation="vertical" className="mx-3 hidden md:block" />
      <Button
        variant="secondary"
        className="rounded-full mx-auto max-w-[260px] md:max-w-none w-full md:w-auto"
      >
        Szukaj
      </Button>
    </div>
  );
};
