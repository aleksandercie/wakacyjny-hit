'use client';

import { useCart } from '@/context/CartContext';
import { Badge } from '../badge';

export const NavigationBadge = ({ className }: { className?: string }) => {
  const { cart } = useCart();
  const quantity = cart.length;

  return quantity > 0 ? (
    <Badge quantity={quantity} className={className} />
  ) : null;
};
