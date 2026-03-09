'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const OrderForm = dynamic(
  () => import('@/components/order').then((mod) => mod.OrderForm),
  {
    loading: () => (
      <div className="flex w-full justify-center min-h-[40vh] items-center">
        <p>Ładowanie formularza...</p>
      </div>
    ),
  },
);

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
