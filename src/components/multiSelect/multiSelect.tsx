import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Checkbox } from '../ui/checkbox';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const MultiSelect = ({
  options,
  selected,
  setSelected,
  placeholder
}: {
  options: {
    label: string;
    value: string;
  }[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  placeholder: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex flex-wrap h-auto justify-start"
        >
          {selected.length > 0
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => <span key={opt.label}>{opt.label}</span>)
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 bg-white min-w-[var(--radix-popover-trigger-width)]">
        <div className="flex flex-col gap-2 w-full">
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={option.value}
                checked={selected.includes(option.value)}
                onCheckedChange={() => {
                  setSelected((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((val) => val !== option.value)
                      : [...prev, option.value]
                  );
                }}
                className="hidden"
              />
              <Label
                htmlFor={option.value}
                className={`block w-full py-2 ${
                  selected.includes(option.value)
                    ? 'font-semibold text-primary'
                    : ''
                }`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
