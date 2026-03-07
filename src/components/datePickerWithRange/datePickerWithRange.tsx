'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/lib/formatDate';
import { addYears } from 'date-fns';

export const DatePickerWithRange = ({
  className,
  date,
  setDate,
  numberOfMonths = 2,
}: {
  className: string | undefined;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  numberOfMonths?: number;
}) => {
  const today = new Date();
  const maxDate = addYears(today, 2);
  const handleClear = () => {
    setDate(undefined);
  };

  return (
    <div className={cn('grid gap-2 relative', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="link"
            className={cn(
              'w-[260px] justify-start text-left font-normal hover:text-primary has-[>svg]:px-0 md:has-[>svg]:px-3',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>Wybierz datę</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-background absolute top-full left-0"
          side="bottom"
          align="start"
          sideOffset={0}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={numberOfMonths}
            disabled={{ before: today, after: maxDate }}
            startMonth={today}
            endMonth={maxDate}
          />
          <div className="w-full flex justify-center pb-3">
            <Button onClick={handleClear} variant="ghost" size="sm">
              Wyczyść
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
