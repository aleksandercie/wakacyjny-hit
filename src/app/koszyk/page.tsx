'use client';
import { OrderForm } from '@/components/order';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, isLoading } = useCart();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {
      setSuccess(false);
    };
  }, []);

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-16 p-2 bg-gray-100 pb-12">
        <div className="max-w-[1200px] mx-auto">
          {isLoading ? (
            <div className="flex w-full justify-center min-h-[40vh] items-center">
              <p>Ładowanie koszyka...</p>
            </div>
          ) : success ? (
            <div className="flex w-full justify-center min-h-[40vh] items-center flex-col gap-4">
              <p className="text-center font-bold">
                Dziękujemy za złożenie zamówienia!
              </p>
              <p className="text-center">
                Na podany adres otrzymasz potwierdzenie zamówienia.
              </p>
              <p className="text-center">
                A nasz zespół skontaktuje się z Tobą w celu potwierdzenia
                szczegółów.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex w-full justify-center min-h-[40vh] items-center flex-col gap-4">
              <p className="text-center">Twój koszyk jest pusty</p>
              <Link href="/oferty">
                <Button>Sprawdź oferty</Button>
              </Link>
            </div>
          ) : (
            <OrderForm setSuccess={setSuccess} />
          )}
        </div>
      </main>
    </div>
  );
}
