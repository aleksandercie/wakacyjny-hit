'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { pl } from 'date-fns/locale';

export const DatePickerWithRange = ({
  className,
  date,
  setDate
}: {
  className: string | undefined;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) => {
  return (
    <div className={cn('grid gap-2 relative', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="link"
            className={cn(
              'w-[260px] justify-start text-left font-normal hover:text-primary has-[>svg]:px-0 md:has-[>svg]:px-3',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd MMM yyyy', { locale: pl })} -{' '}
                  {format(date.to, 'dd MMM yyyy', { locale: pl })}
                </>
              ) : (
                format(date.from, 'dd MMM yyyy', { locale: pl })
              )
            ) : (
              <span>Wybierz datę</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white absolute top-full left-0"
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
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
