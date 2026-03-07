'use client';

import { subYears } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/formatDate';

export const DateOfBirthPicker = ({
  value,
  onChange,
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
  const minDate = subYears(today, 18);

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
              'w-[222px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="sm:mr h-4 w-4" />
            {date ? formatDate(date) : <span>Wybierz datę urodzenia</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[248px] flex-col space-y-2 p-0 bg-background absolute top-full"
          side="bottom"
          align="start"
          sideOffset={8}
        >
          <Calendar
            key={dateYearSelect?.toISOString()}
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            defaultMonth={dateYearSelect}
            captionLayout="dropdown"
            disabled={{ before: minDate, after: today }}
            startMonth={minDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
