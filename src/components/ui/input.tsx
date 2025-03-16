import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'unstyled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          variant === 'default' &&
            'border border-input file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          variant === 'unstyled' &&
            'border-0 p-2 shadow-none outline-none ring-0 focus:ring-0 focus:outline-none focus:shadow-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:border-0',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
