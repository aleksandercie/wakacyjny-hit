import { MultiSelect } from '@/components/multiSelect';
import { Dispatch, SetStateAction, useState } from 'react';
import { Slider } from '../ui/slider';
import { PriceInput } from './priceInput';

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;
export const defaultPriceRange = [MIN_PRICE, MAX_PRICE];

export const AdditionalFilters = ({
  priceRange,
  setPriceRange,
  selectedAirports,
  setSelectedAirports,
  selectedfoodOptions,
  setSelectedfoodOptions,
  airportOptions,
  foodOptions,
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  selectedAirports: string[];
  setSelectedAirports: Dispatch<SetStateAction<string[]>>;
  selectedfoodOptions: string[];
  setSelectedfoodOptions: Dispatch<SetStateAction<string[]>>;
  airportOptions: { label: string; value: string }[];
  foodOptions: { label: string; value: string }[];
}) => {
  const [newPriceRange, setNewPriceRange] = useState(priceRange);

  const setMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setNewPriceRange((prev) => [prev[0], Math.min(Number(value), MAX_PRICE)]);
  };
  const setMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setNewPriceRange((prev) => [Math.max(Number(value), MIN_PRICE), prev[1]]);
  };

  const handleMaxBlur = () => {
    if (newPriceRange[1] <= priceRange[0]) {
      setNewPriceRange([priceRange[0], priceRange[1]]);
      setPriceRange([priceRange[0], priceRange[1]]);
    } else {
      setPriceRange(newPriceRange);
    }
  };

  const handleMinBlur = () => {
    if (newPriceRange[0] >= priceRange[1]) {
      setNewPriceRange([priceRange[0], priceRange[1]]);
      setPriceRange([priceRange[0], priceRange[1]]);
    } else {
      setPriceRange(newPriceRange);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setNewPriceRange(value);
  };

  return (
    <>
      <span className="text-base font-semibold">Przedział cenowy</span>
      <div className="flex w-full px-2 md:px-0">
        <Slider
          value={priceRange}
          onValueChange={handleSliderChange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-2 justify-between">
        <PriceInput
          id="min-price"
          label="Minimalnie"
          value={newPriceRange[0]}
          onChange={setMinPrice}
          onBlur={handleMinBlur}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
        <PriceInput
          id="max-price"
          label="Maksymalnie"
          value={newPriceRange[1]}
          onChange={setMaxPrice}
          onBlur={handleMaxBlur}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold">Miejsce wylotu</span>
        <MultiSelect
          options={airportOptions}
          selected={selectedAirports}
          setSelected={setSelectedAirports}
          placeholder="Wybierz lotnisko"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold">Wyżywienie</span>
        <MultiSelect
          options={foodOptions}
          selected={selectedfoodOptions}
          setSelected={setSelectedfoodOptions}
          placeholder="Wybierz rodzaj wyżywienia"
        />
      </div>
    </>
  );
};
