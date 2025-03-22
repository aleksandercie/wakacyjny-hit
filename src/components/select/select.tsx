import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface MultiSelectProps {
  id: string;
  options: { label: string; value: string }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

export const Select = ({
  id,
  options,
  selected,
  setSelected,
  placeholder
}: MultiSelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          className="w-full flex flex-wrap h-auto justify-start"
        >
          {Array.isArray(selected) && selected.length > 0
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => <span key={opt.label}>{opt.label}</span>)
            : typeof selected === 'string' && selected
            ? options.find((opt) => opt.value === selected)?.label
            : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-2 bg-white max-w-[var(--radix-popover-trigger-width)]">
        <div className="flex flex-col gap-2 w-full">
          <RadioGroup
            value={selected as string}
            onValueChange={setSelected as Dispatch<SetStateAction<string>>}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                <RadioGroupItem id={option.value} value={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};
