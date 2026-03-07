'use client';

import { OrderForm } from '@/components/order';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

export const Cart = () => {
  const { cart, isLoading } = useCart();
  const { OFFERS } = ROUTES;

  return (
    <div className="max-w-[1200px] mx-auto">
      {isLoading ? (
        <div className="flex w-full justify-center min-h-[40vh] items-center">
          <p>Ładowanie koszyka...</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="flex w-full justify-center min-h-[40vh] items-center flex-col gap-4">
          <p className="text-foreground text-center">Twój koszyk jest pusty</p>
          <Link href={OFFERS}>
            <Button>Sprawdź oferty</Button>
          </Link>
        </div>
      ) : (
        <OrderForm />
      )}
    </div>
  );
};
