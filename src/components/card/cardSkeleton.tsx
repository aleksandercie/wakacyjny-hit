import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => {
  return (
    <div className="relative w-full min-w-full">
      <div className="overflow-hidden rounded-md">
        <Skeleton className="h-[250px] w-full rounded-md" />
      </div>
      <div className="flex flex-col bg-white w-full p-2 bottom-2 text-base gap-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
