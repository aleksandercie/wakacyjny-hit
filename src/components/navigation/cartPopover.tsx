'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationBadge } from './navigationBadge';
import { useCart } from '@/context/CartContext';
import { ROUTES } from '@/lib/routes';
import dynamic from 'next/dynamic';

const OrderSummary = dynamic(
  () => import('../order/orderSummary').then((mod) => mod.OrderSummary),
  { ssr: false },
);

export const CartPopover = () => {
  const { CART } = ROUTES;
  const { cart, removeAllItemsCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  const closeOrderSummary = () => setIsHovered(false);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button variant="link" className="relative">
        <Link
          href={CART}
          className="relative flex items-center gap-2 font-bold"
        >
          <ShoppingCart size={20} />
          Koszyk
          <NavigationBadge className="-top-[8px] -right-[10px]" />
        </Link>
      </Button>

      {isHovered && cart.length > 0 && (
        <div
          className="absolute right-0 mt-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <OrderSummary
            cart={cart}
            isSubmitting={false}
            removeAllItemsCart={removeAllItemsCart}
            variant="navigation"
            closeOrderSummary={closeOrderSummary}
          />
        </div>
      )}
    </div>
  );
};
