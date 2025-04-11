import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { OrderFormContent } from './orderFormContent';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const OrderForm = ({
  setSuccess
}: {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { cart } = useCart();

  const fetchClientSecret = async () => {
    const amount =
      cart.reduce(
        (acc, item) => acc + Number(item.salePrice || item.price),
        0
      ) * 100;

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'pln',
        payment_method_types: ['card', 'p24', 'blik']
      })
    });

    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    fetchClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex w-full justify-center min-h-[40vh] items-center">
        <p>Ładowanie koszyka...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <OrderFormContent setSuccess={setSuccess} clientSecret={clientSecret} />
    </Elements>
  );
};
