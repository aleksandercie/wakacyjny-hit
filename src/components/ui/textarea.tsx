import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground flex field-sizing-content min-h-32 w-full border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:border-2 focus-visible:border-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:border-destructive/20 dark:aria-invalid:border-destructive/40 aria-invalid:border-destructive rounded-md',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
