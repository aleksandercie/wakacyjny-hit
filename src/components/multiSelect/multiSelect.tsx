'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Checkbox } from '../ui/checkbox';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Check } from 'lucide-react';

export const MultiSelect = ({
  options,
  selected,
  setSelected,
  placeholder,
}: {
  options: { label: string; value: string }[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  placeholder: string;
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex flex-wrap h-auto justify-start cursor-pointer"
        >
          <div className="w-full break-words flex flex-wrap text-wrap">
            {selected.length > 0
              ? options
                  .filter((opt) => selected.includes(opt.value))
                  .map((opt) => opt.label)
                  .join(', ')
              : placeholder}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        avoidCollisions={false}
        className="p-2 bg-background"
        style={{
          minWidth: 'var(--radix-popover-trigger-width)',
          zIndex: '135',
        }}
      >
        <Input
          id="search"
          type="text"
          placeholder="Szukaj..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-1 border rounded w-full mb-2 focus-visible:border-2 focus-visible:border-primary hidden md:block"
        />
        <ScrollArea className="h-[160px] w-full rounded-md border">
          <div className="p-2">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`flex items-center gap-2 w-full hover:text-primary ${
                  selected.includes(option.value)
                    ? 'font-semibold text-primary'
                    : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelected((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((val) => val !== option.value)
                      : [...prev, option.value],
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelected((prev) =>
                      prev.includes(option.value)
                        ? prev.filter((val) => val !== option.value)
                        : [...prev, option.value],
                    );
                  }
                }}
              >
                <Checkbox
                  id={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => {
                    setSelected((prev) =>
                      prev.includes(option.value)
                        ? prev.filter((val) => val !== option.value)
                        : [...prev, option.value],
                    );
                  }}
                  className="hidden"
                />
                <Label
                  htmlFor={option.value}
                  className={`flex justify-between w-full py-2 cursor-pointer min-h-[32px] ${
                    selected.includes(option.value)
                      ? 'font-semibold text-primary'
                      : ''
                  }`}
                >
                  <span className="inline-block">{option.label}</span>
                  <Check
                    size={16}
                    className={`text-primary ${
                      selected.includes(option.value) ? 'block' : 'hidden'
                    }`}
                  />
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
