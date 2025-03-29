'use client';
import { OrderForm } from '@/components/order';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex w-full justify-center min-h-[40vh] items-center">
        <p>Ładowanie koszyka...</p>
      </div>
    );
  }

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-16 p-2">
        {cart.length === 0 ? (
          <div className="flex w-full justify-center min-h-[40vh] items-center flex-col gap-4">
            <p className="text-center">Twój koszyk jest pusty</p>
            <Link href="/oferty">
              <Button>Sprawdź oferty</Button>
            </Link>
          </div>
        ) : (
          <OrderForm />
        )}
      </main>
    </div>
  );
}
