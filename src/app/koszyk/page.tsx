'use client';

import { ImageBanner } from '@/components';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart } = useCart();
  console.log(cart);
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-16 p-2">
        <ImageBanner image="/banner.jpg" alt="Plaza" />
      </main>
    </div>
  );
}
