'use client';

import * as React from 'react';
import { subYears } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/formatDate';

export const DateOfBirthPicker = ({
  value,
  onChange
}: {
  value?: Date;
  onChange: (date: Date) => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [dateYearSelect, setDateYearSelect] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const today = new Date();
  const maxAllowedDate = subYears(today, 0);
  const minAllowedDate = subYears(today, 18);
  const years = Array.from({ length: 19 }, (_, i) => today.getFullYear() - i);

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) return;

    setDate(selected);
    onChange(selected);
    setDateYearSelect(selected);
  };

  return (
    <div className={cn('relative')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[222px] sm:w-[242px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="sm:mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>Wybierz datę urodzenia</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[260px] flex-col space-y-2 p-2 bg-white absolute top-full"
          side="bottom"
          align="start"
          sideOffset={8}
        >
          <Select
            onValueChange={(year) => {
              const selectedYear = parseInt(year);
              const baseDate = date ?? today;

              let newDate = new Date(
                selectedYear,
                baseDate.getMonth(),
                baseDate.getDate()
              );

              if (newDate.getMonth() !== baseDate.getMonth()) {
                newDate = new Date(selectedYear, baseDate.getMonth() + 1, 0);
              }

              const minAllowedDate = subYears(today, 18);

              if (newDate < minAllowedDate) {
                newDate = minAllowedDate;
              }

              setDateYearSelect(newDate);
            }}
            value={dateYearSelect?.getFullYear().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz rok urodzenia" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[240px]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              key={dateYearSelect?.toISOString()}
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              fromDate={minAllowedDate}
              toDate={maxAllowedDate}
              defaultMonth={dateYearSelect}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
