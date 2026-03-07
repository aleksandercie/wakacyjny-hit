import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { OrderFormContent } from './orderFormContent';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export const OrderForm = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const { cart } = useCart();
  const { resolvedTheme } = useTheme();

  const fetchClientSecret = async () => {
    const orderItems = cart.map((item) => ({
      orderId: item.orderId,
      quantityId: item.qunatityId,
    }));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/create-payment-intent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems,
          currency: 'pln',
        }),
      },
    );

    const data = await res.json();
    setClientSecret(data.clientSecret);
    setPaymentIntentId(data.paymentIntentId);
  };

  useEffect(() => {
    fetchClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!clientSecret || !paymentIntentId) {
    return (
      <div className="flex w-full justify-center min-h-[40vh] items-center">
        <p>Ładowanie koszyka...</p>
      </div>
    );
  }

  const appearance: Appearance = {
    theme: resolvedTheme === 'dark' ? 'night' : 'stripe',
    variables: {
      colorPrimary: '#f85808',
      borderRadius: '6px',
      colorBackground: resolvedTheme === 'dark' ? '#121212' : '#ffffff',
    },
    rules: {
      '.AccordionItem': {
        borderColor: resolvedTheme === 'dark' ? '#434a55' : '#e5e7eb',
      },
    },
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance }}
      key={resolvedTheme}
    >
      <OrderFormContent
        clientSecret={clientSecret}
        paymentIntentId={paymentIntentId}
      />
    </Elements>
  );
};
