import { getQuantityOptions } from '@/lib/api/getQuantityOptions';
import { QuantityOption } from '@/lib/quantityOptions';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook to fetch quantity options from the backend.
 * @returns {{ options: QuantityOption[]; isLoading: boolean; error: string | null }}
 */
export function useQuantityOptions() {
  const [quantityOptions, setQuantityOptions] = useState<QuantityOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      setIsLoading(true);
      try {
        const res = await getQuantityOptions();
        setQuantityOptions(res);
      } catch {
        const message =
          'Nie udało się załadować opcji ilości. Spróbuj ponownie.';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOptions();
  }, []);

  return { quantityOptions, isLoading, error };
}
