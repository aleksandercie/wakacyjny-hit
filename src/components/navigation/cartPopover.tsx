'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationBadge } from './navigationBadge';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from '../order/orderSummary';

export const CartPopover = () => {
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

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button variant="link" className="relative">
        <Link href="/koszyk" className="relative">
          <ShoppingCart size={20} />
          <NavigationBadge className="-top-[8px] -right-[10px]" />
        </Link>
      </Button>

      {isHovered && (
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
          />
        </div>
      )}
    </div>
  );
};
