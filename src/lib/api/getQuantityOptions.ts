import { QuantityOption } from '../quantityOptions';

export const getQuantityOptions = async (): Promise<QuantityOption[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/quantity-options`
  );
  if (!res.ok) {
    throw new Error(`Failed to load: ${res.status}`);
  }
  const data: QuantityOption[] = await res.json();
  return data;
};
