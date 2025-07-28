'use client';

import { Badge, DatePickerWithRange } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Separator } from '../ui/separator';
import { DateRange } from 'react-day-picker';
import { AdditionalFilters } from './additionalFilters';
import { airportOptions } from '@/lib/airports';
import { foodOptions } from '@/lib/food';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';

export type Tab = 'all' | 'active' | 'completed';

export const Filters = ({
  priceRange,
  setPriceRange,
  date,
  setDate,
  selectedAirports,
  setSelectedAirports,
  selectedfoodOptions,
  setSelectedfoodOptions,
  defaultPriceRange,
  onSearch,
  search,
  setSearch,
  activeTab,
  setActiveTab
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  selectedAirports: string[];
  setSelectedAirports: Dispatch<SetStateAction<string[]>>;
  selectedfoodOptions: string[];
  setSelectedfoodOptions: Dispatch<SetStateAction<string[]>>;
  defaultPriceRange: number[];
  onSearch: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
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

  const activeFiltersCount =
    (priceRange[0] !== defaultPriceRange[0] ||
    priceRange[1] !== defaultPriceRange[1]
      ? 1
      : 0) +
    (selectedAirports.length > 0 ? 1 : 0) +
    (selectedfoodOptions.length > 0 ? 1 : 0) +
    (date?.from || date?.to ? 1 : 0);

  const additionalFilters = (
    <AdditionalFilters
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      handlePriceChange={handlePriceChange}
      selectedAirports={selectedAirports}
      setSelectedAirports={setSelectedAirports}
      selectedfoodOptions={selectedfoodOptions}
      setSelectedfoodOptions={setSelectedfoodOptions}
      airportOptions={airportOptions}
      foodOptions={foodOptions}
    />
  );

  const reset = () => {
    setPriceRange(defaultPriceRange);
    setDate({ from: undefined, to: undefined });
    setSelectedAirports([]);
    setSelectedfoodOptions([]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const tabs: { name: string; value: Tab }[] = [
    { name: 'Wszystkie', value: 'all' },
    { name: 'Aktywne', value: 'active' },
    { name: 'Zakończone', value: 'completed' }
  ];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8">
      <div className="md:max-w-[720px] w-full flex flex-col md:flex-row md:p-3 md:border-b gap-4 md:gap-0 justify-between md:items-center">
        <div className=" flex items-center w-full md:w-[260px] relative">
          <Search className="absolute md:relative" size={16} />
          <Input
            placeholder="Wyszukaj hit"
            variant="unstyled"
            className="hidden md:block"
            value={search}
            onChange={handleSearch}
          />
          <Input
            placeholder="Wyszukaj hit"
            className="block md:hidden pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-0">
          <Separator orientation="vertical" className="hidden md:block" />
          <DatePickerWithRange
            className="border-0 px-0 max-w-[260px] md:max-w-[240px]"
            date={date}
            setDate={setDate}
          />
          <Separator orientation="vertical" className="mr-3 hidden md:block" />
          <div className="hidden md:block">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full relative">
                  <SlidersHorizontal size={16} />
                  Filtry
                  {activeFiltersCount > 0 && (
                    <Badge quantity={activeFiltersCount} />
                  )}
                </Button>
              </DialogTrigger>
              <DialogPortal>
                <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-110 w-full h-screen" />
                <DialogContent className="fixed z-120 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle>Filtry</DialogTitle>
                  </DialogHeader>
                  {additionalFilters}
                  <DialogFooter className="flex gap-4">
                    <DialogClose asChild>
                      <Button
                        onClick={reset}
                        className="p-0 bg-transparent border-none shadow-none text-black hover:bg-transparent border-0 hover:text-primary focus:ring-0 focus:outline-none"
                      >
                        Wyczyść
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Zapisz</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
          <Accordion type="single" collapsible className="md:hidden">
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="text-base md:text-2xl w-full py-3">
                <span className="relative">
                  Dodatkowe filtry{' '}
                  {activeFiltersCount > 0 && (
                    <Badge
                      quantity={activeFiltersCount}
                      className="top-0 -right-5"
                    />
                  )}
                </span>{' '}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-sm md:text-base w-full">
                <div className="flex flex-col md:hidden gap-4 w-full">
                  {additionalFilters}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator orientation="vertical" className="mx-3 hidden md:block" />
        <div className="flex flex-col gap-2">
          <Button
            onClick={reset}
            className="p-0 bg-transparent border-none shadow-none text-black hover:bg-transparent border-0 hover:text-primary focus:ring-0 focus:outline-none block md:hidden"
          >
            Wyczyść wszystko
          </Button>
          <Button
            className="rounded-full mx-auto max-w-[260px] md:max-w-none w-full md:w-auto"
            onClick={onSearch}
          >
            Szukaj
          </Button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {tabs.map(({ name, value }) => (
          <Button
            key={value}
            onClick={() => setActiveTab(value)}
            variant={activeTab === value ? 'active' : 'tab'}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};
