import { pl } from 'date-fns/locale/pl';
import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(date, 'dd MMM yyyy', {
    locale: pl
  });
};
