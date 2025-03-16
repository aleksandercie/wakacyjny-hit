import { MultiSelect } from '@/components';
import { Dispatch, SetStateAction } from 'react';
import { Slider } from '../ui/slider';
import { PriceInput } from './priceInput';

export const AdditionalFilters = ({
  priceRange,
  setPriceRange,
  handlePriceChange,
  selectedAirports,
  setSelectedAirports,
  selectedEatingOptions,
  setSelectedEatingOptions,
  airportOptions,
  eatingOptions
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  handlePriceChange: (
    index: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAirports: string[];
  setSelectedAirports: Dispatch<SetStateAction<string[]>>;
  selectedEatingOptions: string[];
  setSelectedEatingOptions: Dispatch<SetStateAction<string[]>>;
  airportOptions: { label: string; value: string }[];
  eatingOptions: { label: string; value: string }[];
}) => {
  return (
    <>
      <span className="text-base font-semibold">Przedział cenowy</span>
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
        <span className="text-base font-semibold">
          Wybierz rodzaj wyżywienia
        </span>
        <MultiSelect
          options={eatingOptions}
          selected={selectedEatingOptions}
          setSelected={setSelectedEatingOptions}
          placeholder="Wyżywienie"
        />
      </div>
    </>
  );
};
