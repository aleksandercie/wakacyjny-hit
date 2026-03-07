import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-l font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-background shadow-xs hover:bg-foreground rounded-full cursor-pointer',
        secondary:
          'bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-colors duration-200 rounded-full cursor-pointer',
        link: 'text-foreground hover:text-primary cursor-pointer',
        outline:
          'border bg-background shadow-xs cursor-pointer text-muted hover:text-foreground',
        tertiary:
          'bg-background text-foreground hover:bg-primary hover:text-background transition-colors duration-200 rounded-full cursor-pointer',
        tab: 'text-muted hover:text-foreground cursor-pointer rounded-full border hover:text-foreground',
        active:
          'bg-primary text-background border-primary hover:bg-primary hover:text-background cursor-pointer rounded-full',
        ghost: 'hover:bg-accent hover:font-medium cursor-pointer',
        paggination: 'hover:text-primary hover:font-medium cursor-pointer',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
