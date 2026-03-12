import { Card } from '../card';
import { Trip } from '@/types/trip';
import { formatDate } from '@/lib/formatDate';

export const OffersCards = ({ trips }: { trips: Trip[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trips.map(
        ({
          title,
          price,
          duration,
          shortDescription,
          image,
          id,
          startDate,
          endDate,
        }) => (
          <Card
            id={id}
            key={id}
            title={title}
            price={price}
            duration={duration}
            date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
            photo={image}
            description={shortDescription}
            variant="small"
          />
        ),
      )}
    </div>
  );
};
